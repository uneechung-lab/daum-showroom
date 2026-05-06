import os
import re

files = [
    'index.html', 'business.html', 'solution.html', 'project.html', 
    'company.html', 'careers.html', 'mutual.html', 'investment.html', 
    'asset.html', 'sales.html', 'clients.html'
]

# Pattern to find the logo link and its images
# <a href="/" class="logo">...</a>
pattern = re.compile(r'(<a\s+href="/"\s+class="logo">.*?)(</a>)', re.DOTALL)

for filename in files:
    filepath = os.path.join(r'c:\daum_site', filename)
    if not os.path.exists(filepath):
        print(f"File not found: {filename}")
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if 'logo-text' in content:
        print(f"Skipping {filename}, already has logo-text")
        continue
        
    def add_text(match):
        inner = match.group(1)
        # Ensure we don't add it if it's already there (redundant check)
        if 'logo-text' in inner:
            return match.group(0)
        return inner + '<span class="logo-text">다음정보시스템즈</span>' + match.group(2)

    new_content = pattern.sub(add_text, content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filename}")
    else:
        print(f"No match found in {filename}")
