import fs from 'node:fs';
import path from 'node:path';
import {PassThrough} from 'node:stream';
import zlib from 'node:zlib';

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c >>> 0;
  }
  return table;
})();

function updateCrc32(currentCrc: number, buf: Buffer): number {
  let crc = currentCrc ^ 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = CRC_TABLE[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function toDosTimeDate(date: Date): {dosTime: number; dosDate: number} {
  const year = Math.max(1980, date.getFullYear());
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = Math.floor(date.getSeconds() / 2);
  return {
    dosTime: (hours << 11) | (minutes << 5) | seconds,
    dosDate: ((year - 1980) << 9) | (month << 5) | day,
  };
}

const EXCLUDED_NAMES = new Set([
  'node_modules',
  'dist',
  'build',
  'coverage',
  '.git',
  '.vercel',
  '.DS_Store',
  '.poptools-creator-vault.json',
  'bun.lock',
  'server.js',
]);

const EXCLUDED_REL_PATHS = new Set(['public/assets/aistudio']);

function isExcludedEntry(name: string, relPath: string): boolean {
  if (EXCLUDED_NAMES.has(name) || EXCLUDED_REL_PATHS.has(relPath)) {
    return true;
  }
  if (name.endsWith('.log')) {
    return true;
  }
  if (name.startsWith('.env') && name !== '.env.example') {
    return true;
  }
  return false;
}

function isSafeSourceFile(resolvedRoot: string, candidatePath: string): boolean {
  const resolved = path.resolve(candidatePath);
  if (!resolved.startsWith(resolvedRoot + path.sep)) {
    return false;
  }
  const relPath = path.relative(resolvedRoot, resolved).split(path.sep).join('/');
  const base = path.basename(resolved);
  if (isExcludedEntry(base, relPath)) {
    return false;
  }
  const stat = fs.lstatSync(resolved);
  return !stat.isSymbolicLink() && stat.isFile();
}

export interface SourceEntry {
  zipPath: string;
  fullPath: string;
  mtime: Date;
}

export function collectProjectSourceFiles(rootDir: string): SourceEntry[] {
  const resolvedRoot = path.resolve(rootDir);
  const results: SourceEntry[] = [];

  const walk = (dir: string, relBase: string) => {
    const resolvedDir = path.resolve(dir);
    if (resolvedDir !== resolvedRoot && !resolvedDir.startsWith(resolvedRoot + path.sep)) {
      return;
    }
    if (!fs.existsSync(resolvedDir) || fs.lstatSync(resolvedDir).isSymbolicLink()) {
      return;
    }

    const entries = fs.readdirSync(resolvedDir, {withFileTypes: true});
    entries.sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
      const relPath = relBase ? `${relBase}/${entry.name}` : entry.name;
      if (entry.isSymbolicLink() || isExcludedEntry(entry.name, relPath)) {
        continue;
      }

      const fullPath = path.join(resolvedDir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath, relPath);
      } else if (entry.isFile() && isSafeSourceFile(resolvedRoot, fullPath)) {
        const stat = fs.lstatSync(fullPath);
        results.push({
          zipPath: `poptools/${relPath}`,
          fullPath,
          mtime: stat.mtime,
        });
      }
    }
  };

  walk(resolvedRoot, '');
  return results;
}

async function writeChunk(stream: PassThrough, chunk: Buffer, isAborted: () => boolean): Promise<void> {
  if (isAborted() || stream.destroyed) {
    throw new Error('Archive stream aborted.');
  }
  if (!stream.write(chunk)) {
    await new Promise<void>((resolve, reject) => {
      const onDrain = () => {
        cleanup();
        resolve();
      };
      const onClose = () => {
        cleanup();
        reject(new Error('Archive stream closed before completion.'));
      };
      const onError = (err: Error) => {
        cleanup();
        reject(err);
      };
      const cleanup = () => {
        stream.off('drain', onDrain);
        stream.off('close', onClose);
        stream.off('error', onError);
      };
      stream.once('drain', onDrain);
      stream.once('close', onClose);
      stream.once('error', onError);
    });
  }
}

interface CentralRecord {
  nameBuf: Buffer;
  method: number;
  dosTime: number;
  dosDate: number;
  crc32: number;
  compressedSize: number;
  uncompressedSize: number;
  localHeaderOffset: number;
}

export interface StreamingZipArchive {
  stream: PassThrough;
  fileCount: number;
  abort: () => void;
}

