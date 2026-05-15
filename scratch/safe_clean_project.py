
import os

def clean_project_html(filepath):
    # UTF-8로 안전하게 읽기
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Finance 태그 제거
    new_content = content.replace('<span class="tag">Finance</span>', '')
    
    # 2. 다른 태그들을 대문자로 변경 (태그 내부 텍스트만)
    replacements = {
        'Pension': 'PENSION',
        'Investment': 'INVESTMENT',
        'Mutual': 'MUTUAL',
        'Consulting': 'CONSULTING',
        'Maintenance': 'MAINTENANCE'
    }
    
    for old, new in replacements.items():
        # HTML 태그 구조 내에서만 바꾸기 위해 더 안전한 패턴 사용 가능하지만,
        # 현재는 간단한 replace로도 충분할 것으로 보임 (원본 구조 확인됨)
        new_content = new_content.replace(f'>{old}</span>', f'>{new}</span>')
    
    # UTF-8로 안전하게 저장
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully cleaned project.html with safe encoding.")

clean_project_html('project.html')
