#!/usr/bin/env python3
import os
import re

# 2025.yml dosyasını oku
file_path = 'src/content/fair-years/2025.yml'

with open(file_path, 'r', encoding='utf-8') as file:
    content = file.read()

# Tüm basic_info blokları bul ve hide_dates ekle
pattern = r'(basic_info:\s*\n(?:[^\n]*\n)*?)(\s*)(visuals:)'
    
def add_hide_dates(match):
    basic_info = match.group(1)
    spacing = match.group(2)
    visuals = match.group(3)
    
    # Eğer hide_dates yoksa ekle
    if 'hide_dates:' not in basic_info:
        # Son satırdaki indentation'ı al
        lines = basic_info.strip().split('\n')
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

print("✅ 2025.yml dosyasına hide_dates: false eklendi")
