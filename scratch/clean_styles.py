import re

with open(r'c:\daum_site\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace inline styles with class="card-desc" where applicable, or just strip the specific inline styles.
# Example: style="font-size: 1.1rem; color: #cbd5e1; line-height: 1.4; word-break: keep-all;"
# It's better to just remove font-size and color from the style string.

# Remove `font-size: 1.1rem; color: #cbd5e1;`
content = re.sub(r'font-size:\s*1\.[01]5?rem;\s*color:\s*#cbd5e1;\s*', '', content)
content = re.sub(r'color:\s*#cbd5e1;\s*', '', content)

with open(r'c:\daum_site\index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Cleaned up inline styles.")
