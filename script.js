/**
 * NEXIFING — Bespoke Creative Logic & Interactivity
 * Optimized for butter-smooth 60-120fps performance
 */

window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initScrollEffects();
  initMobileMenu();
  initWhatsAppPresets();
  initScopeCalculator();
  initContactForm();
  initScrollReveal();
});

// --- 2. THEME SYSTEM ---
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

// --- 3. SCROLL EFFECTS & FLOATING HEADER ---
function initScrollEffects() {
  const headerWrapper = document.querySelector('.header-wrapper');
  const scrollProgressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const pct = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;

        if (scrollProgressBar) {
          scrollProgressBar.style.width = `${pct}%`;
        }

        if (headerWrapper) {
          headerWrapper.classList.toggle('scrolled', scrollY > 30);
        }

        if (backToTopBtn) {
          backToTopBtn.classList.toggle('visible', scrollY > 400);
        }

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// --- 4. MOBILE MENU ---
function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
  });

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('active');
    });
  });
}


// --- 6. INTERACTIVE WHATSAPP PRESET CHIPS ---
function initWhatsAppPresets() {
  const chips = document.querySelectorAll('.preset-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-preset');
      const url = `https://wa.me/201202000210?text=${encodeURIComponent(prompt)}`;
      window.open(url, '_blank');
    });
  });
}

// --- 7. INTERACTIVE WEBSITE SCOPE ESTIMATOR ---
function initScopeCalculator() {
  const typeBtns = document.querySelectorAll('.scope-type-btn');
  const speedBtns = document.querySelectorAll('.scope-speed-btn');
  const calcOutputDays = document.getElementById('calc-estimate-days');
  const calcWhatsAppBtn = document.getElementById('calc-send-wa');

  let selectedType = 'E-Commerce Platform (Like PremiKeys)';
  let selectedSpeed = 'Fast-Track Sprint (7–10 Days)';

  function updateEstimate() {
    let days = '7–10 Business Days';
    if (selectedType.includes('Landing Page')) {
      days = selectedSpeed.includes('Sprint') ? '3–5 Days' : '1–2 Weeks';
    } else if (selectedType.includes('E-Commerce')) {
      days = selectedSpeed.includes('Sprint') ? '7–10 Days' : '2–3 Weeks';
    } else {
      days = selectedSpeed.includes('Sprint') ? '10–14 Days' : '3–4 Weeks';
    }

    if (calcOutputDays) calcOutputDays.innerText = days;

    if (calcWhatsAppBtn) {
      const msg = encodeURIComponent(
        `Hi Nexifing! I configured my project scope:\n• Type: ${selectedType}\n• Timeline: ${selectedSpeed} (~${days})\nPlease let me know pricing and next steps!`
      );
      calcWhatsAppBtn.href = `https://wa.me/201202000210?text=${msg}`;
    }
  }

  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedType = btn.getAttribute('data-value');
      updateEstimate();
    });
  });

  speedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      speedBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedSpeed = btn.getAttribute('data-value');
      updateEstimate();
    });
  });

  updateEstimate();
}

// --- 8. DIRECT CONTACT FORM ---
function initContactForm() {
  const form = document.getElementById('custom-inquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('input-name')?.value || 'Client';
    const goal = document.getElementById('input-goal')?.value || 'New Website';
    const notes = document.getElementById('input-notes')?.value || '';

    const text = encodeURIComponent(
      `Hello Nexifing! My name is ${name}.\nI am reaching out regarding: ${goal}.\nProject details: ${notes}`
    );

    window.open(`https://wa.me/201202000210?text=${text}`, '_blank');
  });
}

// --- 9. SCROLL REVEALS ---
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('revealed'));
    return;
  }

  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -40px 0px', threshold: 0.1 });

  reveals.forEach(el => obs.observe(el));
}
