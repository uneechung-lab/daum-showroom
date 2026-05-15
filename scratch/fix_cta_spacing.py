import os
import re

directory = '.'
pattern = re.compile(r'(<h2 class="cta-text">.*?<span>.*?</span>)<br>(.*?<span>.*?</span>.*?</h2>)', re.DOTALL)

for filename in os.listdir(directory):
    if filename.endswith('.html'):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = pattern.sub(r'\1\2', content)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
