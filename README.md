# POPTOOLS

**Everything You Need. One Free Platform.**

POPTOOLS is a fast, privacy-first worldwide online tools platform built with React, TypeScript, Vite, and Tailwind CSS. All 37 utilities across PDF, Calculators & Converters, Image Tools, Productivity (Text & QR), Developer Tools, and AI & Smart Writing Tools run locally inside the user's browser with zero mandatory sign-up and zero file uploads to external servers.

---

## Technology Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 8 (`@vitejs/plugin-react`)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Routing:** React Router v7 (`react-router-dom`)
- **Icons:** Lucide React (`lucide-react`)
- **PDF Engine:** `pdf-lib` (merging, splitting, editing, compressing, sanitizing, image-to-PDF) & `pdfjs-dist` (local worker page rendering & PDF-to-image)
- **QR Engine:** `qrcode` (PNG & SVG generation) & `jsqr` (image & live camera decoding)
- **Hosting Target:** GitHub + Vercel (`vercel.json`) or Cloudflare Pages (`public/_redirects`)

---

## Folder Structure

```text
poptools/
├── index.html                          # Entry HTML with SEO, OpenGraph & Google Fonts
├── metadata.json                       # Platform metadata & camera permission declaration
├── package.json                        # Dependencies and npm scripts
├── server.ts                           # Express full-stack server & creator-protected API
├── tsconfig.json                       # TypeScript configuration
├── vercel.json                         # Vercel SPA rewrites, build & security headers
├── vite.config.ts                      # Vite build & Tailwind CSS configuration
├── README.md                           # Setup, export, and deployment instructions
├── server/
│   └── sourceZip.ts                    # Server-side ZIP packager (excludes node_modules & secrets)
├── public/
│   ├── _headers                        # Cloudflare Pages security & cache headers
│   ├── _redirects                      # Cloudflare Pages SPA fallback (/* /index.html 200)
│   ├── robots.txt                      # Search engine crawl directives
│   └── sitemap.xml                     # Complete XML sitemap for all tools & pages
└── src/
    ├── App.tsx                         # Main router & layout shell
    ├── index.css                       # Tailwind CSS v4 import, fonts & motion rules
    ├── main.tsx                        # React root mount
    ├── context/
    │   └── LocaleContext.tsx           # Theme (light/dark), language state & AdSense/Monetag config
    ├── data/
    │   └── toolsRegistry.ts            # Central typed registry of all 37 tools & 7 categories
    ├── i18n/
    │   └── translations.ts             # Multi-language dictionary (en, es, fr, de, pt, ja)
    ├── utils/
    │   └── fileUtils.ts                # File download, byte formatting, image & PDF.js worker helpers
    ├── components/
    │   ├── AdSlot.tsx                  # Google AdSense & Monetag advertisement containers
    │   ├── Footer.tsx                  # Multi-column footer, legal links & language selector
    │   ├── Header.tsx                  # Responsive top navigation bar
    │   ├── Logo.tsx                    # Custom POPTOOLS SVG mark & wordmark
    │   ├── SeoHead.tsx                 # Dynamic route titles, meta tags, canonicals & JSON-LD
    │   ├── ToolCard.tsx                # Colorful icon tool cards with Popular & Free badges
    │   ├── ToolLayout.tsx              # Reusable SEO tool page layout (ads, steps, FAQs, related)
    │   └── tools/
    │       ├── ToolRenderer.tsx        # Slug-to-component router for all 37 working tools
    │       ├── common/
    │       │   ├── DropZone.tsx        # Accessible drag-and-drop file uploader with validation
    │       │   └── ToolControls.tsx    # ErrorBanner & CopyButton components
    │       ├── image/
    │       │   └── ImageTools.tsx      # Compressor, Resizer, JPG to PNG, PNG to JPG, Cropper
    │       ├── pdf/
    │       │   ├── PdfTools.tsx        # Merger, Splitter, Compressor, PDF to Image, Image to PDF
    │       │   └── AdvancedPdfTools.tsx# PDF Converter, Merger & Splitter, PDF Editor, PDF Security
    │       ├── text/
    │       │   └── TextTools.tsx       # Word/Char Counter, Case Converter, Cleaner, Lorem Ipsum
    │       ├── calculators/
    │       │   ├── CalculatorTools.tsx # Percentage, Age, Discount, Loan (CSV), Currency Converter
    │       │   └── MoreCalculatorTools.tsx # BMI Calculator, Unit Converter, Tax/VAT Calculator
    │       ├── qr/
    │       │   └── QrTools.tsx         # QR Generator (PNG/SVG) & QR Reader (Upload + Camera)
    │       ├── developer/
    │       │   └── DeveloperTools.tsx  # JSON Formatter, Base64, URL Encoder, Password Gen, HTML
    │       └── ai/
    │           └── AiTools.tsx         # Smart Text Summarizer, Readability Checker, Prompt Optimizer
    └── pages/
        ├── HomePage.tsx                # Main landing page with search, tabs & colorful tool grid
        ├── AllToolsPage.tsx            # Searchable full directory
        ├── CategoryPage.tsx            # Category SEO landing pages
        ├── ToolPage.tsx                # Individual tool SEO route wrapper
        ├── StaticPages.tsx             # About, Contact, Privacy Policy, Terms, Disclaimer, FAQ
        ├── AdminArchitecturePage.tsx   # AdSense/Monetag console, tool registry & scaling blueprint
        ├── CreatorPortalPage.tsx       # Private authenticated creator dashboard & source export
        └── NotFoundPage.tsx            # 404 page
```

---

## Running Locally

### Prerequisites

- **Node.js** `20.x` or newer
- **npm** `10.x` or newer

### Commands

```bash
# 1. Install dependencies
npm install

# 2. Start local development server (http://localhost:3000)
npm run dev

# 3. Typecheck TypeScript
npm run lint

# 4. Build production bundle into dist/
npm run build

# 5. Start full-stack production server (serves dist/ + protected API)
NODE_ENV=production npm start
```

---

## Deploying to GitHub & Vercel

1. **Export & Push to GitHub**
   - Download the project ZIP from AI Studio (or clone/copy the project folder without `node_modules/`, `dist/`, or `.env`).
   - `.gitignore` already excludes `node_modules/`, `dist/`, `.vercel/`, and `.env*` while keeping `.env.example`.
   ```bash
   git init
   git add .
   git commit -m "Deploy POPTOOLS"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Log in to **Vercel** → **Add New…** → **Project** → **Import Git Repository**.
   - Select your GitHub repository. `vercel.json` automatically configures:
     - **Framework Preset:** `Vite`
     - **Install Command:** `npm install`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
     - **SPA Rewrites & Headers:** All client routes (`/tools/*`, `/category/*`, `/about`, etc.) resolve to `/index.html`, while `robots.txt`, `sitemap.xml`, and `/assets/*` are served directly with immutable asset caching and security headers.
   - Click **Deploy**.

3. **Alternative: Cloudflare Pages**
   - Connect your GitHub repository in **Cloudflare Dashboard** → **Workers & Pages** → **Pages** with framework preset `Vite`, build command `npm run build`, and output directory `dist` (`public/_redirects` and `public/_headers` are included).

4. **SEO & Monetization Setup**
   - Before submitting `sitemap.xml` to Google Search Console, replace `https://poptools.app` inside `public/sitemap.xml` and `public/robots.txt` with your live production domain.
   - Visit `/admin` in the app (or update `src/context/LocaleContext.tsx`) to configure your live **Google AdSense Publisher ID / Slot IDs** and **Monetag Zone ID**, and add any verification `<script>` tags to `index.html`.

