/**
 * NEXIFING — MODERN WEB DESIGN & PERFORMANCE ENGINEERING
 * Interactive Logic:
 * - Lenis Smooth Momentum Scrolling (Silky Inertial Glide & Mobile Touch Optimized)
 * - Particle Spore Dust Canvas with Cyan & Indigo Palettes (Mobile Throttled)
 * - Mobile Navigation Drawer with Touch Link Handling
 * - WhatsApp Fast-Track Inquiry Dispatch
 * - Theme Switcher & Back to Top
 */

let lenis = null;

window.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initSporeCanvas();
  initTheme();
  initHeaderAndScroll();
  initMobileMenu();
  initSmoothAnchorScroll();
  initContactForm();
});

// --- 1. LENIS SMOOTH MOMENTUM SCROLLING ---
function initLenis() {
  if (typeof Lenis === 'undefined') {
    console.warn('Lenis library not loaded');
    return;
  }

  // Optimize physics for mobile touch vs desktop wheel
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  lenis = new Lenis({
    duration: isTouchDevice ? 1.0 : 1.35,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.82,
    touchMultiplier: 1.0,
    syncTouch: true,
    syncTouchLerp: 0.08,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sync GSAP ScrollTrigger with Lenis
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }
}

// --- 2. SMOOTH ANCHOR SCROLLING WITH LENIS ---
function initSmoothAnchorScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        
        // Close mobile drawer if open
        const menu = document.getElementById('mobile-menu');
        const toggle = document.getElementById('mobile-toggle');
        if (menu && menu.classList.contains('open')) {
          menu.classList.remove('open');
          if (toggle) toggle.classList.remove('active');
        }

        const offsetTop = window.innerWidth < 768 ? -65 : -80;

        if (lenis) {
          lenis.scrollTo(targetEl, {
            offset: offsetTop,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

// --- 3. FLOATING SPORE PARTICLE CANVAS (MOBILE OPTIMIZED) ---
function initSporeCanvas() {
  const canvas = document.querySelector('.heroSporeCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const isMobile = window.innerWidth < 768;
  let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
  let height = (canvas.height = canvas.offsetHeight || (isMobile ? 550 : 750));

  // Throttled particle count on mobile for zero lag and battery conservation
  const particleCount = isMobile ? 22 : 110;
  const particles = [];
  const particleColors = [
    '#FFFFFF',
    '#00F2FE',
    '#4FACFE',
    '#937AFF',
    'rgba(255, 255, 255, 0.7)',
  ];

  class SporeParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.size = Math.random() * 2.0 + 0.8;
      this.speedY = Math.random() * 0.55 + 0.2;
      this.wobble = Math.random() * 0.7 + 0.2;
      this.wobbleSpeed = Math.random() * 0.02 + 0.01;
      this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
      this.opacity = Math.random() * 0.6 + 0.2;
    }

    update() {
      this.y -= this.speedY;
      this.x += Math.sin(this.y * this.wobbleSpeed) * this.wobble;

      if (this.y < -15) {
        this.reset(false);
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new SporeParticle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const mob = window.innerWidth < 768;
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || (mob ? 550 : 750);
    }, 200);
  });
}

// --- 4. THEME SYSTEM ---
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('nexifing_theme') || 'dark';

  if (saved === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('nexifing_theme', isDark ? 'dark' : 'light');
    });
  }
}

// --- 5. HEADER & SCROLL PROGRESS & BACK TO TOP ---
function initHeaderAndScroll() {
  const header = document.getElementById('main-header');
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTop = document.getElementById('back-to-top');

  function updateScrollState() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }

    if (header) {
      if (scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (backToTop) {
      if (scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.3 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}

// --- 6. MOBILE MENU DRAWER WITH FULL TOUCH SUPPORT ---
function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.toggle('open');
      toggle.classList.toggle('active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close when tapping outside
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        menu.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close when clicking any menu link
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

// --- 7. WHATSAPP FAST-TRACK INQUIRY FORM ---
function initContactForm() {
  const form = document.getElementById('inquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name')?.value.trim() || 'Client';
    const type = document.getElementById('form-type')?.value || 'Custom Website';
    const notes = document.getElementById('form-notes')?.value.trim() || '';

    const text = `Hi Nexifing! My name is ${name}.

I'm interested in building:
🚀 Scope: ${type}

Project Details & Requirements:
${notes}

Looking forward to your feedback and getting a tailored quote!`;

    const encoded = encodeURIComponent(text);
    const waUrl = `https://wa.me/201202000210?text=${encoded}`;

    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });
}
