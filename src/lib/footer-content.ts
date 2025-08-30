export const FOOTER_CONTENT: {
  tr: {
    description: string;
    sections: {
      contact: string;
      calendar: string;
      links: string;
      fairs: string;
    };
    links: {
      calendar: string[];
      useful: string[];
      fairs: string[];
    };
    copyright: string;
  };
  en: {
    description: string;
    sections: {
      contact: string;
      calendar: string;
      links: string;
      fairs: string;
    };
    links: {
      calendar: string[];
      useful: string[];
      fairs: string[];
    };
    copyright: string;
  };
} = {
  tr: {
    description: '30 yıllık sektör deneyimimiz ve 4 kıtaya yayılan geniş ağımızla, 15 farklı sektörde yüzlerce iş ortağıyla birlikte küresel ölçekte güçlü fuar organizasyonları sunuyoruz.',
    sections: {
      contact: 'İLETİŞİM',
      calendar: 'FUAR TAKVİMİ',
      links: 'FAYDALI LİNKLER',
      fairs: 'FUARLARIMIZ'
    },
    links: {
      calendar: [
        '2026 Fuar Takvimi',
        '2025 Fuar Takvimi',
        '2024 Fuar Takvimi',
        '2023 Fuar Takvimi',
        '2022 Fuar Takvimi'
      ],
      useful: [
        'T.C. Ticaret Bakanlığı Destekleri',
        'KOSGEB Destekleri',
        'Fuar Katılım Planlaması',
        'Organizasyon Yönetimi',
        'Tanıtım ve Pazarlama'
      ],
      fairs: [
        'www.leshowistanbul.com',
        'www.leshow.ru',
        'www.homedecofair.com'
      ]
    },
    copyright: '©2025 Türkel Fuarcılık - Tüm Hakları Saklıdır'
  },
  en: {
    description: 'Leading professional international fair organizer in Turkish fair industry with 30 years experience and global network.',
    sections: {
      contact: 'CONTACT',
      calendar: 'FAIR CALENDAR',
      links: 'USEFUL LINKS',
      fairs: 'OUR FAIRS'
    },
    links: {
      calendar: [
        '2026 Fair Calendar',
        '2025 Fair Calendar',
        '2024 Fair Calendar',
        '2023 Fair Calendar',
        '2022 Fair Calendar'
      ],
      useful: [
        'Ministry of Trade Support',
        'KOSGEB Support',
        'Fair Participation Planning',
        'Organization Management',
        'Promotion and Marketing'
      ],
      fairs: [
        'www.leshowistanbul.com',
        'www.leshow.ru',
        'www.homedecofair.com'
      ]
    },
    copyright: '©2025 Türkel Fair Organization - All Rights Reserved'
  }
} as const;
