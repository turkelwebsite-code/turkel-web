# Türkel Fuarcılık 2025 - Website

Modern, çok dilli (Türkçe/İngilizce) kurumsal fuar sitesi. Astro 4, TailwindCSS ve TypeScript ile geliştirilmiştir.

## 🚀 Özellikler

- ✅ **Modern Framework**: Astro 4 ile statik site üretimi
- ✅ **Çok Dil Desteği**: Türkçe ve İngilizce (TR/EN)
- ✅ **Responsive Tasarım**: Mobile-first yaklaşım
- ✅ **SEO Optimized**: Meta tags, sitemap, structured data
- ✅ **Yüksek Performans**: Lighthouse skorları ≥95 hedefi
- ✅ **Roboto Font**: Google Fonts yerine self-hosted
- ✅ **TailwindCSS**: Utility-first CSS framework
- ✅ **TypeScript**: Tip güvenliği
- ✅ **Content Collections**: Yapılandırılmış içerik yönetimi
- ✅ **Netlify Forms**: Form entegrasyonu
- ✅ **Netlify Deploy**: Otomatik deployment

## 📁 Proje Yapısı

```
src/
├── components/          # UI bileşenleri
│   ├── Header.astro
│   ├── Footer.astro
│   ├── HeroCard.astro
│   ├── MetricItem.astro
│   ├── PartnersMarquee.astro
│   ├── FairSupport.astro
│   ├── InstaGrid.astro
│   ├── NewsletterForm.astro
│   └── LangSwitch.astro
├── layouts/            # Sayfa şablonları
│   └── BaseLayout.astro
├── pages/              # Sayfa rotaları
│   ├── index.astro     # Ana sayfa (redirect)
│   ├── tr/index.astro  # Türkçe ana sayfa
│   ├── en/index.astro  # İngilizce ana sayfa
│   └── api/
│       └── newsletter.ts
├── content/            # İçerik dosyaları
│   ├── config.ts       # Content schema
│   ├── home/
│   │   ├── tr.json
│   │   └── en.json
│   └── partners/
│       └── partners.json
├── lib/                # Yardımcı fonksiyonlar
│   ├── i18n.ts         # Çok dil desteği
│   ├── seo.ts          # SEO yardımcıları
│   └── constants.ts    # Sabit değerler
└── styles/
    └── global.css      # Global CSS
```

## 🛠️ Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Kurulum Adımları

```bash
# Bağımlılıkları kur
npm install

# Development server'ı başlat
npm run dev

# Production build
npm run build

# Build preview
npm run preview
```

## 🎨 Tasarım Sistemi

### Renk Paleti
- **Ana Kırmızı**: #CE1A28 (Brand color)
- **Koyu Mavi**: #16243D (Text color)
- **Beyaz**: #FFFFFF (Background)
- **Siyah**: #1B1C1B (Footer background)

### Tipografi
- **Font**: Roboto (self-hosted)
- **Ağırlıklar**: 300 (Light), 400 (Regular), 500 (Medium), 700 (Bold)

### Border Radius
- **Small**: 15px
- **Medium**: 20px
- **Large**: 30px

## 🌐 Çok Dil Desteği

Site `/tr/` ve `/en/` rotalarında çalışır:
- Ana sayfa `/` → `/tr/` yönlendirir
- Her sayfa için hreflang tags
- Content Collections ile yapılandırılmış çeviri

## 📝 İçerik Yönetimi

İçerikler `src/content/` klasöründe JSON dosyaları olarak saklanır:

```json
{
  "hero": {
    "title": "Ana başlık",
    "subtitle": "Alt başlık",
    "card": { ... }
  },
  "metrics": [...],
  "about": { ... },
  "partners": [...],
  "fairSupport": { ... }
}
```

## 🚀 Deployment

### Netlify
1. Repository'yi Netlify'a bağla
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Environment variables (gerekirse)

### Netlify Forms
Formlar otomatik olarak Netlify Forms ile çalışır:
- Newsletter formu: `/api/newsletter`
- Form submissions Netlify dashboard'da görünür

## ⚡ Performans

### Hedef Lighthouse Skorları
- **Performance**: ≥95
- **SEO**: ≥100
- **Accessibility**: ≥95
- **Best Practices**: ≥95

### Optimizasyonlar
- Self-hosted fonts (WOFF2)
- Responsive images
- Lazy loading
- Critical CSS inlining
- Minimal JavaScript
- Content preloading

## 🔧 Geliştirme

### Komutlar
```bash
# Linting
npm run lint

# Type checking
npm run type-check

# Build analysis
npm run build && npm run preview
```

### Yeni Sayfa Ekleme
1. `src/pages/tr/` ve `src/pages/en/` altında dosya oluştur
2. `src/lib/constants.ts` içinde navigation'a ekle
3. İçerik varsa `src/content/` altında ekle

### Yeni Bileşen Ekleme
1. `src/components/` altında `.astro` dosyası oluştur
2. Props interface tanımla
3. Responsive tasarım uygula
4. Accessibility kontrolleri yap

## 📋 TODO

- [ ] Gerçek görselleri ekle (`public/images/`)
- [ ] Google Maps entegrasyonu
- [ ] Newsletter servis entegrasyonu
- [ ] Analytics entegrasyonu
- [ ] Performance monitoring
- [ ] E2E testler

## 🤝 Katkıda Bulunma

1. Fork et
2. Feature branch oluştur (`git checkout -b feature/amazing-feature`)
3. Commit et (`git commit -m 'Add amazing feature'`)
4. Push et (`git push origin feature/amazing-feature`)
5. Pull Request oluştur

## 📄 Lisans

Bu proje Türkel Fuarcılık A.Ş. için özel olarak geliştirilmiştir.

---

**Geliştirici**: Astro 4 + TailwindCSS + TypeScript stack ile modern web teknolojileri kullanılarak geliştirilmiştir.