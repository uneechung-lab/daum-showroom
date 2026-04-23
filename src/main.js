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

  // Robust Header Scroll Effect
  const header = document.querySelector('header');
  const scrollHint = document.querySelector('.scroll-hint');
  const handleScroll = () => {
    const scrollPos = window.scrollY || document.documentElement.scrollTop;
    const isFooter = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    
    if (scrollPos > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Hide scroll hint only at the very bottom
    if (scrollHint) {
      if (isFooter) scrollHint.classList.add('hidden');
      else scrollHint.classList.remove('hidden');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
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
        // Updated for 100px header height
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
          if (curr >= target) {
            stat.innerText = target.toLocaleString();
            clearInterval(interval);
          } else {
            stat.innerText = curr.toLocaleString();
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
