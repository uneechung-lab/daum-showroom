import os
import re

files_to_update = [
    'index.html', 'overview.html', 'ceo.html', 'vision.html', 'history.html', 
    'contact.html', 'ai-lab.html', 'ax-lab.html', 'business.html', 
    'investment.html', 'mutual.html', 'sales.html', 'asset.html', 
    'project.html', 'clients.html', 'careers.html'
]

mapping = {
    r'/careers\.html#jobs': '/careers-jobs.html',
    r'/careers\.html#process': '/careers-process.html',
    r'/careers\.html#welfare': '/careers-welfare.html',
    r'/careers\.html#announcement': '/careers-announcement.html'
}

# Also handle the case where it was just /careers.html
mapping[r'href="/careers\.html"'] = 'href="/careers-jobs.html"'

for filename in files_to_update:
    if not os.path.exists(filename):
        continue
        
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for old_pattern, new_url in mapping.items():
        new_content = re.sub(old_pattern, new_url, new_content)
    
    if new_content != content:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filename}")
