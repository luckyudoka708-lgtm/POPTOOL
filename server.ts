import 'dotenv/config';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import express, {type NextFunction, type Request, type Response} from 'express';
import {buildCleanSourceZip} from './server/sourceZip.ts';

const ROOT_DIR = import.meta.dirname;
const PORT = Number(process.env.PORT || 3000);
const IS_PROD = process.env.NODE_ENV === 'production';
const VAULT_FILE = path.join(ROOT_DIR, '.poptools-creator-vault.json');

// Signing secret kept strictly in server memory if not supplied via environment secrets.
const SESSION_SIGNING_SECRET =
  process.env.CREATOR_SESSION_SECRET && process.env.CREATOR_SESSION_SECRET.trim().length >= 16
    ? process.env.CREATOR_SESSION_SECRET.trim()
    : crypto.randomBytes(32).toString('hex');

const TOKEN_TTL_MS = 1000 * 60 * 60; // 1 hour
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_AUTH_ATTEMPTS = 8;

interface CreatorVaultRecord {
  email: string;
  salt: string;
  hash: string;
  claimedAt: string;
}

interface SessionPayload {
  sub: string;
  role: 'creator';
  jti: string;
  exp: number;
}

interface AuthenticatedRequest extends Request {
  creatorSession?: SessionPayload;
}

const revokedTokenIds = new Set<string>();
const failedAuthAttempts = new Map<string, {count: number; resetAt: number}>();

function getClientKey(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = Array.isArray(forwarded)
    ? forwarded[0]
    : typeof forwarded === 'string'
      ? forwarded.split(',')[0]?.trim()
      : req.ip || 'unknown';
  return ip || 'unknown';
}

