export type CategoryId =
  | 'pdf-tools'
  | 'calculators'
  | 'image-tools'
  | 'text-tools'
  | 'qr-tools'
  | 'developer-tools'
  | 'ai-tools';

export type HomeTabId =
  | 'all'
  | 'pdf'
  | 'calculators'
  | 'image'
  | 'productivity'
  | 'developer'
  | 'ai';

export type ToolIconKey =
  | 'file-text'
  | 'files'
  | 'pencil'
  | 'minimize'
  | 'lock'
  | 'repeat'
  | 'scissors'
  | 'image-down'
  | 'file-plus'
  | 'scale'
  | 'cake'
  | 'coins'
  | 'ruler'
  | 'receipt'
  | 'percent'
  | 'landmark'
  | 'tag'
  | 'image'
  | 'maximize'
  | 'crop'
  | 'qr'
  | 'scan'
  | 'type'
  | 'hash'
  | 'case'
  | 'eraser'
  | 'align-left'
  | 'braces'
  | 'binary'
  | 'link'
  | 'key'
  | 'code'
  | 'sparkles'
  | 'spell-check'
  | 'wand';

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolDefinition {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  category: CategoryId;
  categoryName: string;
  tabGroup: Exclude<HomeTabId, 'all'>;
  iconKey: ToolIconKey;
  iconBg: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  popular?: boolean;
  trending?: boolean;
  steps: [string, string, string];
  faqs: ToolFaq[];
  tier: 'free' | 'pro-ready';
  processingMode: 'client-browser' | 'edge-api';
  localesSupported: string[];
}

export interface CategoryDefinition {
  id: CategoryId;
  slug: CategoryId;
  name: string;
  shortTitle: string;
  tabId: Exclude<HomeTabId, 'all'>;
  description: string;
  seoTitle: string;
  seoDescription: string;
}

export interface HomeTabDefinition {
  id: HomeTabId;
  label: string;
}

export const HOME_TABS: HomeTabDefinition[] = [
  {id: 'all', label: 'All Tools'},
  {id: 'pdf', label: 'PDF'},
  {id: 'calculators', label: 'Calculators'},
  {id: 'image', label: 'Image Tools'},
  {id: 'productivity', label: 'Productivity'},
  {id: 'developer', label: 'Developer Tools'},
  {id: 'ai', label: 'AI Tools'},
];

export const CATEGORIES: CategoryDefinition[] = [
  {
    id: 'pdf-tools',
    slug: 'pdf-tools',
    name: 'PDF Tools',
    shortTitle: 'PDF',
    tabId: 'pdf',
    description:
      'Convert, merge, split, edit, compress, and secure PDF documents locally in your browser with zero watermarks.',
    seoTitle: 'Free Online PDF Tools – Convert, Merge, Edit & Compress | POPTOOLS',
    seoDescription:
      'Convert, merge, split, edit, compress, and protect PDF files online for free in your browser.',
  },
  {
    id: 'calculators',
    slug: 'calculators',
    name: 'Calculators & Converters',
    shortTitle: 'Calculators',
    tabId: 'calculators',
    description:
      'Calculate BMI, exact age, live currency rates, unit conversions, taxes, discounts, percentages, and loan schedules.',
    seoTitle: 'Free Online Calculators – BMI, Currency, Unit, Tax & Loan | POPTOOLS',
    seoDescription:
      'Accurate online calculators for BMI, age, currency conversion, unit conversion, tax, discounts, percentages, and loans.',
  },
  {
    id: 'image-tools',
    slug: 'image-tools',
    name: 'Image Tools',
    shortTitle: 'Image Tools',
    tabId: 'image',
    description:
      'Compress, resize, crop, and convert JPG and PNG images directly in your browser without server uploads.',
    seoTitle: 'Free Online Image Tools – Compress, Resize, Crop & Convert | POPTOOLS',
    seoDescription:
      'Compress, resize, crop, and convert JPG and PNG images online for free with instant download.',
  },
  {
    id: 'text-tools',
    slug: 'text-tools',
    name: 'Text & Writing Tools',
    shortTitle: 'Text',
    tabId: 'productivity',
    description:
      'Count words and characters, convert text casing, clean messy formatting, and generate Lorem Ipsum placeholder copy.',
    seoTitle: 'Free Online Text Tools – Word Counter, Case Converter & Cleaner | POPTOOLS',
    seoDescription:
      'Analyze word and character counts, convert text cases, clean whitespace, and generate Lorem Ipsum online.',
  },
  {
    id: 'qr-tools',
    slug: 'qr-tools',
    name: 'QR Tools',
    shortTitle: 'QR',
    tabId: 'productivity',
    description:
      'Generate custom high-resolution QR codes in PNG or SVG and decode QR codes from uploaded images or your camera.',
    seoTitle: 'Free Online QR Code Generator & QR Reader | POPTOOLS',
    seoDescription:
      'Create custom QR codes for URLs, WiFi, and text in PNG or SVG, or decode QR codes from images and webcam.',
  },
  {
    id: 'developer-tools',
    slug: 'developer-tools',
    name: 'Developer Tools',
    shortTitle: 'Developer Tools',
    tabId: 'developer',
    description:
      'Format and validate JSON and HTML, encode or decode Base64 and URLs, and generate cryptographically secure passwords.',
    seoTitle: 'Free Online Developer Tools – JSON, Base64, URL, HTML & Passwords | POPTOOLS',
    seoDescription:
      'Essential browser-based developer utilities: JSON formatter, Base64 & URL encoder/decoder, HTML formatter, and password generator.',
  },
  {
    id: 'ai-tools',
    slug: 'ai-tools',
    name: 'AI & Smart Writing Tools',
    shortTitle: 'AI Tools',
    tabId: 'ai',
    description:
      'Summarize long articles, check readability and writing clarity, and structure high-precision AI prompts instantly.',
    seoTitle: 'Free AI & Smart Writing Tools – Summarizer, Readability & Prompts | POPTOOLS',
    seoDescription:
      'Summarize text, analyze readability and grammar patterns, and craft structured AI prompts privately in your browser.',
  },
];

