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

// --- 1. LENIS SMOOTH MOMENTUM SCROLLING (DESKTOP GLIDE & NATIVE MOBILE) ---
function initLenis() {
  if (typeof Lenis === 'undefined') {
    console.warn('Lenis library not loaded');
    return;
  }

  // Detect touch devices (phones, tablets, touchscreens)
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // On touchscreens/mobile devices, preserve native 120Hz hardware touch scrolling.
  // Never hijack mobile touch events so scrolling feels natural and never overshoots.
  if (isTouchDevice) {
    lenis = null;
    return;
  }

  // Desktop mouse-wheel smooth scrolling:
  // Using lerp provides silky glide without momentum runaway or overshoot on weak scrolls.
  lenis = new Lenis({
    lerp: 0.08,
    wheelMultiplier: 0.85,
    smoothWheel: true,
    syncTouch: false,
    autoResize: true,
  });

  // Single dedicated animation loop (avoid duplicate ticks)
  function raf(time) {
    if (lenis) {
      lenis.raf(time);
    }
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sync GSAP ScrollTrigger if present
  if (typeof ScrollTrigger !== 'undefined' && lenis) {
    lenis.on('scroll', ScrollTrigger.update);
  }
}

// --- 2. SMOOTH ANCHOR SCROLLING (LENIS ON DESKTOP, NATIVE ON MOBILE) ---
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
            duration: 0.9,
          });
        } else {
          const rect = targetEl.getBoundingClientRect();
          const targetY = rect.top + window.pageYOffset + offsetTop;
          window.scrollTo({
            top: targetY,
            behavior: 'smooth'
          });
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

// --- 7. WHATSAPP FAST-TRACK INQUIRY FORM & SCOPE SELECTOR ---
function initContactForm() {
  const form = document.getElementById('inquiry-form');
  const scopeChips = document.querySelectorAll('.scope-chip');
  const scopeInput = document.getElementById('form-type');

  // Interactive Scope Chips (one-tap mobile selection)
  if (scopeChips.length && scopeInput) {
    scopeChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        scopeChips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        const selectedValue = chip.getAttribute('data-value') || chip.textContent.trim();
        scopeInput.value = selectedValue;
      });
    });
  }

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name')?.value.trim() || 'Client';
    const type = scopeInput?.value || 'Custom Web Platform';
    const notes = document.getElementById('form-notes')?.value.trim() || 'Ready to start our web project.';

    const text = `Hi Nexifing! My name is ${name}.

I'm reaching out about a project:
🚀 Scope: ${type}

Project Vision & Details:
${notes}

Looking forward to your thoughts and pricing!`;

    const encoded = encodeURIComponent(text);
    const waUrl = `https://wa.me/201202000210?text=${encoded}`;

    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });
}