function checkRateLimit(clientKey: string): {allowed: boolean; retryAfterSec?: number} {
  const now = Date.now();
  const entry = failedAuthAttempts.get(clientKey);
  if (!entry || now > entry.resetAt) {
    return {allowed: true};
  }
  if (entry.count >= MAX_AUTH_ATTEMPTS) {
    return {
      allowed: false,
      retryAfterSec: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }
  return {allowed: true};
}

function recordFailedAttempt(clientKey: string): void {
  const now = Date.now();
  const entry = failedAuthAttempts.get(clientKey);
  if (!entry || now > entry.resetAt) {
    failedAuthAttempts.set(clientKey, {count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS});
    return;
  }
  entry.count += 1;
}

function clearFailedAttempts(clientKey: string): void {
  failedAuthAttempts.delete(clientKey);
}

function readVault(): CreatorVaultRecord | null {
  try {
    if (!fs.existsSync(VAULT_FILE)) return null;
    const raw = fs.readFileSync(VAULT_FILE, 'utf8');
    const parsed = JSON.parse(raw) as Partial<CreatorVaultRecord>;
    if (
      typeof parsed.email === 'string' &&
      typeof parsed.salt === 'string' &&
      typeof parsed.hash === 'string'
    ) {
      return {
        email: parsed.email,
        salt: parsed.salt,
        hash: parsed.hash,
        claimedAt: typeof parsed.claimedAt === 'string' ? parsed.claimedAt : '',
      };
    }
    return null;
  } catch {
    return null;
  }
}

function writeVault(record: CreatorVaultRecord): void {
  // Exclusive create ('wx') prevents race conditions on first-run setup
  fs.writeFileSync(VAULT_FILE, JSON.stringify(record, null, 2), {
    encoding: 'utf8',
    mode: 0o600,
    flag: 'wx',
  });
}

function hashPasscode(passcode: string, salt: string): string {
  return crypto.scryptSync(passcode, salt, 64).toString('hex');
}

function safeEqualStrings(a: string, b: string): boolean {
  const digestA = crypto.createHash('sha256').update(a, 'utf8').digest();
  const digestB = crypto.createHash('sha256').update(b, 'utf8').digest();
  return crypto.timingSafeEqual(digestA, digestB);
}

function getEnvCreatorPasscode(): string {
  return (process.env.CREATOR_PASSCODE || '').trim();
}

function getEnvCreatorEmail(): string {
  return (process.env.CREATOR_EMAIL || '').trim().toLowerCase();
}

function signCreatorToken(email: string): {token: string; expiresAt: number} {
  const payload: SessionPayload = {
    sub: email.toLowerCase(),
    role: 'creator',
    jti: crypto.randomUUID(),
    exp: Date.now() + TOKEN_TTL_MS,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const sig = crypto
    .createHmac('sha256', SESSION_SIGNING_SECRET)
    .update(encodedPayload)
    .digest('base64url');
  return {
    token: `${encodedPayload}.${sig}`,
    expiresAt: payload.exp,
  };
}

function verifyCreatorToken(token: string): SessionPayload | null {
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [encodedPayload, providedSig] = parts;
  if (!encodedPayload || !providedSig) return null;

  const expectedSig = crypto
    .createHmac('sha256', SESSION_SIGNING_SECRET)
    .update(encodedPayload)
    .digest('base64url');

  const sigBufA = Buffer.from(providedSig, 'utf8');
  const sigBufB = Buffer.from(expectedSig, 'utf8');
  if (sigBufA.length !== sigBufB.length || !crypto.timingSafeEqual(sigBufA, sigBufB)) {
    return null;
  }

  try {
    const decoded = JSON.parse(
      Buffer.from(encodedPayload, 'base64url').toString('utf8'),
    ) as Partial<SessionPayload>;
    if (
      typeof decoded.sub !== 'string' ||
      decoded.role !== 'creator' ||
      typeof decoded.jti !== 'string' ||
      typeof decoded.exp !== 'number'
    ) {
      return null;
    }
    if (decoded.exp <= Date.now() || revokedTokenIds.has(decoded.jti)) {
      return null;
    }
    return decoded as SessionPayload;
  } catch {
    return null;
  }
}

function extractBearerToken(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.slice(7).trim();
  return token.length > 0 ? token : null;
}

function requireSameOriginHeader(req: Request, res: Response, next: NextFunction): void {
  const requestedWith = req.headers['x-requested-with'];
  if (requestedWith !== 'POPTOOLS') {
    res.status(403).json({error: 'Forbidden request origin or missing security header.'});
    return;
  }
  next();
}

function requireCreatorAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const token = extractBearerToken(req);
  if (!token) {
    res.status(401).json({error: 'Creator authentication required.'});
    return;
  }
  const session = verifyCreatorToken(token);
  if (!session || session.role !== 'creator') {
    res.status(401).json({error: 'Invalid or expired creator session.'});
    return;
  }

  const envEmail = getEnvCreatorEmail();
  const vault = readVault();
  const authorizedEmail = envEmail || vault?.email || '';
  if (authorizedEmail && !safeEqualStrings(session.sub, authorizedEmail.toLowerCase())) {
    res.status(403).json({error: 'Access denied. Creator authorization required.'});
    return;
  }

  req.creatorSession = session;
  next();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

async function startServer() {
  const app = express();
  app.set('trust proxy', 1);
  app.disable('x-powered-by');
  app.use(express.json({limit: '16kb'}));

  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  // Never serve sensitive hidden vault files if requested directly
  app.use((req, res, next) => {
    const cleanPath = req.path.toLowerCase();
    if (
      cleanPath.includes('.poptools-creator-vault') ||
      cleanPath.includes('.env') ||
      cleanPath.endsWith('poptools-source.zip')
    ) {
      res.status(404).end();
      return;
    }
    next();
  });

  // Creator auth status check (never exposes credentials or download paths)
  app.get('/api/creator/status', (req: Request, res: Response) => {
    const envPasscode = getEnvCreatorPasscode();
    const vault = readVault();
    const setupRequired = !envPasscode && !vault;

    const token = extractBearerToken(req);
    const session = token ? verifyCreatorToken(token) : null;
    const envEmail = getEnvCreatorEmail();
    const authorizedEmail = envEmail || vault?.email || '';
    const isCreatorAuthorized = Boolean(
      session &&
        session.role === 'creator' &&
        (!authorizedEmail || safeEqualStrings(session.sub, authorizedEmail.toLowerCase())),
    );

    res.setHeader('Cache-Control', 'no-store, private');
    res.json({
      setupRequired,
      authenticated: isCreatorAuthorized,
      creatorEmail: isCreatorAuthorized && session ? session.sub : null,
      expiresAt: isCreatorAuthorized && session ? session.exp : null,
    });
  });

  // First-run creator passcode claim (locks immediately once claimed or when env secret is set)
  app.post('/api/creator/setup', requireSameOriginHeader, (req: Request, res: Response) => {
    const clientKey = getClientKey(req);
    const limit = checkRateLimit(clientKey);
    if (!limit.allowed) {
      res.status(429).json({
        error: `Too many attempts. Please wait ${limit.retryAfterSec} seconds and try again.`,
      });
      return;
    }

    if (getEnvCreatorPasscode() || readVault()) {
      res.status(409).json({error: 'Creator account is already configured.'});
      return;
    }

    const body = (req.body || {}) as {email?: unknown; passcode?: unknown};
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const passcode = typeof body.passcode === 'string' ? body.passcode : '';

    if (!isValidEmail(email)) {
      res.status(400).json({error: 'Please enter a valid creator email address.'});
      return;
    }
    if (passcode.length < 10 || passcode.length > 128) {
      res.status(400).json({error: 'Creator passcode must be between 10 and 128 characters.'});
      return;
    }

    try {
      const salt = crypto.randomBytes(16).toString('hex');
      const hash = hashPasscode(passcode, salt);
      writeVault({
        email,
        salt,
        hash,
        claimedAt: new Date().toISOString(),
      });
      clearFailedAttempts(clientKey);
      const {token, expiresAt} = signCreatorToken(email);
      res.setHeader('Cache-Control', 'no-store, private');
      res.status(201).json({
        token,
        expiresAt,
        creatorEmail: email,
        archiveEndpoint: '/api/creator/source-archive',
      });
    } catch (err) {
      const code = (err as NodeJS.ErrnoException)?.code;
      if (code === 'EEXIST') {
        res.status(409).json({error: 'Creator account was already claimed.'});
        return;
      }
      res.status(500).json({error: 'Could not save creator credentials.'});
    }
  });

  // Creator sign-in
  app.post('/api/creator/login', requireSameOriginHeader, (req: Request, res: Response) => {
    const clientKey = getClientKey(req);
    const limit = checkRateLimit(clientKey);
    if (!limit.allowed) {
      res.status(429).json({
        error: `Too many failed sign-in attempts. Retry in ${limit.retryAfterSec} seconds.`,
      });
      return;
    }

    const envPasscode = getEnvCreatorPasscode();
    const envEmail = getEnvCreatorEmail();
    const vault = readVault();

    if (!envPasscode && !vault) {
      res.status(400).json({error: 'Creator setup is required before signing in.'});
      return;
    }

    const body = (req.body || {}) as {email?: unknown; passcode?: unknown};
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const passcode = typeof body.passcode === 'string' ? body.passcode : '';

    if (!isValidEmail(email) || !passcode) {
      recordFailedAttempt(clientKey);
      res.status(401).json({error: 'Invalid creator credentials.'});
      return;
    }

    let authorized = false;

    if (envPasscode) {
      const expectedEmail = envEmail || vault?.email || '';
      const emailOk = expectedEmail ? safeEqualStrings(email, expectedEmail.toLowerCase()) : true;
      const passcodeOk = safeEqualStrings(passcode, envPasscode);
      authorized = emailOk && passcodeOk;
    } else if (vault) {
      const emailOk = safeEqualStrings(email, vault.email.toLowerCase());
      const candidateHash = hashPasscode(passcode, vault.salt);
      const hashOk = safeEqualStrings(candidateHash, vault.hash);
      authorized = emailOk && hashOk;
    }

    if (!authorized) {
      recordFailedAttempt(clientKey);
      res.status(401).json({error: 'Invalid creator email or passcode.'});
      return;
    }

    clearFailedAttempts(clientKey);
    const {token, expiresAt} = signCreatorToken(email);
    res.setHeader('Cache-Control', 'no-store, private');
    res.json({
      token,
      expiresAt,
      creatorEmail: email,
      archiveEndpoint: '/api/creator/source-archive',
    });
  });

  // Creator sign-out (server-side token revocation)
  app.post(
    '/api/creator/logout',
    requireSameOriginHeader,
    requireCreatorAuth,
    (req: AuthenticatedRequest, res: Response) => {
      if (req.creatorSession?.jti) {
        revokedTokenIds.add(req.creatorSession.jti);
      }
      res.setHeader('Cache-Control', 'no-store, private');
      res.json({signedOut: true});
    },
  );

  // Protected Creator-Only Source Code ZIP Export Endpoint
  app.post(
    '/api/creator/source-archive',
    requireSameOriginHeader,
    requireCreatorAuth,
    (_req: AuthenticatedRequest, res: Response) => {
      try {
        const {buffer, fileCount} = buildCleanSourceZip(ROOT_DIR);
        const dateStamp = new Date().toISOString().slice(0, 10);
        const filename = `poptools-source-${dateStamp}.zip`;

        res.status(200);
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Length', String(buffer.length));
        res.setHeader('X-Archive-File-Count', String(fileCount));
        res.setHeader('X-Archive-Filename', filename);
        res.setHeader('Cache-Control', 'no-store, private');
        res.send(buffer);
      } catch {
        res.status(500).json({error: 'Failed to package POPTOOLS source archive.'});
      }
    },
  );

  app.use('/api', (_req: Request, res: Response) => {
    res.status(404).json({error: 'API endpoint not found.'});
  });

  if (!IS_PROD) {
    const {createServer: createViteServer} = await import('vite');
    const vite = await createViteServer({
      server: {middlewareMode: true},
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.join(ROOT_DIR, 'dist');
    app.use(express.static(distDir, {index: false}));
    app.get('*', (req: Request, res: Response, next: NextFunction) => {
      if (req.path.startsWith('/api/')) {
        next();
        return;
      }
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`POPTOOLS server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start POPTOOLS server:', err);
  process.exit(1);
});
