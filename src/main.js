import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Mark JS as active for styles
document.documentElement.classList.add('js-active');

// 1. Smooth Scrolling with Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Handling Anchor Links with Lenis
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    const target = document.querySelector(id);
    if (target) {
      lenis.scrollTo(target, { offset: -80 });
    }
  });
});

// 2. Header Scroll Effect
const header = document.querySelector('#header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// 3. Section Parallax & Animations
const sections = gsap.utils.toArray('section');

// Section-wise parallax & animations
sections.forEach((section) => {
  // Background Parallax (if applicable)
  const bg = section.querySelector('::before'); // CSS pseudo-elements can't be easily animated in JS, 
  // but we can animate the section label or title as parallax
  
  const title = section.querySelector('.section-title');
  const label = section.querySelector('.section-label');
  
  if (title) {
    gsap.to(title, {
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      },
      y: 50,
      ease: "none"
    });
  }

  if (label) {
    gsap.to(label, {
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      },
      y: -30,
      ease: "none"
    });
  }
});

// 4. Trust Core Counter Animation
const counters = document.querySelectorAll('.stat-value');
counters.forEach(counter => {
  const target = +counter.getAttribute('data-target');
  
  ScrollTrigger.create({
    trigger: counter,
    start: "top 80%",
    onEnter: () => {
      gsap.to(counter, {
        innerText: target,
        duration: 2,
        snap: { innerText: 1 },
        stagger: 0.1,
        ease: "power2.out",
        onUpdate: function() {
          counter.innerHTML = Math.ceil(this.targets()[0].innerText).toLocaleString();
        }
      });
    }
  });
});

// 5. Visual Logic Scroll-telling
const steps = document.querySelectorAll('.step');
const diagram = document.querySelector('#flow-diagram');

steps.forEach((step, i) => {
  ScrollTrigger.create({
    trigger: step,
    start: "top center",
    end: "bottom center",
    onEnter: () => {
      steps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
      updateDiagram(i + 1);
    },
    onEnterBack: () => {
      steps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
      updateDiagram(i + 1);
    }
  });
});

function updateDiagram(stepNum) {
  const svg = `<svg viewBox="0 0 400 300" style="width:100%; height:100%;">
    <path id="path1" d="M50,150 L150,150" stroke="var(--daumis-yellow)" stroke-width="2" fill="none" 
      stroke-dasharray="100" stroke-dashoffset="${stepNum >= 1 ? 0 : 100}" style="transition: stroke-dashoffset 1s;"/>
    <path id="path2" d="M150,150 L250,150" stroke="var(--daumis-yellow)" stroke-width="2" fill="none" 
      stroke-dasharray="100" stroke-dashoffset="${stepNum >= 2 ? 0 : 100}" style="transition: stroke-dashoffset 1s;"/>
    <path id="path3" d="M250,150 L350,150" stroke="var(--daumis-yellow)" stroke-width="2" fill="none" 
      stroke-dasharray="100" stroke-dashoffset="${stepNum >= 3 ? 0 : 100}" style="transition: stroke-dashoffset 1s;"/>
    
    <circle cx="50" cy="150" r="10" fill="${stepNum >= 1 ? 'var(--daumis-yellow)' : 'transparent'}" stroke="var(--daumis-yellow)" style="transition: fill 0.5s;"/>
    <circle cx="150" cy="150" r="10" fill="${stepNum >= 2 ? 'var(--daumis-yellow)' : 'transparent'}" stroke="var(--daumis-yellow)" style="transition: fill 0.5s;"/>
    <circle cx="250" cy="150" r="10" fill="${stepNum >= 3 ? 'var(--daumis-yellow)' : 'transparent'}" stroke="var(--daumis-yellow)" style="transition: fill 0.5s;"/>
    <circle cx="350" cy="150" r="10" fill="${stepNum >= 3 ? 'var(--daumis-yellow)' : 'transparent'}" stroke="var(--daumis-yellow)" style="transition: fill 0.5s;"/>

    <text x="50" y="130" fill="white" font-size="10" text-anchor="middle">Data Source</text>
    <text x="150" y="130" fill="white" font-size="10" text-anchor="middle">Core Engine</text>
    <text x="250" y="130" fill="white" font-size="10" text-anchor="middle">Security Layer</text>
    <text x="350" y="130" fill="white" font-size="10" text-anchor="middle">Output</text>
  </svg>
  <div style="position:absolute; bottom:20px; color:var(--daumis-yellow); font-weight:bold; letter-spacing:2px;">
    SYSTEM STATUS: ${stepNum === 3 ? 'PROTECTED' : 'PROCESSING...'}
  </div>`;
  diagram.innerHTML = svg;
}

// Initial diagram state
updateDiagram(1);

// Ensure everything is initialized after load to prevent visibility issues
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
  
  // 6. Bento Card Entrance Animation - Robust Class-based Trigger
  document.querySelectorAll('.bento-card').forEach((card, i) => {
    ScrollTrigger.create({
      trigger: card,
      start: "top 95%",
      onEnter: () => {
        // Add a slight delay based on index for stagger effect
        setTimeout(() => {
          card.classList.add('revealed');
        }, i % 3 * 100); 
      },
      once: true // Only animate once
    });
    
    // Check if already in view
    if (card.getBoundingClientRect().top < window.innerHeight) {
        card.classList.add('revealed');
    }
  });
});
