import { getCollection } from 'astro:content';

// Sector translation cache
let sectorTranslationsCache: Record<string, string> | null = null;

/**
 * Get sector translations from CMS
 * Returns a mapping of Turkish sector names to English sector names
 */
export async function getSectorTranslations(): Promise<Record<string, string>> {
  // Return cached translations if available
  if (sectorTranslationsCache) {
    return sectorTranslationsCache;
  }

  try {
    // Load sectors from CMS
    const sectors = await getCollection('sectors');
    
    // Create translation mapping
    const translations: Record<string, string> = {};
    
    sectors.forEach(sector => {
      if (sector.data.is_active) {
        translations[sector.data.name_tr] = sector.data.name_en;
      }
    });

    // Add fallback translations for legacy sectors not in CMS
    const fallbackTranslations: Record<string, string> = {
      "Moda ve Tekstil": "Fashion & Textile",
      "Ev Tekstili ve Dekorasyon": "Home Textile & Decoration", 
      "Mobilya ve Aydınlatma": "Furniture & Lighting",
      "Mobilya ve Mobilya Yan Sanayi & Elektrik ve Aydınlatma Fuarları": "Furniture & Lighting",
      "Kalıp & Plastik, İhtisas, Havuz": "Mold & Plastic",
      "Deri Fuarları & Güvenlik Sistemleri Fuarları": "Leather & Security Systems",
      "Güzellik ve Kozmetik": "Beauty & Cosmetics",
      "Enerji": "Energy",
      "İnşaat": "Construction",
      "Gıda ve İçecek": "Food & Beverage",
      "Teknoloji": "Technology",
      "Otomotiv": "Automotive",
      "Sağlık": "Healthcare",
      "Spor ve Fitness": "Sports & Fitness",
      "Eğitim": "Education",
      "Turizm": "Tourism",
      "Çevre": "Environment",
      "Diğer": "Other"
    };

    // Merge CMS translations with fallbacks
    const finalTranslations = { ...fallbackTranslations, ...translations };
    
    // Cache the result
    sectorTranslationsCache = finalTranslations;
    
    console.log('🌐 SECTOR TRANSLATIONS: Loaded', Object.keys(finalTranslations).length, 'sector translations');
    
    return finalTranslations;
    
  } catch (error) {
    console.error('🌐 SECTOR TRANSLATIONS ERROR:', error);
    
    // Return fallback translations if CMS fails
    const fallbackTranslations: Record<string, string> = {
      "Moda ve Tekstil": "Fashion & Textile",
      "Ev Tekstili ve Dekorasyon": "Home Textile & Decoration", 
      "Mobilya ve Aydınlatma": "Furniture & Lighting",
      "Mobilya ve Mobilya Yan Sanayi & Elektrik ve Aydınlatma Fuarları": "Furniture & Lighting",
      "Kalıp & Plastik, İhtisas, Havuz": "Mold & Plastic",
      "Deri Fuarları & Güvenlik Sistemleri Fuarları": "Leather & Security Systems",
      "Güzellik ve Kozmetik": "Beauty & Cosmetics",
      "Enerji": "Energy",
      "İnşaat": "Construction",
      "Gıda ve İçecek": "Food & Beverage",
      "Teknoloji": "Technology",
      "Otomotiv": "Automotive",
      "Sağlık": "Healthcare",
      "Spor ve Fitness": "Sports & Fitness",
      "Eğitim": "Education",
      "Turizm": "Tourism",
      "Çevre": "Environment",
      "Diğer": "Other"
    };
    
    sectorTranslationsCache = fallbackTranslations;
    return fallbackTranslations;
  }
}

/**
 * Translate a single sector name from Turkish to English
 */
export async function translateSector(sectorTR: string): Promise<string> {
  const translations = await getSectorTranslations();
  return translations[sectorTR] || sectorTR;
}

/**
 * Clear the sector translations cache (useful for development)
 */
export function clearSectorTranslationsCache(): void {
  sectorTranslationsCache = null;
}
