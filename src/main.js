import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Global Custom Alert & Confirm Overrides ---
window.showCustomAlert = function(message) {
  const existing = document.getElementById('customAlertModal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'customAlertModal';
  modal.style.position = 'fixed';
  modal.style.inset = '0';
  modal.style.background = 'rgba(15, 23, 42, 0.4)';
  modal.style.backdropFilter = 'blur(8px)';
  modal.style.webkitBackdropFilter = 'blur(8px)';
  modal.style.zIndex = '99999';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.opacity = '0';
  modal.style.transition = 'opacity 0.2s ease';

  const isError = message.includes('실패') || message.includes('오류') || message.includes('에러');
  const iconName = isError ? 'alert-triangle' : 'check-circle-2';
  const iconColor = isError ? '#ef4444' : '#10b981';
  const iconBg = isError ? '#fee2e2' : '#d1fae5';

  modal.innerHTML = `
    <div style="background: #ffffff; border-radius: 20px; width: 90%; max-width: 380px; padding: 2.25rem 1.75rem; box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.2); border: 1px solid #f1f5f9; text-align: center; transform: scale(0.95); transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); display: flex; flex-direction: column; align-items: center; box-sizing: border-box; font-family: 'Pretendard', sans-serif;">
      <div style="display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px; background: ${iconBg}; border-radius: 50%; margin-bottom: 1.25rem;">
        <i data-lucide="${iconName}" style="width: 28px; height: 28px; color: ${iconColor};"></i>
      </div>
      <h3 style="font-size: 1.05rem; font-weight: 700; color: #0f172a; margin: 0 0 1.5rem 0; line-height: 1.6; word-break: keep-all;">
        ${message.replace(/\n/g, '<br>')}
      </h3>
      <button onclick="window.closeCustomAlert()" style="width: 100%; padding: 0.8rem; background: #0f172a; color: #ffffff; border: none; border-radius: 10px; font-size: 0.95rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; font-family: 'Pretendard', sans-serif; outline: none; transition: background 0.2s;">
        확인
      </button>
    </div>
  `;

  document.body.appendChild(modal);

  if (window.lucide) {
    window.lucide.createIcons();
  }

  modal.offsetHeight; // force reflow
  modal.style.opacity = '1';
  modal.querySelector('div').style.transform = 'scale(1)';
};

window.closeCustomAlert = function() {
  const modal = document.getElementById('customAlertModal');
  if (modal) {
    modal.style.opacity = '0';
    modal.querySelector('div').style.transform = 'scale(0.95)';
    setTimeout(() => {
      modal.remove();
    }, 200);
  }
};

window.alert = function(message) {
  window.showCustomAlert(message);
};

// --- Canvas Wave Animation ---
class WaveRenderer {
  constructor() {
    this.canvas = document.getElementById('hero-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.lines = [];
    this.tick = 0;
    
    window.addEventListener('resize', () => this.resize());
    this.resize();
    this.init();
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  init() {
    this.lines = [];
    for (let i = 0; i < 5; i++) {
      this.lines.push({
        y: this.height * (0.35 + Math.random() * 0.45), // Slightly tighter center
        amplitude: 60 + Math.random() * 120,
        frequency: 0.0008 + Math.random() * 0.0015,
        speed: 0.002 + Math.random() * 0.004,
        offset: Math.random() * 500,
        count: 22 + Math.floor(Math.random() * 8)
      });
    }
  }

  animate() {
    this.tick++;
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    this.lines.forEach((group) => {
      for (let i = 0; i < group.count; i++) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 1.0; 
        this.ctx.strokeStyle = `rgba(255, 184, 0, ${0.6 - (i * 0.02)})`; 
        
        const spacing = i * 5;
        
        for (let x = 0; x < this.width; x += 10) {
          // Horizontal flow
          const angle = x * group.frequency + (this.tick * group.speed) + group.offset;
          
          // Added: Vertical movement and shape morphing
          const verticalShift = Math.sin(this.tick * 0.005 + group.offset) * 40;
          const morph = Math.cos(x * 0.002 + this.tick * 0.01) * 20;
          
          const y = group.y + Math.sin(angle) * group.amplitude + verticalShift + morph + spacing;
          
          if (x === 0) {
            this.ctx.moveTo(x, y);
          } else {
            this.ctx.lineTo(x, y);
          }
        }
        this.ctx.stroke();
      }
    });

    requestAnimationFrame(() => this.animate());
  }
}

// --- Solution Flow Diagram ---
const updateDiagram = (step, targetId) => {
  const container = document.getElementById(targetId);
  if (!container) return;
  
  let content = '';
  const colors = {
    1: '#FFB800',
    2: '#38BDF8',
    3: '#818CF8'
  };

  if (step === 1) {
    content = `<svg viewBox="0 0 400 300" style="width:100%; height:190px;">
      <circle cx="200" cy="150" r="75" fill="none" stroke="${colors[1]}" stroke-width="4" stroke-dasharray="10,5">
        <animateTransform attributeName="transform" type="rotate" from="0 200 150" to="360 200 150" dur="15s" repeatCount="indefinite" />
      </circle>
      <path d="M150,150 L250,150 M200,100 L200,200" stroke="${colors[1]}" stroke-width="6" stroke-linecap="round" />
      <circle cx="200" cy="150" r="40" fill="${colors[1]}" opacity="0.1" />
    </svg>`;
  } else if (step === 2) {
    content = `<svg viewBox="0 0 400 300" style="width:100%; height:190px;">
      <rect x="120" y="100" width="160" height="100" rx="10" fill="none" stroke="${colors[2]}" stroke-width="4" />
      <path d="M140,135 L260,135 M140,150 L260,150 M140,165 L260,165" stroke="${colors[2]}" stroke-width="4" opacity="0.4" />
      <circle cx="200" cy="150" r="30" fill="${colors[2]}" opacity="0.6">
        <animate attributeName="r" values="30;35;30" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </svg>`;
  } else {
    content = `<svg viewBox="0 0 400 300" style="width:100%; height:190px;">
      <path d="M110,200 L200,90 L290,200 Z" fill="none" stroke="${colors[3]}" stroke-width="4" />
      <circle cx="200" cy="148" r="45" fill="none" stroke="${colors[3]}" stroke-width="4">
        <animate attributeName="stroke-dasharray" values="0,283;283,0" dur="2s" repeatCount="indefinite" />
      </circle>
      <path d="M185,153 L195,163 L220,138" stroke="${colors[3]}" stroke-width="8" fill="none" stroke-linecap="round" />
    </svg>`;
  }
  
  container.innerHTML = content;
};

// --- Initialization ---
window.addEventListener('load', () => {
  new WaveRenderer();
  
  // Render all 3 diagrams immediately
  updateDiagram(1, 'diagram-1');
  updateDiagram(2, 'diagram-2');
  updateDiagram(3, 'diagram-3');
  
  ScrollTrigger.refresh();

  // ── POST-INTRO REVEAL ANIMATIONS ──────────────────────────────────────────

  function setupSloganStagger(h1) {
    const units = [];
    function processNode(parent) {
      const nodes = Array.from(parent.childNodes);
      parent.innerHTML = '';
      nodes.forEach(node => {
        if (node.nodeType === 3) { // text node
          node.textContent.split(/(\s+)/).forEach(part => {
            if (/^\s+$/.test(part)) {
              parent.appendChild(document.createTextNode(part));
            } else if (part.trim()) {
              const s = document.createElement('span');
              s.textContent = part;
              s.style.cssText = 'display:inline-block;opacity:0;transform:translateY(10px);transition:opacity 0.5s ease,transform 0.5s ease;';
              parent.appendChild(s); units.push(s);
            }
          });
        } else if (node.tagName === 'BR') {
          parent.appendChild(document.createElement('br'));
        } else if (node.tagName === 'SPAN') {
          node.style.cssText += ';display:inline-block;opacity:0;transform:translateY(10px);transition:opacity 0.5s ease,transform 0.5s ease;';
          parent.appendChild(node); units.push(node);
        }
      });
    }
    processNode(h1);
    return units;
  }

  function hideForIntro() {
    // 1. Cover wave with a dark panel that will slide away
    const panel = document.createElement('div');
    panel.id = 'wave-reveal-panel';
    panel.style.cssText = 'position:fixed;inset:0;background:#020617;z-index:-1;transform-origin:right center;transition:transform 1.4s cubic-bezier(0.77,0,0.18,1);pointer-events:none;';
    document.body.appendChild(panel);

    // 2. Hide section-label
    const label = document.querySelector('#business .section-label');
    if (label) {
      label.style.cssText += ';opacity:0;transform:translateY(8px);transition:opacity 0.5s ease,transform 0.5s ease;';
      window._sectionLabel = label;
    }

    // 3. Slogan: split into word spans (all hidden)
    const h1 = document.querySelector('#business .section-title');
    if (h1) window._sloganUnits = setupSloganStagger(h1);

    // 4. Cards: hide
    document.querySelectorAll('#business .bento-card').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.7s ease, transform 0.7s ease, border-color 0.5s ease, box-shadow 0.5s ease';
    });
  }

  window.revealContent = function() {
    // 1. Wave: slide dark panel away right→left
    const panel = document.getElementById('wave-reveal-panel');
    if (panel) {
      setTimeout(() => {
        panel.style.transform = 'scaleX(0)';
        setTimeout(() => panel.remove(), 1500);
      }, 80);
    }

    // 2. section-label + slogan appear together, immediately with wave
    const label = window._sectionLabel;
    if (label) {
      label.style.opacity = '1';
      label.style.transform = 'translateY(0)';
    }

    const units = window._sloganUnits || [];
    units.forEach((span, i) => {
      setTimeout(() => {
        const targetOpacity = span.classList.contains('fade-text') ? '1' : '1';
        span.style.opacity = targetOpacity;
        span.style.transform = 'translateY(0)';
      }, i * 30);  // no initial delay, 30ms stagger per word
    });

    // 3. Cards: float up with gold border flash (after text settles)
    document.querySelectorAll('#business .bento-card').forEach((card, i) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.borderColor = 'rgba(255, 184, 0, 0.75)';
        card.style.boxShadow = '0 0 28px rgba(255, 184, 0, 0.35)';
        setTimeout(() => {
          card.style.borderColor = '';
          card.style.boxShadow = '';
        }, 650);
      }, 450 + i * 130);
    });
  };

  // Apply hidden states only if intro is playing
  if (window._introPlaying) {
    hideForIntro();
  } else {
    // On sub-pages, ensure hero animations trigger if hero-anim class is present
    const detailHero = document.querySelector('.detail-hero');
    if (detailHero) {
      detailHero.classList.add('hero-anim');
    }
  }

  // Robust Header Scroll Effect
  const header = document.querySelector('header');
  const scrollHint = document.querySelector('.scroll-hint');
  const footerSection = document.getElementById('footer');

  const handleScroll = () => {
    const scrollPos = window.scrollY || document.documentElement.scrollTop;
    const header = document.querySelector('header');
    if (!header) return;

    const isSubPage = document.body.classList.contains('sub-page');
    const curtain = document.querySelector('.content-wrapper') || document.querySelector('.tabs-nav');

    if (isSubPage && curtain) {
      const curtainTop = curtain.getBoundingClientRect().top;
      if (curtainTop <= 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    } else {
      let threshold = 10;
      if (scrollPos > threshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Hide scroll hint when footer section is active
    if (scrollHint) {
      const isAtFooter = footerSection && footerSection.getBoundingClientRect().top < window.innerHeight / 2;
      if (isAtFooter) scrollHint.classList.add('hidden');
      else scrollHint.classList.remove('hidden');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Block downward scroll when already on the footer section (last snap point)
  window.addEventListener('wheel', (e) => {
    if (!footerSection) return;
    const rect = footerSection.getBoundingClientRect();
    // Footer is the current snap point when its top is near 0
    if (Math.abs(rect.top) < 80 && e.deltaY > 0) {
      e.preventDefault();
    }
  }, { passive: false });

  // Mobile Menu Logic
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navRight = document.querySelector('.nav-right');
  const navLinks = document.querySelectorAll('.nav-links a, .cta-button');
  
  const headerNav = document.querySelector('#header nav');
  if (headerNav) {
    const homeBtn = document.createElement('a');
    homeBtn.href = '/';
    homeBtn.className = 'mobile-home-btn';
    homeBtn.setAttribute('aria-label', '홈으로');
    homeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
    headerNav.insertBefore(homeBtn, headerNav.firstChild);
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navRight.classList.toggle('active');
      document.body.style.overflow = navRight.classList.contains('active') ? 'hidden' : 'auto';
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileToggle) mobileToggle.classList.remove('active');
      if (navRight) navRight.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });

  // Also check on load
  handleScroll();

  // (Removed Scroll-telling logic for Flow Steps)

  // Scroll Indicator Logic
  const dots = document.querySelectorAll('.dot');
  const sections = document.querySelectorAll('section, footer');

  const updateDots = () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute("id");
      }
    });

    dots.forEach((dot) => {
      dot.classList.remove("active");
      if (dot.dataset.target === current) {
        dot.classList.add("active");
      }
    });
  };

  window.addEventListener('scroll', updateDots);

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetId = dot.dataset.target;
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        const offsetPosition = targetSection.offsetTop;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Stat counters
  document.querySelectorAll('.stat-value').forEach((stat) => {
    const target = parseInt(stat.dataset.target);
    ScrollTrigger.create({
      trigger: stat,
      start: "top 90%",
      onEnter: () => {
        let curr = 0;
        const interval = setInterval(() => {
          curr += Math.ceil(target / 50);
          const suffix = stat.dataset.suffix || "";
          if (curr >= target) {
            stat.innerText = target.toLocaleString() + suffix;
            clearInterval(interval);
          } else {
            stat.innerText = curr.toLocaleString() + suffix;
          }
        }, 30);
      },
      once: true
    });
  });

  // Bento Card Reveal
  document.querySelectorAll('.bento-card').forEach((card, i) => {
    ScrollTrigger.create({
      trigger: card,
      start: "top 95%",
      onEnter: () => {
        setTimeout(() => {
          card.classList.add('revealed');
        }, (i % 3) * 100); 
      },
      once: true
    });
    if (card.getBoundingClientRect().top < window.innerHeight) {
        card.classList.add('revealed');
    }
  });
});

