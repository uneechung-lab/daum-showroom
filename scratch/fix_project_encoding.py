
import os

def fix_encoding(filepath):
    # 윈도우 파워쉘 Out-File -Encoding utf8은 사실 UTF-16이나 BOM이 포함된 UTF-8일 가능성이 높음
    # 먼저 파일을 바이너리로 읽어서 시도
    with open(filepath, 'rb') as f:
        content = f.read()
    
    # 여러 인코딩 시도
    encodings = ['utf-16', 'utf-8-sig', 'cp949', 'utf-8']
    
    success = False
    for enc in encodings:
        try:
            text = content.decode(enc)
            # 한글이 포함되어 있는지 확인 (깨졌다면 특수문자가 많음)
            if '성공 기록' in text or '프로젝트' in text:
                print(f"Successfully decoded with {enc}")
                # 정상적인 UTF-8로 저장
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(text)
                success = True
                break
        except:
            continue
    
    if not success:
        print("Failed to restore encoding with simple attempts. Trying to force save as UTF-8.")
        # 만약 이미 깨진 상태로 저장되었다면... (최악의 경우)
        # 하지만 아까 view_file에서 보인 패턴은 인코딩 오인식 패턴임
        try:
            text = content.decode('utf-8')
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(text)
        except:
            pass

fix_encoding('project.html')
