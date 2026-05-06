import os
import re

files = [f for f in os.listdir('.') if f.endswith('.html')]

for filename in files:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace header logos
    new_content = content.replace('ci_01.png', 'ci_04.png')
    new_content = new_content.replace('ci_02.png', 'ci_03.png')
    
    # Replace footer text logo if present
    # Target: <span style="font-size: 2.2rem; font-weight: 800; color: #FFB800; letter-spacing: -1px; line-height: 1;">DAUMIS</span>
    # And variants (some might use var(--daumis-yellow))
    
    footer_pattern = re.compile(r'<div style="margin-bottom: 0\.5rem; display: flex; align-items: center;( gap: 12px;)?">\s*<span style="font-size: 2\.2rem; font-weight: 800; color: (?:#FFB800|var\(--daumis-yellow\)); letter-spacing: -1px; line-height: 1;">DAUMIS</span>\s*<span style="font-size: 1\.2rem; font-weight: 700; color: (?:#FFB800|var\(--daumis-yellow\));(?: margin-left: 12px;)?">(?:㈜)?다음정보시스템즈</span>\s*</div>', re.DOTALL)
    
    replacement = '''<div style="margin-bottom: 1.2rem; display: flex; align-items: center; gap: 12px;">
                <img src="/ci_04.png" alt="DAUMIS" style="height: 48px; width: auto;">
                <span style="font-size: 1.2rem; font-weight: 700; color: #ffffff; opacity: 0.9;">다음정보시스템즈</span>
              </div>'''
    
    new_content = footer_pattern.sub(replacement, new_content)
    
    if new_content != content:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filename}")
