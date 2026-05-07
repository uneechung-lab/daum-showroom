import os
import re

# Define the old GNB block pattern and the new one
# We need to be careful with indentation and exact tags

old_pattern = re.compile(r'<ul>\s*<li><a href="/company\.html#intro">소개</a></li>\s*<li><a href="/company\.html#ceo">CEO</a></li>\s*<li><a href="/company\.html#vision">비전</a></li>\s*<li><a href="/company\.html#history">연혁</a></li>\s*<li><a href="/company\.html#contact">Contact</a></li>\s*</ul>', re.DOTALL)

new_block = """<ul>
                        <li><a href="/overview.html">기업 개요</a></li>
                        <li><a href="/ceo.html">CEO 인사말</a></li>
                        <li><a href="/vision.html">비전</a></li>
                        <li><a href="/history.html">연혁</a></li>
                        <li><a href="/contact.html">오시는 길</a></li>
                      </ul>"""

# Also handle the broken case where I removed <ul>
broken_pattern = re.compile(r'<div class="mega-right">\s*<li><a href="/overview\.html">기업 개요</a></li>\s*<li><a href="/ceo\.html">CEO 인사말</a></li>\s*<li><a href="/vision\.html">비전</a></li>\s*<li><a href="/history\.html">연혁</a></li>\s*<li><a href="/contact\.html">오시는 길</a></li>\s*</div>', re.DOTALL)

new_broken_block = """<div class="mega-right">
                      <ul>
                        <li><a href="/overview.html">기업 개요</a></li>
                        <li><a href="/ceo.html">CEO 인사말</a></li>
                        <li><a href="/vision.html">비전</a></li>
                        <li><a href="/history.html">연혁</a></li>
                        <li><a href="/contact.html">오시는 길</a></li>
                      </ul>
                    </div>"""

target_dir = r'c:\daum_site'

for filename in os.listdir(target_dir):
    if filename.endswith('.html'):
        filepath = os.path.join(target_dir, filename)
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        new_content = content
        
        # Try fixing the broken one first
        new_content = broken_pattern.sub(new_broken_block, new_content)
        
        # Try fixing the old one if still present
        new_content = old_pattern.sub(new_block, new_content)
        
        # Handle cases with slightly different spacing or labels
        # (e.g. some might have "CEO 인사말" already or different attributes)
        # To be safe, let's also do a broader search/replace for the hrefs individually
        
        href_map = {
            'company.html#intro': 'overview.html',
            'company.html#ceo': 'ceo.html',
            'company.html#vision': 'vision.html',
            'company.html#history': 'history.html',
            'company.html#contact': 'contact.html',
            'company.html#overview': 'overview.html'
        }
        
        for old_href, new_href in href_map.items():
            new_content = new_content.replace(f'href="/{old_href}"', f'href="/{new_href}"')
            new_content = new_content.replace(f'href="./{old_href}"', f'href="/{new_href}"')
            new_content = new_content.replace(f'href="{old_href}"', f'href="/{new_href}"')

        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
