from PIL import Image
import os

images = ["public/profile_01.png", "public/profile_02.png"]
for img_path in images:
    if os.path.exists(img_path):
        with Image.open(img_path) as img:
            print(f"{img_path}: {img.size}")
    else:
        print(f"{img_path}: Not found")
