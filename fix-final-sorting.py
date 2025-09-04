#!/usr/bin/env python3
import os
import re

# Tüm fuar takvimi sayfalarını bul
tr_files = [
    'src/pages/tr/2022-fuar-takvimi.astro',
    'src/pages/tr/2023-fuar-takvimi.astro', 
    'src/pages/tr/2024-fuar-takvimi.astro',
    'src/pages/tr/2025-fuar-takvimi.astro',
    # 2026 zaten güncellendi
    'src/pages/tr/2029-fuar-takvimi.astro',
    'src/pages/tr/2052-fuar-takvimi.astro'
]

en_files = [
    'src/pages/en/2022-fair-calendar.astro',
    'src/pages/en/2023-fair-calendar.astro', 
    'src/pages/en/2024-fair-calendar.astro',
    'src/pages/en/2025-fair-calendar.astro',
    'src/pages/en/2026-fair-calendar.astro',
    'src/pages/en/2029-fair-calendar.astro',
    'src/pages/en/2052-fair-calendar.astro'
]

def update_file(file_path, is_turkish=True):
    if not os.path.exists(file_path):
        print(f"⚠️ File not found: {file_path}")
        return False
        
    print(f"🔧 Processing: {file_path}")
    
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # h3 başlık satır aralığını düzenle
    pattern1 = r'<h3 class="text-xl font-bold text-gray-900[^"]*"([^>]*)>\s*\{fair\.name\}\s*</h3>'
    replacement1 = r'<h3 class="text-lg font-bold text-gray-900 mb-1 leading-none"\1 style="line-height: 1.1;">{fair.name}</h3>'
    content = re.sub(pattern1, replacement1, content)
    
    # Tarih sıralama mantığını güncelle
    if is_turkish:
        hide_text = "Tarih yakında açıklanacak"
    else:
        hide_text = "Date will be announced soon"
    
    # Eski hide_dates mantığını bul ve değiştir
    old_logic = r'(// Hide_dates items always go to bottom\s*\n\s*(?:console\.log[^;]*;\s*\n\s*)?if \(a\.hide_dates && !b\.hide_dates\) return 1;\s*\n\s*if \(!a\.hide_dates && b\.hide_dates\) return -1;\s*\n\s*if \(a\.hide_dates && b\.hide_dates\) return 0;[^\n]*)'
    
    new_logic = f'''// Hide_dates items always go to bottom
            const aHidden = a.hide_dates === true || (a.date && a.date.includes('{hide_text}'));
            const bHidden = b.hide_dates === true || (b.date && b.date.includes('{hide_text}'));
            console.log(`📅 Checking hide_dates: ${{a.name}} = ${{aHidden}} (field: ${{a.hide_dates}}, text: ${{a.date}}), ${{b.name}} = ${{bHidden}} (field: ${{b.hide_dates}}, text: ${{b.date}})`);
            
            if (aHidden && !bHidden) return 1;  // a hidden, b normal -> a goes down
            if (!aHidden && bHidden) return -1; // a normal, b hidden -> a goes up
            if (aHidden && bHidden) return 0;   // Both hidden, keep original order'''
    
    content = re.sub(old_logic, new_logic, content, flags=re.MULTILINE | re.DOTALL)
    
    # Dosyayı yaz
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)
    
    print(f"✅ {file_path} updated with proper hide_dates sorting and title spacing")
    return True

# TR dosyalarını güncelle (2026 hariç)
print("🇹🇷 Updating Turkish calendar pages...")
for file_path in tr_files:
    update_file(file_path, is_turkish=True)

# EN dosyalarını güncelle
print("\n🇬🇧 Updating English calendar pages...")
for file_path in en_files:
    update_file(file_path, is_turkish=False)

print("\n🎉 Tüm fuar takvimi sayfaları güncellendi!")
