import os

def fix_file(filepath):
    try:
        # Try reading with utf-8-sig (handles BOM) or utf-8
        try:
            with open(filepath, 'r', encoding='utf-8-sig') as f:
                content = f.read()
        except UnicodeDecodeError:
            with open(filepath, 'r', encoding='cp949') as f: # Try Korean encoding if utf-8 fails
                content = f.read()
        
        # Remove <br> between spans in cta-text
        import re
        pattern = re.compile(r'(<span>.*?</span>)\s*<br>\s*(\r?\n\s*<span>)', re.DOTALL)
        new_content = pattern.sub(r'\1\2', content)
        
        # Write back as UTF-8 without BOM
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {filepath}")
    except Exception as e:
        print(f"Error fixing {filepath}: {e}")

directory = '.'
for filename in os.listdir(directory):
    if filename.endswith('.html'):
        fix_file(os.path.join(directory, filename))
