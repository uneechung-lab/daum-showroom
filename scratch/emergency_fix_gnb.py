import os
import re

target_dir = r'c:\daum_site'

# The exact GNB content we want for EVERY page to ensure consistency
standard_gnb = """            <ul class="nav-links">
              <li class="nav-item">
                <span>비지니스</span>
                <div class="gnb-mega-menu">
                  <div class="mega-container">
                    <div class="mega-left">
                      <h3>비즈니스</h3>
                      <p>대한민국 1금융권이 선택한 핵심 솔루션을 통해 차세대 금융 인프라를 구축합니다.</p>
                    </div>
                    <div class="mega-right">
                      <ul>
                        <li><a href="/business.html">퇴직연금시스템</a></li>
                        <li><a href="/investment.html">집합투자증권</a></li>
                        <li><a href="/mutual.html">공제업무시스템</a></li>
                        <li><a href="/sales.html">영업지원시스템</a></li>
                        <li><a href="/asset.html">자산관리시스템</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="nav-item">
                <span>프로젝트</span>
                <div class="gnb-mega-menu">
                  <div class="mega-container">
                    <div class="mega-left">
                      <h3>프로젝트</h3>
                      <p>숫자로 증명하는 다음정보시스템즈의 압도적인 금융 프로젝트 성과입니다.</p>
                    </div>
                    <div class="mega-right">
                      <ul>
                        <li><a href="/project.html">프로젝트 실적</a></li>
                        <li><a href="/clients.html">고객사 & 파트너십</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="nav-item">
                <span>NEXT 랩</span>
                <div class="gnb-mega-menu">
                  <div class="mega-container">
                    <div class="mega-left">
                      <h3>NEXT 랩</h3>
                      <p>명쾌한 아키텍처와 분산 처리 엔진으로 복잡한 금융 로직을 안정적으로 처리합니다.</p>
                    </div>
                    <div class="mega-right">
                      <ul>
                        <li><a href="/ai-lab.html">AI 리서치 랩</a></li>
                        <li><a href="/ax-lab.html">AX 이노베이션 랩</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="nav-item">
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
              </li>
              <li class="nav-item">
                <span>인재채용</span>
                <div class="gnb-mega-menu">
                  <div class="mega-container">
                    <div class="mega-left">
                      <h3>인재채용</h3>
                      <p>금융 기술의 미래를 함께 만들어갈 전문가를 기다립니다.</p>
                    </div>
                    <div class="mega-right">
                      <ul>
                        <li><a href="/careers.html#jobs">직무소개</a></li>
                        <li><a href="/careers.html#process">채용절차</a></li>
                        <li><a href="/careers.html#welfare">복지제도</a></li>
                        <li><a href="/careers.html#announcement">채용공고</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </ul>"""

# Regex to find the nav-links block
nav_links_pattern = re.compile(r'<ul class="nav-links">.*?</ul>', re.DOTALL)

for filename in os.listdir(target_dir):
    if filename.endswith('.html'):
        filepath = os.path.join(target_dir, filename)
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        # Replace the broken nav-links with the standard one
        new_content = nav_links_pattern.sub(standard_gnb, content)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Fixed GNB in {filename}")
