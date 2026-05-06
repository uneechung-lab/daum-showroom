import os
import re

files = [
    'index.html', 'business.html', 'solution.html', 'project.html', 
    'company.html', 'careers.html', 'mutual.html', 'investment.html', 
    'asset.html', 'sales.html', 'clients.html', 'ai-lab.html', 'ax-lab.html'
]

# Pattern to find the footer company name span
# <span style="... font-weight: 700; color: #ffffff; ...">㈜다음정보시스템즈</span>
pattern = re.compile(r'(<span\s+style="[^"]*?)(font-weight:\s*700|font-weight:\s*800|font-weight:\s*bold)([^"]*?color:\s*)(?:#ffffff|white)([^"]*?">)(?:㈜\s*)?(다음정보시스템즈)(</span>)', re.DOTALL)

for filename in files:
    filepath = os.path.join(r'c:\daum_site', filename)
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Standardize the span: font-weight: 400, color: #FFB800, remove ㈜
    def replace_span(match):
        prefix = match.group(1)
        suffix = match.group(3)
        rest = match.group(4)
        name = match.group(5)
        # Update styles
        return f'{prefix}font-weight: 400{suffix}#FFB800{rest}{name}</span>'

    new_content = pattern.sub(replace_span, content)
    
    # Also fix the alignment issue mentioned by user (add margin-left to branding div if missing)
    # The user says "좌측 정렬 맞추고" - often means pulling the logo left or ensuring text is aligned.
    # I'll check for branding divs and ensure they have consistent padding.
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated footer in {filename}")

# Separate check for the branding div alignment
# Looking for <!-- Branding Section --> and the div below it
for filename in files:
    filepath = os.path.join(r'c:\daum_site', filename)
    if not os.path.exists(filepath): continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Try to find the branding div and ensure it has no extra padding or has a slight negative margin to align visually
    # <div style="padding: 0;"> -> <div style="padding: 0; margin-left: -4px;"> (approx for visual alignment)
    new_content = content.replace('<!-- Branding Section -->\n            <div style="padding: 0;">', '<!-- Branding Section -->\n            <div style="padding: 0; margin-left: -4px;">')
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Adjusted alignment in {filename}")
