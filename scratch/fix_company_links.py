import os
import re

# Define the mapping
mapping = {
    r'/company\.html#intro': '/overview.html',
    r'/company\.html#ceo': '/ceo.html',
    r'/company\.html#vision': '/vision.html',
    r'/company\.html#history': '/history.html',
    r'/company\.html#contact': '/contact.html',
    r'/company\.html#overview': '/overview.html'
}

# Fix labels if necessary (e.g., "소개" -> "기업 개요")
# But usually we just care about the href

target_dir = r'c:\daum_site'

for filename in os.listdir(target_dir):
    if filename.endswith('.html'):
        filepath = os.path.join(target_dir, filename)
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        new_content = content
        for pattern, replacement in mapping.items():
            new_content = re.sub(pattern, replacement, new_content)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
