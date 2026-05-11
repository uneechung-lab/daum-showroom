import os
import re

# Get all html files in the current directory
files = [f for f in os.listdir('.') if f.endswith('.html')]

# Target order of hrefs for the 'Company' (회사소개) menu
target_order = [
    '/overview.html',
    '/ceo.html',
    '/vision.html',
    '/history.html',
    '/contact.html'
]

# Regex pattern to find the '회사소개' (Company) mega-menu list
# It looks for the h3 tag containing '회사소개', then finds the subsequent <ul> block
menu_pattern = re.compile(r'(<h3>회사소개</h3>.*?<div class="mega-right">.*?<ul>)(.*?)(</ul>)', re.DOTALL)

updated_count = 0

for filename in files:
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        # Fallback for other encodings if necessary
        try:
            with open(filename, 'r', encoding='euc-kr') as f:
                content = f.read()
        except:
            print(f"Skipping {filename} due to encoding issues.")
            continue

    def reorder_match(match):
        prefix = match.group(1)
        items_block = match.group(2)
        suffix = match.group(3)
        
        # Extract all <li> items within the <ul> block
        li_items = re.findall(r'<li>.*?</li>', items_block, re.DOTALL)
        
        # Map href to its full <li> block to preserve classes (like 'active')
        li_map = {}
        for li in li_items:
            href_match = re.search(r'href="([^"]+)"', li)
            if href_match:
                href = href_match.group(1)
                li_map[href] = li
        
        # Build the new ordered list of <li> items
        new_li_list = []
        seen_hrefs = set()
        
        # First, add items in the target order
        for target_href in target_order:
            # Check for exact match or relative match (e.g., 'overview.html' vs '/overview.html')
            matched_href = None
            if target_href in li_map:
                matched_href = target_href
            elif target_href.lstrip('/') in li_map:
                matched_href = target_href.lstrip('/')
            elif ('/' + target_href) in li_map:
                matched_href = '/' + target_href
            
            if matched_href:
                new_li_list.append(li_map[matched_href])
                seen_hrefs.add(matched_href)
        
        # Then, add any remaining items that weren't in the target order (if any)
        for href, li in li_map.items():
            if href not in seen_hrefs:
                new_li_list.append(li)
        
        # Join the new items with appropriate indentation
        # We try to guess indentation from the first item
        indent = "                        "
        return prefix + "\n" + indent + ("\n" + indent).join(new_li_list) + "\n                      " + suffix

    new_content = menu_pattern.sub(reorder_match, content)
    
    if new_content != content:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filename}")
        updated_count += 1

print(f"Finished. Total files updated: {updated_count}")
