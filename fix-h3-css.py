#!/usr/bin/env python3
import os
import re

# Tüm fuar sayfalarını bul
all_files = [
    'src/pages/tr/2022-fuar-takvimi.astro',
    'src/pages/tr/2023-fuar-takvimi.astro', 
    'src/pages/tr/2024-fuar-takvimi.astro',
    'src/pages/tr/2025-fuar-takvimi.astro',
    # 2026 zaten güncellendi
    'src/pages/tr/2029-fuar-takvimi.astro',
    'src/pages/tr/2052-fuar-takvimi.astro',
    'src/pages/en/2022-fair-calendar.astro',
    'src/pages/en/2023-fair-calendar.astro', 
    'src/pages/en/2024-fair-calendar.astro',
    'src/pages/en/2025-fair-calendar.astro',
    'src/pages/en/2026-fair-calendar.astro',
    'src/pages/en/2029-fair-calendar.astro',
    'src/pages/en/2052-fair-calendar.astro'
]

for file_path in all_files:
    if not os.path.exists(file_path):
        print(f"⚠️ File not found: {file_path}")
        continue
        
    print(f"🔧 Processing: {file_path}")
    
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Desktop CSS düzenle
    pattern1 = r'(\.fair-card h3 \{\s*font-size: )[^;]*(!important;\s*line-height: )[^;]*(!important;)'
    replacement1 = r'\g<1>1rem\g<2>1.2\g<3>'
    content = re.sub(pattern1, replacement1, content)
    
    # Mobile CSS düzenle  
    pattern2 = r'(Mobile content adjustments[^}]*\.fair-card h3 \{\s*font-size: 1rem !important;\s*line-height: )[^;]*(!important;)'
    replacement2 = r'\g<1>1.2\g<2>'
    content = re.sub(pattern2, replacement2, content, flags=re.MULTILINE | re.DOTALL)
    
    # Dosyayı yaz
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)
    
    print(f"✅ {file_path} updated with h3 CSS: 1rem + 1.2 line-height")

print("🎉 Tüm fuar sayfalarında h3 CSS güncellendi!")
