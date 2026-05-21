import os
import re

# GA4 Tracking Code
GA_SCRIPT = """    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-9DS4ERFRRQ"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-9DS4ERFRRQ');
    </script>
"""

# HTML files to process in the root directory
html_files = [f for f in os.listdir('.') if f.endswith('.html') and f not in ['index_temp.html', 'original_project.html']]

print(f"Found {len(html_files)} HTML files in root directory.")

for file_name in html_files:
    file_path = file_name
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if GA tag already exists
    if 'G-9DS4ERFRRQ' in content:
        print(f"Skipping {file_name}: GA tag already injected.")
        continue
        
    # Inject right after <head> or <head class="...">
    # Let's search for <head> or similar using regex
    head_match = re.search(r'<head\b[^>]*>', content)
    if head_match:
        insert_index = head_match.end()
        # Add newlines around the script
        new_content = content[:insert_index] + "\n" + GA_SCRIPT + content[insert_index:]
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Successfully injected GA tag into {file_name}")
    else:
        print(f"WARNING: Could not find <head> tag in {file_name}")

print("Injection complete!")