export function createCleanSourceZipStream(rootDir: string): StreamingZipArchive {
  const files = collectProjectSourceFiles(rootDir);
  const stream = new PassThrough();
  let aborted = false;
  let activeReadStream: fs.ReadStream | null = null;
  let activeDeflate: zlib.DeflateRaw | null = null;

  const abort = () => {
    aborted = true;
    activeReadStream?.destroy();
    activeDeflate?.destroy();
    if (!stream.destroyed) {
      stream.destroy();
    }
  };

  const run = async () => {
    const centralRecords: CentralRecord[] = [];
    let offset = 0;

    for (const file of files) {
      if (aborted) return;

      const nameBuf = Buffer.from(file.zipPath, 'utf8');
      const {dosTime, dosDate} = toDosTimeDate(file.mtime);
      const localHeaderOffset = offset;

      // Streaming ZIP Local File Header: bit 3 (data descriptor) + bit 11 (UTF-8 filename)
      const flags = 0x0808;
      const method = 8; // DEFLATE
      const localHeader = Buffer.alloc(30);
      localHeader.writeUInt32LE(0x04034b50, 0);
      localHeader.writeUInt16LE(20, 4);
      localHeader.writeUInt16LE(flags, 6);
      localHeader.writeUInt16LE(method, 8);
      localHeader.writeUInt16LE(dosTime, 10);
      localHeader.writeUInt16LE(dosDate, 12);
      localHeader.writeUInt32LE(0, 14);
      localHeader.writeUInt32LE(0, 18);
      localHeader.writeUInt32LE(0, 22);
      localHeader.writeUInt16LE(nameBuf.length, 26);
      localHeader.writeUInt16LE(0, 28);

      await writeChunk(stream, localHeader, () => aborted);
      await writeChunk(stream, nameBuf, () => aborted);
      offset += localHeader.length + nameBuf.length;

      let crc = 0;
      let uncompressedSize = 0;
      let compressedSize = 0;

      const readStream = fs.createReadStream(file.fullPath, {highWaterMark: 64 * 1024});
      const deflate = zlib.createDeflateRaw({level: 6});
      activeReadStream = readStream;
      activeDeflate = deflate;

      readStream.on('data', (chunk: string | Buffer) => {
        const buf = typeof chunk === 'string' ? Buffer.from(chunk) : chunk;
        uncompressedSize += buf.length;
        crc = updateCrc32(crc, buf);
      });

      readStream.on('error', (err) => {
        deflate.destroy(err);
      });

      readStream.pipe(deflate);

      for await (const compressedChunk of deflate) {
        if (aborted) break;
        const buf = compressedChunk as Buffer;
        compressedSize += buf.length;
        offset += buf.length;
        await writeChunk(stream, buf, () => aborted);
      }

      activeReadStream = null;
      activeDeflate = null;
      if (aborted) return;

      // 16-byte Data Descriptor immediately following deflated file payload
      const dataDescriptor = Buffer.alloc(16);
      dataDescriptor.writeUInt32LE(0x08074b50, 0);
      dataDescriptor.writeUInt32LE(crc >>> 0, 4);
      dataDescriptor.writeUInt32LE(compressedSize >>> 0, 8);
      dataDescriptor.writeUInt32LE(uncompressedSize >>> 0, 12);

      await writeChunk(stream, dataDescriptor, () => aborted);
      offset += dataDescriptor.length;

      centralRecords.push({
        nameBuf,
        method,
        dosTime,
        dosDate,
        crc32: crc >>> 0,
        compressedSize: compressedSize >>> 0,
        uncompressedSize: uncompressedSize >>> 0,
        localHeaderOffset,
      });
    }

    const centralStartOffset = offset;
    let centralSize = 0;

    for (const rec of centralRecords) {
      if (aborted) return;
      const centralHeader = Buffer.alloc(46);
      centralHeader.writeUInt32LE(0x02014b50, 0);
      centralHeader.writeUInt16LE(20, 4);
      centralHeader.writeUInt16LE(20, 6);
      centralHeader.writeUInt16LE(0x0808, 8);
      centralHeader.writeUInt16LE(rec.method, 10);
      centralHeader.writeUInt16LE(rec.dosTime, 12);
      centralHeader.writeUInt16LE(rec.dosDate, 14);
      centralHeader.writeUInt32LE(rec.crc32, 16);
      centralHeader.writeUInt32LE(rec.compressedSize, 20);
      centralHeader.writeUInt32LE(rec.uncompressedSize, 24);
      centralHeader.writeUInt16LE(rec.nameBuf.length, 28);
      centralHeader.writeUInt16LE(0, 30);
      centralHeader.writeUInt16LE(0, 32);
      centralHeader.writeUInt16LE(0, 34);
      centralHeader.writeUInt16LE(0, 36);
      centralHeader.writeUInt32LE(0, 38);
      centralHeader.writeUInt32LE(rec.localHeaderOffset, 42);

      await writeChunk(stream, centralHeader, () => aborted);
      await writeChunk(stream, rec.nameBuf, () => aborted);
      centralSize += centralHeader.length + rec.nameBuf.length;
    }

    const eocd = Buffer.alloc(22);
    eocd.writeUInt32LE(0x06054b50, 0);
    eocd.writeUInt16LE(0, 4);
    eocd.writeUInt16LE(0, 6);
    eocd.writeUInt16LE(centralRecords.length, 8);
    eocd.writeUInt16LE(centralRecords.length, 10);
    eocd.writeUInt32LE(centralSize, 12);
    eocd.writeUInt32LE(centralStartOffset, 16);
    eocd.writeUInt16LE(0, 20);

    await writeChunk(stream, eocd, () => aborted);
    stream.end();
  };

  void run().catch((err) => {
    if (!aborted && !stream.destroyed) {
      stream.destroy(err instanceof Error ? err : new Error('Failed to stream source archive.'));
    }
  });

  return {
    stream,
    fileCount: files.length,
    abort,
  };
}
