#!/usr/bin/env python3
import os
import re

# Tüm YAML dosyalarını bul
yaml_files = [
    'src/content/fair-years/2022.yml',
    'src/content/fair-years/2023.yml', 
    'src/content/fair-years/2024.yml',
    'src/content/fair-years/2026.yml',
    'src/content/fair-years/2028.yml',
    'src/content/fair-years/2029.yml'
]

for file_path in yaml_files:
    if not os.path.exists(file_path):
        print(f"⚠️ File not found: {file_path}")
        continue
        
    print(f"🔧 Processing: {file_path}")
    
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Eğer hide_dates zaten varsa skip et
    if 'hide_dates:' in content:
        print(f"✅ {file_path} already has hide_dates")
        continue
    
    # basic_info bloklarında hide_dates ekle
    # Pattern: basic_info'dan sonra gelen field'ları bul
    pattern = r'(basic_info:\s*\n(?:[ ]*[^:\s]+:[^\n]*\n)*)([ ]*)(visuals:)'
    
    def add_hide_dates(match):
        basic_info = match.group(1)
        spacing = match.group(2)
        visuals = match.group(3)
        
        # Son field'ın indentation'ını al
        lines = basic_info.strip().split('\n')
        if len(lines) > 1:
            last_line = lines[-1]
            indent = len(last_line) - len(last_line.lstrip())
            hide_dates_line = ' ' * indent + 'hide_dates: false'
            basic_info = basic_info.rstrip() + '\n' + hide_dates_line + '\n'
        
        return basic_info + spacing + visuals
    
    # Replace işlemi
    new_content = re.sub(pattern, add_hide_dates, content, flags=re.MULTILINE)
    
    # Dosyayı yaz
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(new_content)
    
    print(f"✅ {file_path} updated with hide_dates: false")

print("🎉 Tüm YAML dosyaları güncellendi!")
