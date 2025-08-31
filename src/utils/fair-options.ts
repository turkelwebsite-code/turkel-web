import { getCollection } from 'astro:content';

export async function getFairOptions(locale: 'tr' | 'en') {
  try {
    console.log('🎪 FORM: Loading CMS fairs for forms...');
    
    const fairYearData = await getCollection('fair-years');
    const allFairs: Array<{ value: string; label: string }> = [];
    
    fairYearData.forEach((yearData: any) => {
      const fairs = yearData.data?.fairs || [];
      fairs.forEach((fair: any) => {
        if (fair.settings?.show_in_forms) {
          const fairName = locale === 'tr' 
            ? (fair.basic_info?.name_tr || '') 
            : (fair.basic_info?.name_en || fair.basic_info?.name_tr || '');
          
          if (fairName) {
            allFairs.push({
              value: fairName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
              label: fairName
            });
          }
        }
      });
    });
    
    console.log(`🎪 FORM: ${allFairs.length} fairs loaded for forms (${locale})`);
    return allFairs;
  } catch (error) {
    console.error('❌ FORM: Failed to load CMS fairs, using fallback:', error);
    
    // Fallback static options
    return [
      { value: 'homedeco-kazakhstan', label: locale === 'tr' ? 'Homedeco Kazakistan' : 'Homedeco Kazakhstan' },
      { value: 'leshow-moscow', label: locale === 'tr' ? 'Leshow Moskova' : 'Leshow Moscow' },
      { value: 'leshow-istanbul', label: locale === 'tr' ? 'Leshow İstanbul' : 'Leshow Istanbul' },
    ];
  }
}