export const TOOLS: ToolDefinition[] = [
  // PDF TOOLS
  {
    id: 'pdf-converter',
    slug: 'pdf-converter',
    name: 'PDF Converter',
    shortDesc: 'Convert PDF pages to PNG/JPG images or bundle images into a crisp PDF.',
    category: 'pdf-tools',
    categoryName: 'PDF',
    tabGroup: 'pdf',
    iconKey: 'file-text',
    iconBg: 'bg-sky-500',
    seoTitle: 'Free PDF Converter – PDF to Image & Image to PDF | POPTOOLS',
    seoDescription:
      'Convert PDF documents to PNG/JPG images or convert JPG and PNG images into a PDF file privately in your browser.',
    keywords: ['pdf converter', 'convert pdf', 'pdf to jpg', 'jpg to pdf'],
    popular: true,
    trending: true,
    steps: [
      'Choose PDF to Images or Images to PDF mode.',
      'Drop your PDF document or image files into the converter.',
      'Select output quality or page size and download immediately.',
    ],
    faqs: [
      {
        question: 'Can I convert both ways with PDF Converter?',
        answer: 'Yes. Switch between PDF → Images and Images → PDF tabs inside the same workspace.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'pdf-merger-splitter',
    slug: 'pdf-merger-splitter',
    name: 'PDF Merger & Splitter',
    shortDesc: 'Combine multiple PDFs into one file or extract specific page ranges.',
    category: 'pdf-tools',
    categoryName: 'PDF',
    tabGroup: 'pdf',
    iconKey: 'files',
    iconBg: 'bg-emerald-500',
    seoTitle: 'Free PDF Merger & Splitter – Combine or Split PDFs Online | POPTOOLS',
    seoDescription:
      'Merge multiple PDFs in custom order or split and extract specific PDF pages securely in your browser.',
    keywords: ['pdf merger and splitter', 'merge pdf', 'split pdf', 'combine pdf'],
    popular: true,
    steps: [
      'Select Merge PDFs or Split PDF tab.',
      'Upload your PDF files and reorder or enter page ranges.',
      'Download your merged or split PDF documents.',
    ],
    faqs: [
      {
        question: 'Are files uploaded to any external server?',
        answer: 'No. Merging and splitting happen locally in your browser memory.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'pdf-editor',
    slug: 'pdf-editor',
    name: 'PDF Editor',
    shortDesc: 'Rotate pages, remove unwanted pages, and stamp custom text onto PDFs.',
    category: 'pdf-tools',
    categoryName: 'PDF',
    tabGroup: 'pdf',
    iconKey: 'pencil',
    iconBg: 'bg-violet-600',
    seoTitle: 'Free Online PDF Editor – Rotate, Remove Pages & Add Text | POPTOOLS',
    seoDescription:
      'Edit PDF files in your browser: rotate pages, delete pages, and add custom text overlays or headers without watermarks.',
    keywords: ['pdf editor', 'edit pdf online', 'rotate pdf pages', 'add text to pdf'],
    popular: true,
    trending: true,
    steps: [
      'Upload any PDF file to view its pages.',
      'Rotate or remove pages, or add custom text annotations.',
      'Export and download your updated PDF document.',
    ],
    faqs: [
      {
        question: 'Does POPTOOLS add a watermark to edited PDFs?',
        answer: 'No. Your edited PDF downloads cleanly with zero POPTOOLS watermarks.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'pdf-compressor',
    slug: 'pdf-compressor',
    name: 'PDF Compressor',
    shortDesc: 'Shrink PDF file size using structural optimization or smart page compression.',
    category: 'pdf-tools',
    categoryName: 'PDF',
    tabGroup: 'pdf',
    iconKey: 'minimize',
    iconBg: 'bg-amber-500',
    seoTitle: 'Free PDF Compressor – Reduce PDF File Size Online | POPTOOLS',
    seoDescription:
      'Compress large PDF files online without watermarks. Choose lossless structural optimization or high-ratio image compression.',
    keywords: ['pdf compressor', 'compress pdf', 'reduce pdf file size'],
    popular: true,
    steps: [
      'Upload the PDF document you want to reduce in size.',
      'Select Balanced Structure Optimization or Strong Visual Compression.',
      'Review the byte savings and download your compressed PDF.',
    ],
    faqs: [
      {
        question: 'What is the difference between Structural and Strong compression?',
        answer: 'Structural compression keeps selectable vector text while optimizing object streams; Strong compression re-encodes pages at a compact DPI for maximum size reduction.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'pdf-security',
    slug: 'pdf-security',
    name: 'PDF Security',
    shortDesc: 'Scrub hidden metadata, apply confidential watermarks, and flatten pages.',
    category: 'pdf-tools',
    categoryName: 'PDF',
    tabGroup: 'pdf',
    iconKey: 'lock',
    iconBg: 'bg-rose-500',
    seoTitle: 'Free PDF Security – Metadata Scrubber, Watermark & Flatten | POPTOOLS',
    seoDescription:
      'Protect sensitive PDFs in your browser: inspect and strip hidden metadata, stamp confidential watermarks, or flatten selectable text.',
    keywords: ['pdf security', 'sanitize pdf metadata', 'watermark pdf', 'flatten pdf'],
    steps: [
      'Upload a PDF to inspect its embedded author and software metadata.',
      'Choose to scrub metadata, add a confidential watermark, or flatten pages.',
      'Download the sanitized and protected PDF document.',
    ],
    faqs: [
      {
        question: 'Why scrub PDF metadata before sharing?',
        answer: 'PDFs often store author names, company software versions, and creation timestamps; scrubbing removes these hidden identifiers.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'pdf-merger',
    slug: 'pdf-merger',
    name: 'PDF Merger',
    shortDesc: 'Combine multiple PDF documents into a single file in your preferred order.',
    category: 'pdf-tools',
    categoryName: 'PDF',
    tabGroup: 'pdf',
    iconKey: 'files',
    iconBg: 'bg-teal-500',
    seoTitle: 'Free PDF Merger – Combine Multiple PDF Files Online | POPTOOLS',
    seoDescription:
      'Merge multiple PDF documents into one organized PDF file in your browser. Reorder files easily with complete privacy.',
    keywords: ['pdf merger', 'combine pdf', 'merge pdf files online', 'join pdf'],
    steps: [
      'Select or drop two or more PDF files into the merger.',
      'Use the Up/Down controls to arrange the exact page order.',
      'Click Merge PDFs and download the combined document.',
    ],
    faqs: [
      {
        question: 'Is there a limit on how many PDFs I can merge?',
        answer: 'There is no artificial file count limit; processing runs locally in your browser.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'pdf-splitter',
    slug: 'pdf-splitter',
    name: 'PDF Splitter',
    shortDesc: 'Extract specific page ranges or split every page into separate PDF files.',
    category: 'pdf-tools',
    categoryName: 'PDF',
    tabGroup: 'pdf',
    iconKey: 'scissors',
    iconBg: 'bg-indigo-500',
    seoTitle: 'Free PDF Splitter – Extract Pages or Split PDF Online | POPTOOLS',
    seoDescription:
      'Split a PDF into individual pages or extract custom page ranges like 1-3, 5, 8-10 securely in your browser.',
    keywords: ['pdf splitter', 'extract pdf pages', 'split pdf online'],
    steps: [
      'Upload any multi-page PDF document.',
      'Choose either a custom page range (e.g., 1-3, 5) or Split All Pages.',
      'Click Split PDF and download the extracted PDF documents.',
    ],
    faqs: [
      {
        question: 'How do I format custom page ranges?',
        answer: 'Use commas and hyphens, such as "1-3, 5, 7-9", to extract only the exact pages you need.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'pdf-to-image',
    slug: 'pdf-to-image',
    name: 'PDF to Image',
    shortDesc: 'Render PDF pages into crisp high-resolution PNG or JPG images.',
    category: 'pdf-tools',
    categoryName: 'PDF',
    tabGroup: 'pdf',
    iconKey: 'image-down',
    iconBg: 'bg-blue-600',
    seoTitle: 'PDF to Image Converter – Export PDF Pages to PNG or JPG | POPTOOLS',
    seoDescription:
      'Convert PDF pages to high-resolution PNG or JPEG images online. Preview every page and download individually or all at once.',
    keywords: ['pdf to image', 'pdf to png', 'pdf to jpg', 'render pdf pages'],
    trending: true,
    steps: [
      'Upload a PDF file to render its pages.',
      'Choose PNG or JPG output and select the resolution scale (1x, 1.5x, 2x).',
      'Preview the generated images and download individual pages.',
    ],
    faqs: [
      {
        question: 'Which scale setting should I choose for crisp text?',
        answer: 'The 2x resolution scale produces sharp, print-ready images ideal for presentations.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'image-to-pdf',
    slug: 'image-to-pdf',
    name: 'Image to PDF',
    shortDesc: 'Turn one or more JPG or PNG images into a clean, shareable PDF document.',
    category: 'pdf-tools',
    categoryName: 'PDF',
    tabGroup: 'pdf',
    iconKey: 'file-plus',
    iconBg: 'bg-purple-600',
    seoTitle: 'Image to PDF Converter – Convert JPG & PNG to PDF Free | POPTOOLS',
    seoDescription:
      'Convert multiple JPG and PNG images into a single PDF document with customizable page size (A4, Letter, Fit) and margins.',
    keywords: ['image to pdf', 'jpg to pdf', 'png to pdf', 'photos to pdf'],
    steps: [
      'Upload one or multiple JPG/PNG images and arrange their order.',
      'Select page format (A4, US Letter, or Fit to Image) and margin size.',
      'Click Create PDF and download your finished PDF document.',
    ],
    faqs: [
      {
        question: 'Can I combine both JPG and PNG files in the same PDF?',
        answer: 'Yes. Upload any mix of JPG and PNG images and POPTOOLS embeds each cleanly onto its own page.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },

  // CALCULATORS & CONVERTERS
  {
    id: 'bmi-calculator',
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    shortDesc: 'Compute Body Mass Index and healthy weight range in metric or imperial units.',
    category: 'calculators',
    categoryName: 'Calculators & Converters',
    tabGroup: 'calculators',
    iconKey: 'scale',
    iconBg: 'bg-sky-500',
    seoTitle: 'Free BMI Calculator – Metric & Imperial Body Mass Index | POPTOOLS',
    seoDescription:
      'Calculate your Body Mass Index (BMI) and healthy weight range using metric (kg/cm) or imperial (lbs/ft) units.',
    keywords: ['bmi calculator', 'body mass index', 'healthy weight calculator'],
    popular: true,
    steps: [
      'Choose Metric (cm, kg) or Imperial (ft/in, lbs).',
      'Enter your height and current weight.',
      'View your BMI score, WHO classification, and healthy target weight range.',
    ],
    faqs: [
      {
        question: 'Does this BMI calculator support both kg and pounds?',
        answer: 'Yes. Switch seamlessly between Metric and US/Imperial measurements.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'age-calculator',
    slug: 'age-calculator',
    name: 'Age Calculator',
    shortDesc: 'Find exact age in years, months, days, total weeks, and next birthday.',
    category: 'calculators',
    categoryName: 'Calculators & Converters',
    tabGroup: 'calculators',
    iconKey: 'cake',
    iconBg: 'bg-pink-500',
    seoTitle: 'Free Age Calculator – Exact Years, Months, Days & Birthday | POPTOOLS',
    seoDescription:
      'Calculate your exact age from date of birth in years, months, days, total days lived, and days until your next birthday.',
    keywords: ['age calculator', 'calculate age', 'birthday countdown'],
    steps: [
      'Select your Date of Birth.',
      'Optionally adjust the target "Age at Date" (defaults to today).',
      'View your complete chronological breakdown and next birthday countdown.',
    ],
    faqs: [
      {
        question: 'Does the calculator account for leap years?',
        answer: 'Yes. Exact calendar month lengths and leap years are accounted for.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'currency-calculator',
    slug: 'currency-calculator',
    name: 'Currency Converter',
    shortDesc: 'Convert 150+ world currencies using live mid-market exchange rates.',
    category: 'calculators',
    categoryName: 'Calculators & Converters',
    tabGroup: 'calculators',
    iconKey: 'coins',
    iconBg: 'bg-emerald-500',
    seoTitle: 'Free Currency Converter – Live Worldwide Exchange Rates | POPTOOLS',
    seoDescription:
      'Convert USD, EUR, GBP, JPY, CAD, AUD, NGN, INR, and 150+ world currencies with live exchange rates.',
    keywords: ['currency converter', 'currency calculator', 'live exchange rates'],
    popular: true,
    steps: [
      'Enter the amount and select your source currency.',
      'Choose your target currency or click Swap to reverse currencies.',
      'View the live conversion rate and multi-currency reference table.',
    ],
    faqs: [
      {
        question: 'Where do the currency exchange rates come from?',
        answer: 'Rates are fetched live from open global FX feeds and cached temporarily in your browser.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'unit-converter',
    slug: 'unit-converter',
    name: 'Unit Converter',
    shortDesc: 'Convert length, weight, temperature, area, volume, speed, and data units.',
    category: 'calculators',
    categoryName: 'Calculators & Converters',
    tabGroup: 'calculators',
    iconKey: 'ruler',
    iconBg: 'bg-fuchsia-500',
    seoTitle: 'Free Online Unit Converter – Length, Weight, Temp & Data | POPTOOLS',
    seoDescription:
      'Instantly convert metric and imperial units across length, mass, temperature, area, volume, speed, and digital storage.',
    keywords: ['unit converter', 'metric converter', 'length converter', 'weight converter'],
    steps: [
      'Pick a measurement category (Length, Weight, Temperature, Speed, Data, etc.).',
      'Enter a value and select source and target units.',
      'Copy the converted value or check all equivalent units below.',
    ],
    faqs: [
      {
        question: 'Which measurement categories are supported?',
        answer: 'Length, Weight/Mass, Temperature, Area, Volume, Speed, and Digital Data Storage.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'tax-calculator',
    slug: 'tax-calculator',
    name: 'Tax Calculator',
    shortDesc: 'Calculate sales tax, VAT/GST inclusive & exclusive totals, and tax amounts.',
    category: 'calculators',
    categoryName: 'Calculators & Converters',
    tabGroup: 'calculators',
    iconKey: 'receipt',
    iconBg: 'bg-amber-500',
    seoTitle: 'Free Tax & VAT Calculator – Add or Extract Tax Online | POPTOOLS',
    seoDescription:
      'Calculate sales tax, VAT, or GST amounts from net prices or reverse-calculate pre-tax price from tax-inclusive totals.',
    keywords: ['tax calculator', 'vat calculator', 'gst calculator', 'sales tax'],
    steps: [
      'Choose Add Tax (Net → Gross) or Extract Tax (Gross → Net).',
      'Enter the amount and your local tax/VAT percentage.',
      'See the exact net price, tax amount, and final gross total.',
    ],
    faqs: [
      {
        question: 'Can I extract VAT or sales tax from a tax-inclusive total?',
        answer: 'Yes. Select Reverse / Extract Tax mode to compute the original pre-tax amount and included tax.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    shortDesc: 'Solve percentage of a number, percentage share, and percentage change.',
    category: 'calculators',
    categoryName: 'Calculators & Converters',
    tabGroup: 'calculators',
    iconKey: 'percent',
    iconBg: 'bg-orange-600',
    seoTitle: 'Free Percentage Calculator – % Change, Increase & Share | POPTOOLS',
    seoDescription:
      'Calculate percentages, percentage increase or decrease, and what percent one number is of another instantly.',
    keywords: ['percentage calculator', 'percent change calculator', 'calculate percentage'],
    popular: true,
    steps: [
      'Choose the calculation mode (X% of Y, X is what % of Y, or % Change).',
      'Enter your two numeric values.',
      'Read the exact result and formula breakdown immediately.',
    ],
    faqs: [
      {
        question: 'Does the percentage change mode show both increase and decrease?',
        answer: 'Yes. It calculates the signed percentage difference and clearly labels increases vs decreases.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'loan-calculator',
    slug: 'loan-calculator',
    name: 'Loan Calculator',
    shortDesc: 'Calculate monthly EMI payments, total interest, and full amortization schedule.',
    category: 'calculators',
    categoryName: 'Calculators & Converters',
    tabGroup: 'calculators',
    iconKey: 'landmark',
    iconBg: 'bg-violet-700',
    seoTitle: 'Free Loan Calculator – Monthly Payment & Amortization Schedule | POPTOOLS',
    seoDescription:
      'Calculate monthly loan payments, total interest cost, and download a complete amortization schedule CSV.',
    keywords: ['loan calculator', 'emi calculator', 'mortgage amortization calculator'],
    trending: true,
    steps: [
      'Enter the loan principal, annual interest rate (%), and term length.',
      'Review monthly payment, total principal, and total interest breakdown.',
      'Inspect the amortization table or export the schedule as a CSV file.',
    ],
    faqs: [
      {
        question: 'Can I export the amortization schedule?',
        answer: 'Yes. Click Export CSV to download the complete period-by-period table.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'discount-calculator',
    slug: 'discount-calculator',
    name: 'Discount Calculator',
    shortDesc: 'Compute sale price, total savings, stacked discounts, and optional sales tax.',
    category: 'calculators',
    categoryName: 'Calculators & Converters',
    tabGroup: 'calculators',
    iconKey: 'tag',
    iconBg: 'bg-blue-600',
    seoTitle: 'Free Discount Calculator – Sale Price, Savings & Tax | POPTOOLS',
    seoDescription:
      'Calculate final sale prices after percentage discounts, optional extra coupon discounts, and sales tax in seconds.',
    keywords: ['discount calculator', 'sale price calculator', 'percent off calculator'],
    steps: [
      'Enter the original product price and primary discount percentage.',
      'Optionally add an extra coupon discount and local sales tax rate.',
      'See your final price and total amount saved.',
    ],
    faqs: [
      {
        question: 'How are stacked discounts applied?',
        answer: 'The extra coupon percentage is applied sequentially to the already discounted price.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },

  // IMAGE TOOLS
  {
    id: 'image-compressor',
    slug: 'image-compressor',
    name: 'Image Compressor',
    shortDesc: 'Reduce JPG, PNG, and WebP file size while keeping crisp visual clarity.',
    category: 'image-tools',
    categoryName: 'Image Tools',
    tabGroup: 'image',
    iconKey: 'image',
    iconBg: 'bg-violet-600',
    seoTitle: 'Free Image Compressor – Reduce Image File Size Online | POPTOOLS',
    seoDescription:
      'Compress JPG, PNG, and WebP images online in seconds. Adjust compression quality, preview file savings, and download instantly.',
    keywords: ['image compressor', 'compress jpg', 'reduce image size', 'optimize photo'],
    popular: true,
    trending: true,
    steps: [
      'Upload a JPG, PNG, or WebP image from your device.',
      'Adjust the quality slider and choose your target output format.',
      'Compare the before and after file sizes and click Download.',
    ],
    faqs: [
      {
        question: 'Are my images uploaded to a server during compression?',
        answer: 'No. POPTOOLS compresses every image locally inside your browser using HTML5 Canvas.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'image-resizer',
    slug: 'image-resizer',
    name: 'Image Resizer',
    shortDesc: 'Resize images by exact pixel dimensions or percentage with aspect ratio lock.',
    category: 'image-tools',
    categoryName: 'Image Tools',
    tabGroup: 'image',
    iconKey: 'maximize',
    iconBg: 'bg-blue-600',
    seoTitle: 'Free Image Resizer – Resize Photos by Pixels or Percentage | POPTOOLS',
    seoDescription:
      'Resize JPG, PNG, and WebP images online with exact width and height controls, aspect ratio lock, and instant preview.',
    keywords: ['image resizer', 'resize photo', 'change image dimensions', 'scale image'],
    popular: true,
    steps: [
      'Drop or select any image file from your computer or phone.',
      'Enter custom pixel dimensions or pick a quick scale preset (25%, 50%, 75%).',
      'Preview the resized output and download your new image file.',
    ],
    faqs: [
      {
        question: 'How do I prevent my resized image from stretching?',
        answer: 'Keep the Aspect Ratio Lock enabled so changing width calculates height proportionally.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'jpg-to-png',
    slug: 'jpg-to-png',
    name: 'JPG to PNG',
    shortDesc: 'Convert JPEG photographs into lossless PNG images instantly.',
    category: 'image-tools',
    categoryName: 'Image Tools',
    tabGroup: 'image',
    iconKey: 'repeat',
    iconBg: 'bg-emerald-600',
    seoTitle: 'JPG to PNG Converter – Free Online Lossless Conversion | POPTOOLS',
    seoDescription:
      'Convert JPG and JPEG images to lossless PNG format right in your browser. Fast, private, and no registration required.',
    keywords: ['jpg to png', 'jpeg to png converter', 'convert jpg to png'],
    steps: [
      'Select or drag a JPG/JPEG image into the converter.',
      'POPTOOLS automatically renders a lossless PNG version in your browser.',
      'Verify the preview and dimensions, then click Download PNG.',
    ],
    faqs: [
      {
        question: 'Why convert JPG to PNG?',
        answer: 'PNG uses lossless compression, ideal for graphics and crisp screenshots.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'png-to-jpg',
    slug: 'png-to-jpg',
    name: 'PNG to JPG',
    shortDesc: 'Convert PNG files to lightweight JPG with custom transparency fill color.',
    category: 'image-tools',
    categoryName: 'Image Tools',
    tabGroup: 'image',
    iconKey: 'repeat',
    iconBg: 'bg-amber-500',
    seoTitle: 'PNG to JPG Converter – Convert PNG with Custom Background | POPTOOLS',
    seoDescription:
      'Convert PNG images to smaller JPG files online. Customize the background color for transparent areas and control output quality.',
    keywords: ['png to jpg', 'png to jpeg', 'convert png to jpg'],
    steps: [
      'Upload a PNG image (including PNGs with transparent backgrounds).',
      'Pick a background fill color (white by default) and JPG quality level.',
      'Download your optimized JPG file immediately.',
    ],
    faqs: [
      {
        question: 'What happens to transparent areas in a PNG when converted to JPG?',
        answer: 'POPTOOLS fills transparent pixels with your chosen background color (white by default).',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'image-cropper',
    slug: 'image-cropper',
    name: 'Image Cropper',
    shortDesc: 'Crop images interactively with freeform selection or standard aspect presets.',
    category: 'image-tools',
    categoryName: 'Image Tools',
    tabGroup: 'image',
    iconKey: 'crop',
    iconBg: 'bg-rose-500',
    seoTitle: 'Free Online Image Cropper – Crop Photos & Aspect Ratios | POPTOOLS',
    seoDescription:
      'Crop photos online with drag-and-drop selection and presets for 1:1, 16:9, 4:3, and 3:4 aspect ratios.',
    keywords: ['image cropper', 'crop photo online', 'aspect ratio crop'],
    trending: true,
    steps: [
      'Upload the image you want to crop.',
      'Drag the crop frame or choose an aspect ratio preset (1:1, 16:9, 4:3, 3:4).',
      'Click Download Cropped Image to save.',
    ],
    faqs: [
      {
        question: 'Can I crop an image to an exact square for profile avatars?',
        answer: 'Yes. Select the 1:1 preset, drag the frame, and download.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },

  // PRODUCTIVITY (QR + TEXT TOOLS)
  {
    id: 'qr-code-generator',
    slug: 'qr-code-generator',
    name: 'QR Code Generator',
    shortDesc: 'Create customizable QR codes for URLs, WiFi, email, and text in PNG or SVG.',
    category: 'qr-tools',
    categoryName: 'Productivity',
    tabGroup: 'productivity',
    iconKey: 'qr',
    iconBg: 'bg-indigo-600',
    seoTitle: 'Free QR Code Generator – Custom PNG & SVG QR Codes | POPTOOLS',
    seoDescription:
      'Generate crisp QR codes for links, WiFi networks, emails, and plain text. Customize colors, error correction, and export PNG or SVG.',
    keywords: ['qr code generator', 'create qr code', 'wifi qr code', 'svg qr code'],
    popular: true,
    trending: true,
    steps: [
      'Select a QR payload type (URL, Text, WiFi, Email, or Phone) and enter details.',
      'Customize foreground/background colors, size, and error correction level.',
      'Download your crisp QR code as a PNG or scalable SVG vector.',
    ],
    faqs: [
      {
        question: 'Do POPTOOLS QR codes expire?',
        answer: 'Never. POPTOOLS generates static direct-payload QR codes with zero expiration.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'qr-code-reader',
    slug: 'qr-code-reader',
    name: 'QR Code Reader',
    shortDesc: 'Scan and decode QR codes from uploaded images or live device camera.',
    category: 'qr-tools',
    categoryName: 'Productivity',
    tabGroup: 'productivity',
    iconKey: 'scan',
    iconBg: 'bg-cyan-600',
    seoTitle: 'Free QR Code Reader – Scan QR from Image or Camera | POPTOOLS',
    seoDescription:
      'Decode any QR code online by uploading an image file or scanning live with your webcam.',
    keywords: ['qr code reader', 'qr scanner online', 'decode qr image'],
    steps: [
      'Upload an image containing a QR code or click Scan with Camera.',
      'POPTOOLS automatically detects and decodes the QR payload locally.',
      'Copy the decoded text or open detected URLs safely.',
    ],
    faqs: [
      {
        question: 'Is camera scanning private?',
        answer: 'Yes. Video frames are analyzed locally in memory and never transmitted.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'word-counter',
    slug: 'word-counter',
    name: 'Word Counter',
    shortDesc: 'Analyze words, sentences, paragraphs, reading time, and top keyword density.',
    category: 'text-tools',
    categoryName: 'Productivity',
    tabGroup: 'productivity',
    iconKey: 'type',
    iconBg: 'bg-sky-600',
    seoTitle: 'Free Word Counter – Words, Reading Time & Keyword Density | POPTOOLS',
    seoDescription:
      'Count words, sentences, paragraphs, and estimated reading and speaking times in real time with keyword frequency insights.',
    keywords: ['word counter', 'count words online', 'reading time calculator'],
    popular: true,
    steps: [
      'Paste or type your article, essay, or copy into the editor.',
      'View live word, sentence, paragraph, and reading time metrics.',
      'Inspect the top keyword density breakdown or copy your text.',
    ],
    faqs: [
      {
        question: 'How is reading time calculated?',
        answer: 'POPTOOLS uses an average adult silent reading speed of 225 words per minute.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'character-counter',
    slug: 'character-counter',
    name: 'Character Counter',
    shortDesc: 'Check exact character counts, UTF-8 bytes, lines, and social platform limits.',
    category: 'text-tools',
    categoryName: 'Productivity',
    tabGroup: 'productivity',
    iconKey: 'hash',
    iconBg: 'bg-teal-600',
    seoTitle: 'Free Character Counter – Characters, Bytes & Social Limits | POPTOOLS',
    seoDescription:
      'Count characters with and without spaces, UTF-8 byte size, lines, and check limits for SEO titles and social posts.',
    keywords: ['character counter', 'letter counter', 'meta description length'],
    steps: [
      'Type or paste text into the input box.',
      'Monitor characters with spaces, without spaces, lines, and UTF-8 bytes.',
      'Check live progress against SEO and social media limits.',
    ],
    faqs: [
      {
        question: 'Why does UTF-8 byte count matter?',
        answer: 'Emoji and non-ASCII characters take 2 to 4 bytes in UTF-8, important for SMS and API limits.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'case-converter',
    slug: 'case-converter',
    name: 'Case Converter',
    shortDesc: 'Transform text between UPPERCASE, Title Case, camelCase, snake_case, and more.',
    category: 'text-tools',
    categoryName: 'Productivity',
    tabGroup: 'productivity',
    iconKey: 'case',
    iconBg: 'bg-violet-500',
    seoTitle: 'Free Case Converter – Uppercase, Title Case, camelCase & More | POPTOOLS',
    seoDescription:
      'Instantly convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and kebab-case online.',
    keywords: ['case converter', 'title case converter', 'uppercase to lowercase'],
    steps: [
      'Paste or type the text you want to reformat.',
      'Click any case transformation button.',
      'Copy the converted text or download it as a .txt file.',
    ],
    faqs: [
      {
        question: 'Does Title Case handle small connecting words properly?',
        answer: 'Yes. Minor articles and prepositions remain lowercase inside headlines.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'text-cleaner',
    slug: 'text-cleaner',
    name: 'Text Cleaner',
    shortDesc: 'Strip extra spaces, blank lines, duplicate lines, and HTML tags in one click.',
    category: 'text-tools',
    categoryName: 'Productivity',
    tabGroup: 'productivity',
    iconKey: 'eraser',
    iconBg: 'bg-orange-500',
    seoTitle: 'Free Text Cleaner – Remove Extra Spaces, Duplicates & HTML | POPTOOLS',
    seoDescription:
      'Clean messy copied text by removing extra spaces, blank lines, duplicate entries, line breaks, or HTML tags instantly.',
    keywords: ['text cleaner', 'remove duplicate lines', 'remove extra spaces', 'strip html'],
    steps: [
      'Paste messy text from PDFs, emails, or web pages.',
      'Toggle the cleaning rules you need.',
      'Copy the clean, normalized output in one click.',
    ],
    faqs: [
      {
        question: 'Can I sort lines alphabetically while removing duplicates?',
        answer: 'Yes. Enable both Remove Duplicate Lines and Sort Lines (A–Z).',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'lorem-ipsum-generator',
    slug: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    shortDesc: 'Generate clean placeholder paragraphs, sentences, or words for layouts.',
    category: 'text-tools',
    categoryName: 'Productivity',
    tabGroup: 'productivity',
    iconKey: 'align-left',
    iconBg: 'bg-slate-700',
    seoTitle: 'Lorem Ipsum Generator – Free Placeholder Text Generator | POPTOOLS',
    seoDescription:
      'Generate customizable Lorem Ipsum placeholder paragraphs, sentences, or word counts with optional HTML paragraph tags.',
    keywords: ['lorem ipsum generator', 'placeholder text', 'dummy text generator'],
    steps: [
      'Select Paragraphs, Sentences, or Words and enter the desired count.',
      'Choose whether to wrap output in HTML <p> tags.',
      'Click Regenerate and copy the placeholder copy.',
    ],
    faqs: [
      {
        question: 'Can I generate HTML-wrapped paragraphs?',
        answer: 'Yes, toggle Wrap paragraphs in HTML <p> tags.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },

  // DEVELOPER TOOLS
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    name: 'JSON Formatter',
    shortDesc: 'Prettify, minify, sort keys, and validate JSON syntax with error details.',
    category: 'developer-tools',
    categoryName: 'Developer Tools',
    tabGroup: 'developer',
    iconKey: 'braces',
    iconBg: 'bg-indigo-600',
    seoTitle: 'Free JSON Formatter & Validator – Prettify & Minify JSON | POPTOOLS',
    seoDescription:
      'Format, indent, minify, and validate JSON payloads online with instant syntax error detection and one-click copy.',
    keywords: ['json formatter', 'json validator', 'json beautifier', 'minify json'],
    popular: true,
    trending: true,
    steps: [
      'Paste raw or minified JSON data into the input editor.',
      'Choose indentation (2 spaces, 4 spaces, or tabs) or click Minify.',
      'Copy the formatted JSON or download it as a .json file.',
    ],
    faqs: [
      {
        question: 'Can I sort JSON object keys alphabetically?',
        answer: 'Yes. Enable Sort Keys A–Z to normalize JSON payloads.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'base64-encoder-decoder',
    slug: 'base64-encoder-decoder',
    name: 'Base64 Encoder / Decoder',
    shortDesc: 'Encode or decode UTF-8 text and convert files into Base64 data URIs.',
    category: 'developer-tools',
    categoryName: 'Developer Tools',
    tabGroup: 'developer',
    iconKey: 'binary',
    iconBg: 'bg-blue-700',
    seoTitle: 'Free Base64 Encoder & Decoder – Text & File Data URI | POPTOOLS',
    seoDescription:
      'Encode and decode UTF-8 strings to Base64 or convert any file into a Base64 Data URI safely in your browser.',
    keywords: ['base64 encoder', 'base64 decoder', 'file to base64'],
    steps: [
      'Choose Encode Text, Decode Base64, or File to Base64 mode.',
      'Paste text or drop a file to convert instantly.',
      'Copy the Base64 output or decoded plain text.',
    ],
    faqs: [
      {
        question: 'Does this support Unicode and emoji characters?',
        answer: 'Yes. POPTOOLS uses TextEncoder and TextDecoder for full UTF-8 compatibility.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'url-encoder-decoder',
    slug: 'url-encoder-decoder',
    name: 'URL Encoder / Decoder',
    shortDesc: 'Encode or decode URL components and inspect parsed query string parameters.',
    category: 'developer-tools',
    categoryName: 'Developer Tools',
    tabGroup: 'developer',
    iconKey: 'link',
    iconBg: 'bg-teal-600',
    seoTitle: 'Free URL Encoder & Decoder + Query String Parser | POPTOOLS',
    seoDescription:
      'Safely percent-encode or decode URLs and inspect every query parameter key and value in a structured table.',
    keywords: ['url encoder', 'url decoder', 'query string parser'],
    steps: [
      'Paste a URL, query string, or raw text parameter.',
      'Switch between Encode and Decode (Component or Full URI mode).',
      'Inspect parsed query parameters and copy the result.',
    ],
    faqs: [
      {
        question: 'When should I use Component mode vs Full URI mode?',
        answer: 'Use Component mode for query parameter values; use Full URI mode to keep protocol slashes intact.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'password-generator',
    slug: 'password-generator',
    name: 'Password Generator',
    shortDesc: 'Generate cryptographically random passwords with entropy strength analysis.',
    category: 'developer-tools',
    categoryName: 'Developer Tools',
    tabGroup: 'developer',
    iconKey: 'key',
    iconBg: 'bg-emerald-600',
    seoTitle: 'Free Secure Password Generator – Cryptographic Random Passwords | POPTOOLS',
    seoDescription:
      'Create strong, unpredictable passwords locally using Web Crypto API (crypto.getRandomValues) with custom length and character rules.',
    keywords: ['password generator', 'random password', 'strong password generator'],
    popular: true,
    steps: [
      'Choose your desired password length and character sets.',
      'Optionally exclude ambiguous characters or generate a batch of passwords.',
      'Click Copy to store your newly generated password on the clipboard.',
    ],
    faqs: [
      {
        question: 'How random are the generated passwords?',
        answer: 'POPTOOLS uses window.crypto.getRandomValues with rejection sampling.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'html-formatter',
    slug: 'html-formatter',
    name: 'HTML Formatter',
    shortDesc: 'Beautify indented HTML markup or minify HTML for faster production pages.',
    category: 'developer-tools',
    categoryName: 'Developer Tools',
    tabGroup: 'developer',
    iconKey: 'code',
    iconBg: 'bg-purple-700',
    seoTitle: 'Free HTML Formatter & Minifier – Beautify HTML Online | POPTOOLS',
    seoDescription:
      'Format messy HTML code with clean indentation or minify HTML markup to reduce page weight in your browser.',
    keywords: ['html formatter', 'html beautifier', 'minify html'],
    steps: [
      'Paste your raw or minified HTML snippet into the editor.',
      'Select Beautify (2 or 4 spaces) or Minify.',
      'Copy the clean HTML or download it as an .html file.',
    ],
    faqs: [
      {
        question: 'Does the formatter preserve inline text and void elements?',
        answer: 'Yes. Standard HTML5 void tags are handled cleanly without extra indentation.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },

  // AI TOOLS
  {
    id: 'text-summarizer',
    slug: 'text-summarizer',
    name: 'Smart Text Summarizer',
    shortDesc: 'Condense long articles into key bullet takeaways using extractive scoring.',
    category: 'ai-tools',
    categoryName: 'AI Tools',
    tabGroup: 'ai',
    iconKey: 'sparkles',
    iconBg: 'bg-violet-600',
    seoTitle: 'Free Smart Text Summarizer – Key Takeaways Online | POPTOOLS',
    seoDescription:
      'Summarize long articles, essays, and reports into concise key sentences instantly in your browser with zero data sharing.',
    keywords: ['text summarizer', 'article summary tool', 'summarize text'],
    popular: true,
    steps: [
      'Paste any long article, essay, or notes into the editor.',
      'Select how many key summary sentences (3, 5, or 7) you want.',
      'Copy the concise summary or download it as text.',
    ],
    faqs: [
      {
        question: 'How does the Smart Text Summarizer work locally?',
        answer: 'It scores each sentence by term frequency, keyword salience, and structural position to extract the highest-signal takeaways without sending text off your device.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'grammar-readability-checker',
    slug: 'grammar-readability-checker',
    name: 'Readability & Grammar Checker',
    shortDesc: 'Analyze reading grade level, repeated words, passive voice, and spacing.',
    category: 'ai-tools',
    categoryName: 'AI Tools',
    tabGroup: 'ai',
    iconKey: 'spell-check',
    iconBg: 'bg-blue-600',
    seoTitle: 'Free Readability & Grammar Checker – Clarity & Grade Score | POPTOOLS',
    seoDescription:
      'Check Flesch-Kincaid readability score, detect repeated words, long sentences, passive voice, and spacing errors online.',
    keywords: ['grammar checker', 'readability score', 'writing analyzer'],
    steps: [
      'Paste your draft email, blog post, or report.',
      'Review Flesch Reading Ease score and flagged style/grammar issues.',
      'Apply quick fixes or copy your polished draft.',
    ],
    faqs: [
      {
        question: 'What readability metric is used?',
        answer: 'POPTOOLS computes the standard Flesch Reading Ease score (0–100) and Flesch-Kincaid Grade Level.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
  {
    id: 'prompt-builder',
    slug: 'prompt-builder',
    name: 'AI Prompt Optimizer',
    shortDesc: 'Structure clear role, task, context, and output rules with token estimates.',
    category: 'ai-tools',
    categoryName: 'AI Tools',
    tabGroup: 'ai',
    iconKey: 'wand',
    iconBg: 'bg-fuchsia-600',
    seoTitle: 'Free AI Prompt Optimizer – Structured Prompt Builder | POPTOOLS',
    seoDescription:
      'Build structured, reproducible AI prompts with Role, Context, Constraints, Output Format, and live token estimation.',
    keywords: ['ai prompt builder', 'prompt optimizer', 'token counter'],
    steps: [
      'Fill in the Role, Primary Task, Context, and Constraints fields.',
      'Choose your preferred output format (Markdown, JSON, XML tags).',
      'Copy the compiled prompt and estimated token count.',
    ],
    faqs: [
      {
        question: 'Why structure prompts with explicit sections?',
        answer: 'Separating role, context, constraints, and output format produces consistent, lower-hallucination results across modern LLMs.',
      },
    ],
    tier: 'free',
    processingMode: 'client-browser',
    localesSupported: ['en', 'es', 'fr', 'de', 'pt', 'ja'],
  },
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getCategoryBySlug(slug: string): CategoryDefinition | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getToolsByCategory(categoryId: CategoryId): ToolDefinition[] {
  return TOOLS.filter((t) => t.category === categoryId);
}
