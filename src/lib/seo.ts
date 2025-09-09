import type { Locale } from './i18n';

export interface SEOProps {
  title: string;
  description: string;
  locale: Locale;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
}

export function generateSEOTags({
  title,
  description,
  locale,
  canonical,
  ogImage = '/images/turkel-og-image.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image'
}: SEOProps) {
  const siteUrl = 'https://turkel.com.tr';
  const fullTitle = title.includes('Türkel') ? title : `${title} | Türkel Fuarcılık`;
  
  return {
    title: fullTitle,
    description,
    canonical: canonical ? `${siteUrl}${canonical}` : undefined,
    og: {
      title: fullTitle,
      description,
      type: ogType,
      image: `${siteUrl}${ogImage}`,
      url: canonical ? `${siteUrl}${canonical}` : siteUrl,
      locale: locale === 'tr' ? 'tr_TR' : 'en_US'
    },
    twitter: {
      card: twitterCard,
      title: fullTitle,
      description,
      image: `${siteUrl}${ogImage}`
    }
  };
}

export function generateHreflang(currentPath: string) {
  const siteUrl = 'https://turkel2025.netlify.app';
  
  return [
    {
      hreflang: 'tr',
      href: `${siteUrl}/tr${currentPath}`
    },
    {
      hreflang: 'en', 
      href: `${siteUrl}/en${currentPath}`
    },
    {
      hreflang: 'x-default',
      href: `${siteUrl}/tr${currentPath}`
    }
  ];
}

export function generateStructuredData(locale: Locale) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Türkel Fuarcılık A.Ş.",
    "description": locale === 'tr' 
      ? "Türk fuarcılık sektörünün önde gelen uluslararası fuar organizatörü"
      : "Leading international fair organizer in Turkish fair industry",
    "url": "https://turkel2025.netlify.app",
    "logo": "https://turkel2025.netlify.app/images/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+90-212-284-23-00",
      "contactType": "customer service",
      "email": "support@gensure.com",
      "availableLanguage": ["Turkish", "English"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Huzur Mah. Fatih Cad. 4.Levent Plaza 67/6",
      "addressLocality": "Sarıyer",
      "addressRegion": "İstanbul",
      "postalCode": "34396",
      "addressCountry": "TR"
    },
    "sameAs": [
      "https://www.leshowistanbul.com",
      "https://www.leshow.ru",
      "https://www.homedecofair.com"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Türkel Fuarcılık",
    "url": "https://turkel2025.netlify.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://turkel2025.netlify.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return [organizationSchema, websiteSchema];
}
