import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
      <circle cx="200" cy="150" r="75" fill="none" stroke="${colors[1]}" stroke-width="2" stroke-dasharray="10,5">
        <animateTransform attributeName="transform" type="rotate" from="0 200 150" to="360 200 150" dur="15s" repeatCount="indefinite" />
      </circle>
      <path d="M150,150 L250,150 M200,100 L200,200" stroke="${colors[1]}" stroke-width="3" stroke-linecap="round" />
      <circle cx="200" cy="150" r="40" fill="${colors[1]}" opacity="0.1" />
    </svg>`;
  } else if (step === 2) {
    content = `<svg viewBox="0 0 400 300" style="width:100%; height:190px;">
      <rect x="120" y="100" width="160" height="100" rx="10" fill="none" stroke="${colors[2]}" stroke-width="2" />
      <path d="M140,135 L260,135 M140,150 L260,150 M140,165 L260,165" stroke="${colors[2]}" stroke-width="2" opacity="0.4" />
      <circle cx="200" cy="150" r="30" fill="${colors[2]}" opacity="0.6">
        <animate attributeName="r" values="30;35;30" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </svg>`;
  } else {
    content = `<svg viewBox="0 0 400 300" style="width:100%; height:190px;">
      <path d="M110,200 L200,90 L290,200 Z" fill="none" stroke="${colors[3]}" stroke-width="2" />
      <circle cx="200" cy="148" r="45" fill="none" stroke="${colors[3]}" stroke-width="2">
        <animate attributeName="stroke-dasharray" values="0,283;283,0" dur="2s" repeatCount="indefinite" />
      </circle>
      <path d="M185,153 L195,163 L220,138" stroke="${colors[3]}" stroke-width="4" fill="none" stroke-linecap="round" />
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
  }

  // Robust Header Scroll Effect
  const header = document.querySelector('header');
  const scrollHint = document.querySelector('.scroll-hint');
  const footerSection = document.getElementById('footer');

  const handleScroll = () => {
    const scrollPos = window.scrollY || document.documentElement.scrollTop;

    if (scrollPos > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
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

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navRight.classList.toggle('active');
      document.body.style.overflow = navRight.classList.contains('active') ? 'hidden' : 'auto';
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      navRight.classList.remove('active');
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

    if (header) header.classList.add('menu-open');

    // Update active nav-item color
    document.querySelectorAll('.nav-item.active').forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    // Set sub-menu left alignment
    const itemRect = item.getBoundingClientRect();
    document.documentElement.style.setProperty('--item-offset', `${itemRect.left}px`);

    if (activeMenu && activeMenu !== newMenu) {
      // Layer already open — swap instantly without animation
      activeMenu.classList.add('instant');
      newMenu.classList.add('instant');
      activeMenu.classList.remove('active');
      newMenu.classList.add('active');
      // Re-enable transitions next frame
      requestAnimationFrame(() => {
        activeMenu && activeMenu.classList.remove('instant');
        newMenu.classList.remove('instant');
      });
    } else if (!activeMenu) {
      // Layer was closed — animate in
      newMenu.classList.add('active');
    }

    activeMenu = newMenu;
  }

  function hideAll() {
    document.querySelectorAll('.gnb-mega-menu.active').forEach(m => m.classList.remove('active'));
    document.querySelectorAll('.nav-item.active').forEach(i => i.classList.remove('active'));
    activeMenu = null;
    if (header) header.classList.remove('menu-open');
  }

  function scheduleHide() {
    closeTimer = setTimeout(hideAll, 80);
  }

  // Show on nav-item hover — close is handled at header/panel level, not per-item
  navItems.forEach(item => {
    item.addEventListener('mouseenter', () => showMenu(item));
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
});

if (document.readyState === 'complete') {
  if (typeof WaveRenderer !== 'undefined') new WaveRenderer();
  if (typeof updateDiagram === 'function') updateDiagram(1);
}