// =============================================
// Card Intro Flip Animation
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('#business .bento-card');
  if (!cards.length) return;

  // Inject yellow overlay + mark cards as pending
  cards.forEach(card => {
    card.classList.add('intro-pending');
    card.style.position = 'relative'; // ensure overlay positions correctly
    const overlay = document.createElement('div');
    overlay.className = 'card-intro-overlay';
    card.appendChild(overlay);
  });

  // Trigger hero text entrance animation
  const heroSection = document.getElementById('business');
  if (heroSection) heroSection.classList.add('hero-anim');

  // Stagger flip each card
  const BASE_DELAY = 0;    // start immediately on page load
  const STEP = 120;        // ms between each card flip — tighter sequence

  cards.forEach((card, i) => {
    const overlay = card.querySelector('.card-intro-overlay');
    const totalDelay = BASE_DELAY + i * STEP;

    setTimeout(() => {
      // Start flip
      overlay.classList.add('flipping');

      // At the midpoint: show card content
      setTimeout(() => {
        card.classList.remove('intro-pending');
        card.classList.add('intro-flip-done');
      }, 240); // ~halfway through 0.5s flip

      // After flip complete: remove overlay entirely
      setTimeout(() => {
        overlay.remove();
        card.classList.remove('intro-flip-done');
      }, 540);

    }, totalDelay);
  });
});

