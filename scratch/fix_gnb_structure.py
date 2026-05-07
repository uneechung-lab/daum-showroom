import os
import re

target_dir = r'c:\daum_site'

# Correct GNB block for Company section
correct_gnb_block = """              <li class="nav-item">
                <span>회사소개</span>
                <div class="gnb-mega-menu">
                  <div class="mega-container">
                    <div class="mega-left">
                      <h3>회사소개</h3>
                      <p>신뢰와 완벽함을 추구하는 다음정보시스템즈의 비전과 철학입니다.</p>
                    </div>
                    <div class="mega-right">
                      <ul>
                        <li><a href="/ceo.html">CEO 인사말</a></li>
                        <li><a href="/overview.html">기업 개요</a></li>
                        <li><a href="/vision.html">비전</a></li>
                        <li><a href="/history.html">연혁</a></li>
                        <li><a href="/contact.html">오시는 길</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>"""

# Pattern to find the Company nav item (trying to match broadly)
company_pattern = re.compile(r'<li class="nav-item">\s*<span>회사소개</span>.*?</li>', re.DOTALL)

for filename in os.listdir(target_dir):
    if filename.endswith('.html'):
        filepath = os.path.join(target_dir, filename)
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        # Check if it has the broken structure (li directly in div)
        if '<div class="mega-right">\n                        <li><a href="/overview.html">' in content or \
           '<div class="mega-right">\n                        <li><a href="/ceo.html">' in content:
            
            # Replace the whole company nav item block
            new_content = company_pattern.sub(correct_gnb_block, content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Fixed GNB in {filename}")
            else:
                # Fallback: specific replacement for the broken inner part
                inner_pattern = re.compile(r'<div class="mega-right">\s*(<li>.*?</li>\s*)+</div>', re.DOTALL)
                def fix_inner(match):
                    items = match.group(0).replace('<div class="mega-right">', '').replace('</div>', '').strip()
                    return f'<div class="mega-right">\n                      <ul>\n                        {items}\n                      </ul>\n                    </div>'
                
                new_content = inner_pattern.sub(fix_inner, content)
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Fixed inner GNB in {filename}")
