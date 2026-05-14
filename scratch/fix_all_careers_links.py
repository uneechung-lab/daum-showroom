import os
import re

def fix_links():
    root_dir = 'c:\\daum_site'
    html_files = [f for f in os.listdir(root_dir) if f.endswith('.html')]
    
    replacements = {
        r'/careers\.html#jobs': '/careers-jobs.html',
        r'/careers\.html#process': '/careers-process.html',
        r'/careers\.html#welfare': '/careers-welfare.html',
        r'/careers\.html#announcement': '/careers-announcement.html',
        r'href="/careers\.html"': 'href="/careers-jobs.html"',
        r'href="careers\.html"': 'href="/careers-jobs.html"'
    }
    
    for filename in html_files:
        file_path = os.path.join(root_dir, filename)
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = content
        changed = False
        for old, new in replacements.items():
            if re.search(old, new_content):
                new_content = re.sub(old, new, new_content)
                changed = True
        
        if changed:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")

if __name__ == "__main__":
    fix_links()
