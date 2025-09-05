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
    
    # 1. Description p tag'ını scrollable container ile sar
    pattern1 = r'(<p class="text-sm text-gray-600 font-medium leading-[^"]*"[^>]*>\s*\{fair\.description\}\s*</p>)'
    replacement1 = r'<div class="description-container max-h-12 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 mt-1">\n                            \1\n                          </div>'
    content = re.sub(pattern1, replacement1, content)
    
    # 2. Scrollable CSS ekle
    css_addition = '''
  /* Scrollable description */
  .description-container {
    max-height: 3rem; /* ~2 satır için */
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #d1d5db transparent;
  }

  .description-container::-webkit-scrollbar {
    width: 4px;
  }

  .description-container::-webkit-scrollbar-track {
    background: transparent;
  }

  .description-container::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 2px;
  }

  .description-container::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
'''
    
    # CSS'i h3 CSS'inden sonra ekle
    pattern2 = r'(\.fair-card h3 \{[^}]*\})'
    replacement2 = r'\1' + css_addition
    content = re.sub(pattern2, replacement2, content, flags=re.MULTILINE | re.DOTALL)
    
    # Dosyayı yaz
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)
    
    print(f"✅ {file_path} updated with scrollable description")

print("🎉 Tüm fuar sayfalarında scrollable description eklendi!")
