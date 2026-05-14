import os

def fix_encoding():
    root_dir = 'c:\\daum_site'
    html_files = [f for f in os.listdir(root_dir) if f.endswith('.html')]
    
    for filename in html_files:
        file_path = os.path.join(root_dir, filename)
        
        # Try reading as UTF-16, UTF-8 with BOM, and fallback to others
        content = None
        for enc in ['utf-16', 'utf-8-sig', 'utf-8', 'cp949']:
            try:
                with open(file_path, 'r', encoding=enc) as f:
                    content = f.read()
                print(f"Read {filename} with {enc}")
                break
            except Exception:
                continue
        
        if content:
            # Write back as clean UTF-8
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Fixed encoding for {filename}")
        else:
            print(f"Failed to read {filename}")

if __name__ == "__main__":
    fix_encoding()
