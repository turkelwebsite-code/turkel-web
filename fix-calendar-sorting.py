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
    
    # 1. hide_dates field'ını fairCard objesine ekle
    pattern1 = r'(startDate: fair\.basic_info\.start_date[^\n]*\n\s*endDate: fair\.basic_info\.end_date[^\n]*\n)(\s*)(image:)'
    replacement1 = r'\1\2hide_dates: hideDates, // For sorting logic\n\2\3'
    content = re.sub(pattern1, replacement1, content)
    
    # 2. data-hide-dates attribute'unu ekle
    pattern2 = r'(data-start-date=\{fair\.startDate\} data-end-date=\{fair\.endDate\})'
    replacement2 = r'\1 data-hide-dates={fair.hide_dates}'
    content = re.sub(pattern2, replacement2, content)
    
    # 3. Tarih sıralama fonksiyonunu güncelle
    if is_turkish:
        pattern3 = r"(case 'date':\s*\n\s*console\.log\('📅 DATE SORTING:[^']*', allCards\.map\([^)]*\)\);\s*\n\s*allCards\.sort\(\([^)]*\) => \{\s*\n)(\s*// Use start_date)"
        replacement3 = r"\1            // Hide_dates items always go to bottom\n            if (a.hide_dates && !b.hide_dates) return 1;\n            if (!a.hide_dates && b.hide_dates) return -1;\n            if (a.hide_dates && b.hide_dates) return 0; // Both hidden, keep original order\n            \n\2"
    else:
        pattern3 = r"(case 'date':\s*\n\s*console\.log\('📅 DATE SORTING[^']*', allCards\.map\([^)]*\)\);\s*\n\s*allCards\.sort\(\([^)]*\) => \{\s*\n)(\s*// Use start_date)"
        replacement3 = r"\1            // Hide_dates items always go to bottom\n            if (a.hide_dates && !b.hide_dates) return 1;\n            if (!a.hide_dates && b.hide_dates) return -1;\n            if (a.hide_dates && b.hide_dates) return 0; // Both hidden, keep original order\n            \n\2"
    
    content = re.sub(pattern3, replacement3, content, flags=re.MULTILINE | re.DOTALL)
    
    # Dosyayı yaz
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)
    
    print(f"✅ {file_path} updated with hide_dates sorting logic")
    return True

# TR dosyalarını güncelle
print("🇹🇷 Updating Turkish calendar pages...")
for file_path in tr_files:
    update_file(file_path, is_turkish=True)

# EN dosyalarını güncelle
print("\n🇬🇧 Updating English calendar pages...")
for file_path in en_files:
    update_file(file_path, is_turkish=False)

print("\n🎉 Tüm fuar takvimi sayfaları güncellendi!")
