from PIL import Image
import os

files = [r'c:\daum_site\public\ci_03.png', r'c:\daum_site\public\ci_04.png']
for f in files:
    if os.path.exists(f):
        with Image.open(f) as img:
            print(f"{f}: {img.size}")
    else:
        print(f"{f} not found")
