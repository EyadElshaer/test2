# Nexifing — Bespoke Web Design & High-Performance Web Development

Official landing page for **Nexifing**, an elite web design and development studio crafting modern, clutter-free, and lightning-fast digital experiences.

---

## 🌟 Highlights & Features

- **Brand Assets & Transparent Logo**:
  - Logo background cleanly removed with sub-pixel alpha matting:
    - `assets/nexifing-logo.png`: Transparent logo with original navy brand text.
    - `assets/nexifing-logo-dark.png`: Dark-mode optimized logo with crisp ice-white typography and neon cyan arrow.
    - `assets/nexifing-icon.png`: Isolated "N" arrow icon mark for loader and badges.
    - `assets/favicon.png`: 64x64 favicon.
- **Hardware-Accelerated & Lag-Free**:
  - Guaranteed 60–120 FPS on older machines and budget hardware.
  - Zero heavy 3D canvas/WebGL shaders that drain CPU or freeze browsers.
  - Pure CSS `translate3d` hardware acceleration and debounced intersection observers.
- **Direct 1-Click WhatsApp Integration**:
  - Auto-start WhatsApp links wired to: `+201202000210`.
  - Floating WhatsApp action button with pulsating beacon in bottom corner.
  - Hero & Header CTA buttons.
  - Interactive project inquiry form that pre-formats client details directly into WhatsApp.
- **Past Works Showcase**:
  - Featured live showcase: **PremiKeys** (`https://premikeys.vercel.app/`).
  - Extensible structure to easily add future client projects.
  - Filter tabs: All, E-Commerce, SaaS & Apps, Brand Sites.
- **Dual Theme Support**:
  - Default futuristic dark studio theme (inspired by wave-team).
  - Clean high-contrast light mode.
  - LocalStorage persistence.

---

## 🚀 How to Run Locally

You can run this project with any local HTTP server:

```bash
# Option 1: Python
python -m http.server 3000

# Option 2: Node.js / npx
npx serve . -l 3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
├── index.html          # Semantic, accessible HTML5 structure with SEO meta tags
├── styles.css          # Design system, glassmorphic cards, responsive breakpoints
├── script.js           # Preloader, theme toggle, mobile navigation, filter tabs
├── assets/
│   ├── nexifing-logo.png         # Transparent logo (light mode)
│   ├── nexifing-logo-dark.png    # Transparent logo (dark mode)
│   ├── nexifing-icon.png         # Transparent "N" arrow mark
│   ├── favicon.png               # Browser tab favicon
│   ├── premikeys-preview.jpg     # PremiKeys past work showcase image
│   ├── saas-preview.jpg          # SaaS platform showcase image
│   └── creative-preview.jpg      # Creative studio showcase image
└── README.md
```

---

## ➕ How to Add More Past Works

To add a new project to your portfolio in the future, simply copy this template inside `#portfolio .projects-grid` in [index.html](file:///c:/Users/ayman/Documents/test2/index.html):

```html
<article class="glass-card project-card reveal" data-category="ecommerce">
  <div class="project-image-wrapper">
    <div class="browser-bar">
      <div class="browser-dots">
        <span class="browser-dot dot-red"></span>
        <span class="browser-dot dot-yellow"></span>
        <span class="browser-dot dot-green"></span>
      </div>
      <div class="browser-url">your-site.vercel.app</div>
    </div>
    <img src="./assets/your-preview.jpg" alt="Project Name" class="project-img" loading="lazy" />
  </div>

  <div class="project-content">
    <div>
      <div class="project-category">Category Name</div>
      <h3 class="project-title">Your Project Name</h3>
      <p class="project-summary">Brief description of the website features...</p>
      <div class="project-tags">
        <span class="tag-badge">Next.js</span>
        <span class="tag-badge">Tailwind</span>
      </div>
    </div>

    <div class="project-action-row">
      <span style="font-size: 0.8rem; color: var(--text-muted);">Status: Production</span>
      <a href="https://your-site.vercel.app/" target="_blank" rel="noopener noreferrer" class="btn-visit-site">
        <span>Visit Live Website</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </a>
    </div>
  </div>
</article>
```

---

## 🌐 Deploy to Vercel

1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Select your repository and click **Deploy**.
4. Since this is pure static HTML/CSS/JS, it will deploy in under 5 seconds with zero configuration required!
