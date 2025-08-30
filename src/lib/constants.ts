export const SITE_CONFIG = {
  name: 'Türkel Fuarcılık',
  description: {
    tr: 'Türk fuarcılık sektörünün önde gelen ve deneyimli bir profesyonel uluslararası fuar ve ticari etkinlik organizatörü',
    en: 'Leading and experienced professional international fair and commercial event organizer in the Turkish fair industry'
  },
  url: 'https://turkel2025.netlify.app',
  author: 'Türkel Fuarcılık A.Ş.',
  contact: {
    phone: '+90 (212) 284 23 00',
    email: 'info@turkel.com.tr',
    address: {
      tr: 'Huzur Mah. Fatih Cad. 4.Levent Plaza 67/6 4.Levent, Sarıyer 34396 İstanbul – Türkiye',
      en: 'Huzur Mah. Fatih Cad. 4.Levent Plaza 67/6 4.Levent, Sarıyer 34396 Istanbul – Turkey'
    }
  },
  social: {
    facebook: 'https://www.facebook.com/TurkelFairOrganizations/',
    youtube: 'https://www.youtube.com/user/turkelfair',
    instagram: 'https://www.instagram.com/turkelfair/',
    linkedin: 'https://www.linkedin.com/company/türkel-fuarcilik-a-ş'
  }
} as const;

export const NAVIGATION_ITEMS = {
  tr: [
    { label: 'ANASAYFA', href: '/tr/' },
    { label: 'KURUMSAL', href: null, hasDropdown: true },
    { label: 'FUARLARIMIZ', href: null, hasDropdown: true },
    { label: 'HİZMETLERİMİZ', href: null, hasDropdown: true },
    { label: 'FAYDALI LİNKLER', href: null, hasDropdown: true },
    { label: 'İLETİŞİM', href: '/tr/iletisim/' }
  ],
  en: [
    { label: 'HOME', href: '/en/' },
    { label: 'CORPORATE', href: null, hasDropdown: true },
    { label: 'OUR FAIRS', href: null, hasDropdown: true },
    { label: 'SERVICES', href: null, hasDropdown: true },
    { label: 'USEFUL LINKS', href: null, hasDropdown: true },
    { label: 'CONTACT', href: '/en/contact/' }
  ]
} as const;

export const PERFORMANCE_LIMITS = {
  htmlBudget: 35, // KB
  cssBudget: 60,  // KB
  jsBudget: 30,   // KB
  clsTarget: 0.02,
  lighthouseTargets: {
    performance: 95,
    seo: 100,
    accessibility: 95,
    bestPractices: 95
  }
} as const;
