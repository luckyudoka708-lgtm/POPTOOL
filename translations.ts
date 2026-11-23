export type LocaleCode = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'ja';

export interface LocaleOption {
  code: LocaleCode;
  label: string;
}

export const SUPPORTED_LOCALES: LocaleOption[] = [
  {code: 'en', label: 'English'},
  {code: 'es', label: 'Español'},
  {code: 'fr', label: 'Français'},
  {code: 'de', label: 'Deutsch'},
  {code: 'pt', label: 'Português'},
  {code: 'ja', label: '日本語'},
];

export interface UiStrings {
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  searchPlaceholder: string;
  popularTitle: string;
  trendingTitle: string;
  categoriesTitle: string;
  exploreTools: string;
}

export const TRANSLATIONS: Record<LocaleCode, UiStrings> = {
  en: {
    tagline: 'Everything You Need. One Free Platform.',
    heroTitle: 'Every daily utility, running privately in your browser.',
    heroSubtitle:
      'Compress images, merge PDFs, format code, generate QR codes, and run financial calculations with zero sign-up and zero server uploads.',
    searchPlaceholder: 'Search 27 tools (e.g. PDF Merger, JSON, Compressor, QR)...',
    popularTitle: 'Popular Tools',
    trendingTitle: 'Trending Now',
    categoriesTitle: 'Browse by Category',
    exploreTools: 'Explore All Tools',
  },
  es: {
    tagline: 'Todo lo que necesitas. Una plataforma gratuita.',
    heroTitle: 'Cada utilidad diaria, funcionando de forma privada en tu navegador.',
    heroSubtitle:
      'Comprime imágenes, une PDFs, formatea código, genera códigos QR y calcula finanzas al instante y sin registro.',
    searchPlaceholder: 'Buscar herramientas (ej. PDF, JSON, Compresor, QR)...',
    popularTitle: 'Herramientas Populares',
    trendingTitle: 'Tendencias',
    categoriesTitle: 'Explorar por Categoría',
    exploreTools: 'Ver Todas las Herramientas',
  },
  fr: {
    tagline: 'Tout ce dont vous avez besoin. Une plateforme gratuite.',
    heroTitle: 'Chaque outil du quotidien, exécuté en toute confidentialité dans votre navigateur.',
    heroSubtitle:
      'Compressez des images, fusionnez des PDF, formatez du code, générez des QR codes et effectuez vos calculs sans inscription.',
    searchPlaceholder: 'Rechercher un outil (ex. PDF, JSON, Compresseur, QR)...',
    popularTitle: 'Outils Populaires',
    trendingTitle: 'Tendances',
    categoriesTitle: 'Parcourir par Catégorie',
    exploreTools: 'Explorer Tous les Outils',
  },
  de: {
    tagline: 'Alles, was Sie brauchen. Eine kostenlose Plattform.',
    heroTitle: 'Jedes tägliche Werkzeug, privat direkt in Ihrem Browser.',
    heroSubtitle:
      'Bilder komprimieren, PDFs zusammenfügen, Code formatieren, QR-Codes erstellen und Finanzberechnungen ohne Anmeldung durchführen.',
    searchPlaceholder: 'Tools durchsuchen (z. B. PDF, JSON, Kompressor, QR)...',
    popularTitle: 'Beliebte Tools',
    trendingTitle: 'Aktuell im Trend',
    categoriesTitle: 'Nach Kategorie durchsuchen',
    exploreTools: 'Alle Tools Entdecken',
  },
  pt: {
    tagline: 'Tudo o que você precisa. Uma plataforma gratuita.',
    heroTitle: 'Cada utilitário diário, rodando com privacidade no seu navegador.',
    heroSubtitle:
      'Comprima imagens, junte PDFs, formate código, gere QR codes e faça cálculos financeiros sem cadastro.',
    searchPlaceholder: 'Pesquisar ferramentas (ex. PDF, JSON, Compressor, QR)...',
    popularTitle: 'Ferramentas Populares',
    trendingTitle: 'Em Alta',
    categoriesTitle: 'Explorar por Categoria',
    exploreTools: 'Ver Todas as Ferramentas',
  },
  ja: {
    tagline: '必要なものすべてを、ひとつの無料プラットフォームで。',
    heroTitle: '毎日のユーティリティを、ブラウザ上で安全に完結。',
    heroSubtitle:
      '画像圧縮、PDF結合、コード整形、QRコード作成、各種計算を登録不要・ローカル処理で高速に実行できます。',
    searchPlaceholder: 'ツールを検索 (例: PDF結合, JSON, 画像圧縮, QR)...',
    popularTitle: '人気のツール',
    trendingTitle: 'トレンドのツール',
    categoriesTitle: 'カテゴリーから探す',
    exploreTools: 'すべてのツールを見る',
  },
};