// GNB Mega Menu - JS Controlled
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const navItems = document.querySelectorAll('.nav-item');
  let activeMenu = null;
  let closeTimer = null;

  function restoreCurrentPage() {
    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath === '/index.html') return;
    document.querySelectorAll('.mega-right li a').forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
        const parentNavItem = link.closest('.nav-item');
        if (parentNavItem) parentNavItem.classList.add('active');
      }
    });
  }

  // Measure container text-start edge for pixel-perfect mega-left alignment
  function updateMegaLeftOffset() {
    const container = document.querySelector('header .container');
    if (container) {
      const rect = container.getBoundingClientRect();
      const paddingLeft = parseFloat(getComputedStyle(container).paddingLeft) || 32;
      // This is exactly where the CI text and page content text starts
      document.documentElement.style.setProperty('--mega-left-offset', `${rect.left + paddingLeft}px`);
    }
  }
  updateMegaLeftOffset();
  window.addEventListener('resize', updateMegaLeftOffset);

  function showMenu(item) {
    clearTimeout(closeTimer);
    
    const newMenu = item.querySelector('.gnb-mega-menu');
    if (!newMenu) return;

    if (activeMenu === newMenu) return;

    // If switching while already open, use 'instant' mode to avoid flickering
    if (activeMenu) {
      activeMenu.classList.add('instant');
      activeMenu.classList.remove('active');
      newMenu.classList.add('instant');
      document.querySelectorAll('.nav-item.active').forEach(i => i.classList.remove('active'));
    } else {
      // Opening fresh
      newMenu.classList.remove('instant');
    }

    if (header) header.classList.add('menu-open');
    item.classList.add('active');

    // Set sub-menu left alignment
    const itemRect = item.getBoundingClientRect();
    document.documentElement.style.setProperty('--item-offset', `${itemRect.left}px`);

    newMenu.classList.add('active');
    activeMenu = newMenu;

    // Remove 'instant' after a short delay so normal closing animation works
    setTimeout(() => {
      if (activeMenu) activeMenu.classList.remove('instant');
    }, 50);
  }

  function hideAll() {
    document.querySelectorAll('.gnb-mega-menu').forEach(m => {
      m.classList.remove('active');
      m.classList.remove('instant');
    });
    document.querySelectorAll('.nav-item.active').forEach(i => i.classList.remove('active'));
    activeMenu = null;
    if (header) header.classList.remove('menu-open');
    restoreCurrentPage();
  }

  function scheduleHide() {
    closeTimer = setTimeout(hideAll, 80);
  }

  // Show on nav-item hover — close is handled at header/panel level, not per-item
  navItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) showMenu(item);
    });
    
    // Mobile accordion logic
    const span = item.querySelector('span');
    if (span) {
      span.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          // Close other open menus
          document.querySelectorAll('.nav-item.mobile-open').forEach(openItem => {
            if (openItem !== item) openItem.classList.remove('mobile-open');
          });
          item.classList.toggle('mobile-open');
        }
      });
    }
  });

  // Header boundary: close only when leaving the header entirely (not just between menu items)
  if (header) {
    header.addEventListener('mouseleave', (e) => {
      const to = e.relatedTarget;
      // Stay open if moving into the menu panel
      if (to && to.closest('.gnb-mega-menu')) return;
      scheduleHide();
    });
  }


  // Keep open while inside the menu panel
  document.querySelectorAll('.gnb-mega-menu').forEach(menu => {
    menu.addEventListener('mouseenter', () => clearTimeout(closeTimer));
    menu.addEventListener('mouseleave', (e) => {
      const to = e.relatedTarget;
      // Stay open if moving back into header
      if (to && to.closest('#header')) return;
      scheduleHide();
    });
  });

  restoreCurrentPage();

  // --- Inquiry Drawer Logic ---
  const initInquiryDrawer = () => {
    const drawerHtml = `
      <div class="drawer-overlay" id="inquiryOverlay"></div>
      <div class="inquiry-drawer" id="inquiryDrawer">
        <div class="drawer-header">
          <h2>도입 문의</h2>
          <button class="drawer-close" id="closeInquiry"><i data-lucide="x"></i></button>
        </div>
        <div class="drawer-content">
          <form class="drawer-form" id="drawerForm">
            <div class="form-group">
              <label>성함<span class="required" style="color:#ef4444; margin-left:4px;">*</span></label>
              <input type="text" name="name" placeholder="홍길동" required>
            </div>
            <div class="form-group">
              <label>회사명<span class="required" style="color:#ef4444; margin-left:4px;">*</span></label>
              <input type="text" name="company" placeholder="주식회사 에이아이" required>
            </div>
            <div class="form-group">
              <label>이메일<span class="required" style="color:#ef4444; margin-left:4px;">*</span></label>
              <input type="email" name="email" placeholder="example@company.com" required>
            </div>
            <div class="form-group">
              <label>연락처<span class="required" style="color:#ef4444; margin-left:4px;">*</span></label>
              <input type="tel" name="phone" placeholder="010-0000-0000" required>
            </div>
            <div class="form-group">
              <label>문의 유형<span class="required" style="color:#ef4444; margin-left:4px;">*</span></label>
              <select name="type" required>
                <option value="" disabled selected>선택해주세요</option>
                <option value="퇴직연금시스템 (D-RPS) 도입 문의">퇴직연금시스템 (D-RPS)</option>
                <option value="자산관리시스템 (D-WMS) 도입 문의">자산관리시스템 (D-WMS)</option>
                <option value="집합투자증권시스템 (D-FTS) 도입 문의">집합투자증권시스템 (D-FTS)</option>
                <option value="AI 리서치/AX 이노베이션 기술 실증 제안">AI 리서치/AX 이노베이션</option>
                <option value="기타 도입 문의">기타 문의</option>
              </select>
            </div>
            <div class="form-group">
              <label>문의 내용<span class="required" style="color:#ef4444; margin-left:4px;">*</span></label>
              <textarea name="content" placeholder="궁금하신 내용을 남겨주세요." required></textarea>
            </div>
            <div class="drawer-privacy">
              [개인정보 수집 및 이용 동의]<br>
              1. 수집 항목: 성함, 회사명, 이메일, 연락처<br>
              2. 수집 목적: 문의 사항에 대한 답변 및 안내<br>
              3. 보유 기간: 목적 달성 후 즉시 파기
            </div>
            <label class="drawer-checkbox">
              <input type="checkbox" required>
              <span>개인정보 수집 및 이용에 동의합니다. (필수)</span>
            </label>
            <button type="submit" class="drawer-submit">
              문의하기 <i data-lucide="send"></i>
            </button>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', drawerHtml);
    if (typeof lucide !== 'undefined') lucide.createIcons();

    const drawer = document.getElementById('inquiryDrawer');
    const overlay = document.getElementById('inquiryOverlay');
    const closeBtn = document.getElementById('closeInquiry');
    const form = document.getElementById('drawerForm');

    const openDrawer = (e) => {
      if (e) e.preventDefault();
      drawer.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      drawer.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

    // Intercept CTA buttons
    document.querySelectorAll('a[href="/inquiry.html"], .cta-button').forEach(btn => {
      btn.addEventListener('click', openDrawer);
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('.drawer-submit');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '접수 중... <i data-lucide="loader-2" class="animate-spin" style="width:16px; height:16px; margin-left:4px; display:inline-block; vertical-align:middle;"></i>';
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }

      try {
        const formData = new FormData(form);
        const name = formData.get('name');
        const company = formData.get('company');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const type = formData.get('type');
        const content = formData.get('content');

        // Dynamically load Supabase client if not loaded
        if (!window.supabase) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
          document.head.appendChild(script);
          await new Promise(r => script.onload = r);
        }

        const SUPABASE_URL = 'https://hypyydfzyahscznwltnf.supabase.co';
        const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHl5ZGZ6eWFoc2N6bndsdG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg2OTgsImV4cCI6MjA5NDM0NDY5OH0.fd_vtDVcyCZpBKVEywmvpp7EWhwsAe3QAr0RadFG7D8';
        const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

        const { error } = await supabase
          .from('inquiries')
          .insert({
            name,
            company,
            email,
            phone,
            subject: type,
            content,
            status: '미확인'
          });

        if (error) throw error;

        // 알림 메일 발송 Edge Function 호출 (상무님 이메일 알림)
        try {
          await fetch(`${SUPABASE_URL}/functions/v1/send-inquiry-email`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${SUPABASE_KEY}`
            },
            body: JSON.stringify({
              name,
              company,
              email,
              phone,
              subject: type,
              content
            })
          });
        } catch (emailErr) {
          console.error('이메일 발송 알림 실패:', emailErr);
        }

        alert('문의가 성공적으로 접수되었습니다. 담당자가 곧 연락드리겠습니다.');
        closeDrawer();
        form.reset();
      } catch (err) {
        console.error('Error submitting inquiry:', err);
        alert('문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '문의하기 <i data-lucide="send"></i>';
          if (typeof lucide !== 'undefined') lucide.createIcons();
        }
      }
    });
  };

  initInquiryDrawer();
  ScrollTrigger.refresh();
});

if (document.readyState === 'complete') {
  if (typeof WaveRenderer !== 'undefined') new WaveRenderer();
  if (typeof updateDiagram === 'function') updateDiagram(1);
}
