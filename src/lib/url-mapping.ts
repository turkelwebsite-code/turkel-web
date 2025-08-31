// URL mapping between Turkish and English pages
export const URL_MAPPING = {
  // Turkish to English
  tr: {
    '/': '/',
    '/hakkimizda/': '/about-us/',
    '/ekibimiz/': '/our-team/',
    '/kronoloji/': '/chronology/',
    '/fuarlarimiz/': '/our-fairs/',
    '/nakliye/': '/shipping/',
    '/turizm/': '/tourism/',
    '/iletisim/': '/contact/',
    '/2026-fuar-takvimi/': '/2026-fair-calendar/',
    '/2025-fuar-takvimi/': '/2025-fair-calendar/',
    '/2024-fuar-takvimi/': '/2024-fair-calendar/',
    '/2023-fuar-takvimi/': '/2023-fair-calendar/',
    '/2022-fuar-takvimi/': '/2022-fair-calendar/',
    '/galeri/': '/gallery/'
  },
  // English to Turkish  
  en: {
    '/': '/',
    '/about-us/': '/hakkimizda/',
    '/our-team/': '/ekibimiz/',
    '/chronology/': '/kronoloji/',
    '/our-fairs/': '/fuarlarimiz/',
    '/shipping/': '/nakliye/',
    '/tourism/': '/turizm/',
    '/contact/': '/iletisim/',
    '/2026-fair-calendar/': '/2026-fuar-takvimi/',
    '/2025-fair-calendar/': '/2025-fuar-takvimi/',
    '/2024-fair-calendar/': '/2024-fuar-takvimi/',
    '/2023-fair-calendar/': '/2023-fuar-takvimi/',
    '/2022-fair-calendar/': '/2022-fuar-takvimi/',
    '/gallery/': '/galeri/'
  }
} as const;

export function getTargetUrl(currentLocale: 'tr' | 'en', targetLocale: 'tr' | 'en', currentPath: string): string {
  // Remove current locale from path and .html extension
  let pathWithoutLocale = currentPath.replace(`/${currentLocale}`, '') || '/';
  pathWithoutLocale = pathWithoutLocale.replace('.html', '');
  
  // Add trailing slash if not present and not root
  if (pathWithoutLocale !== '/' && !pathWithoutLocale.endsWith('/')) {
    pathWithoutLocale += '/';
  }
  
  // Get mapped path for target locale
  const mapping = URL_MAPPING[currentLocale];
  const mappedPath = mapping[pathWithoutLocale as keyof typeof mapping] || pathWithoutLocale;
  
  const finalUrl = `/${targetLocale}${mappedPath}`;
  
  // Return target URL
  return finalUrl;
}
