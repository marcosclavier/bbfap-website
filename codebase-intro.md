# BBFAP Website - Codebase Introduction

## Overview

A professional, multi-page website for **Belanger, Brosseau Fiscalite, Assurances & Placements Inc.** (BBFAP) -- an independent financial advisory firm serving entrepreneurs and professionals in greater Montreal. All content is in French.

---

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Framework   | React 19 + Vite 6                   |
| Routing     | React Router v7 (client-side)       |
| Styling     | Tailwind CSS v3.4 + PostCSS + Autoprefixer |
| Icons       | lucide-react                        |
| Deployment  | Vercel (static site)                |
| State       | Local only (`useState` / `useRef`)  |
| Fonts       | System font stack (no external fonts) |
| Analytics   | None (intentionally excluded)       |

No server-side rendering, no external APIs, no state management library.

---

## Directory Structure

```
bbfap-com/
├── index.html                 # Root HTML template (SEO meta, JSON-LD structured data)
├── package.json               # Scripts: dev, build, preview
├── vite.config.js             # Vite build configuration
├── tailwind.config.js         # Tailwind content paths & theme
├── postcss.config.js          # PostCSS plugins (tailwindcss, autoprefixer)
├── vercel.json                # Vercel headers (CSP, X-Frame-Options)
│
├── src/
│   ├── main.jsx               # Entry point: React 19 root + BrowserRouter
│   ├── App.jsx                # Route definitions + ScrollToTop component
│   ├── index.css              # Global styles, Tailwind directives, animations
│   │
│   ├── components/            # Reusable UI sections
│   │   ├── Nav.jsx            # Sticky header, mobile hamburger, scroll effects
│   │   ├── Hero.jsx           # Full-viewport hero (used on inner pages)
│   │   ├── Stats.jsx          # 4 impact cards + regulatory trust bar
│   │   ├── Valeurs.jsx        # 3-pillar values (Disponibilite, Transparence, Voir Loin)
│   │   ├── Services.jsx       # 3 service cards (alternating layout)
│   │   ├── About.jsx          # Company history timeline (4 milestones)
│   │   ├── Team.jsx           # 2 team member cards with credentials
│   │   ├── Testimonials.jsx   # Google review screenshot + 3 testimonial cards
│   │   ├── Videos.jsx         # 9-video YouTube grid
│   │   ├── Contact.jsx        # CTA section + social links + trust signals
│   │   └── Footer.jsx         # Links, legal disclosures, copyright
│   │
│   ├── pages/                 # Route-level page components
│   │   ├── HomePage.jsx       # Landing: intro, services preview, why-us, about, CTA
│   │   ├── AboutPage.jsx      # Company story, team evolution, clientele
│   │   ├── ServicesPage.jsx   # Detailed service descriptions + approach
│   │   ├── BlogPage.jsx       # Blog stub + YouTube video grid
│   │   └── ContactPage.jsx    # Contact form + trust signals sidebar
│   │
│   └── hooks/
│       └── useInView.js       # Intersection Observer for scroll-triggered animations
│
├── public/                    # Static assets (served as-is by Vite)
│   ├── favicon.png
│   └── images/
│       ├── original/          # Real client photos (hero, team, YouTube thumbs)
│       └── generated/         # AI-generated images (logo, section backgrounds)
│
├── dist/                      # Production build output
│   ├── index.html
│   ├── assets/                # Bundled & hashed JS/CSS
│   └── images/                # Copied from public/
│
├── content-brief.json         # Scraped business metadata & image references
├── image-manifest.json        # Central image inventory (original vs generated)
├── development-plan.md        # Component specs, color palette, typography
├── FEEDBACK-TODO.md           # Client feedback action items
├── CLAUDE.md                  # Project guidelines for AI-assisted development
└── original-site-content.md   # Content scraped from original bbfap.com
```

---

## Routing

Defined in `src/App.jsx` using React Router v7:

| Path         | Component        | Description                         |
|--------------|------------------|-------------------------------------|
| `/`          | `HomePage`       | Main landing page (6 sections)      |
| `/a-propos`  | `AboutPage`      | Company story & evolution           |
| `/services`  | `ServicesPage`   | Detailed service descriptions       |
| `/blogue`    | `BlogPage`       | Blog placeholder + YouTube videos   |
| `/contact`   | `ContactPage`    | Contact form + trust signals        |

A `ScrollToTop` component in `App.jsx` auto-scrolls to the top on every route change.

---

## Build & Development

```bash
npm run dev       # Vite dev server with HMR
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
```

**Build pipeline:** Tailwind scans `index.html` + `src/**/*.{js,jsx}` for utility classes → PostCSS processes with autoprefixer → Vite bundles, minifies, and hashes assets into `dist/`.

---

## Styling Architecture

- **Utility-first** via Tailwind CSS -- almost all styling is inline classes.
- **Custom animations** in `src/index.css`:
  - `fade-in`: opacity 0→1 + translateY 24px→0 (0.65s ease-out), triggered by adding `visible` class via `useInView` hook.
  - `hero-visible`: hero content entrance animation (0.9s).
  - `animate-bounce`: scroll indicator in Hero.
- **Color palette** (from `development-plan.md`):
  - Navy `#1B3A6B` -- section backgrounds, overlays
  - Blue `#2563EB` -- secondary actions, hover states
  - Amber `#D97706` -- CTAs, accents, badges
  - Grays -- text hierarchy and neutral backgrounds
- **Responsive breakpoints:** mobile-first with `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px).

---

## Image Strategy

Two image sources, tracked in `image-manifest.json`:

| Source       | Path                        | Contents                                      |
|--------------|-----------------------------|-----------------------------------------------|
| Original     | `public/images/original/`   | Real photos: hero, logo, team, Google review, 9 YouTube thumbnails |
| Generated    | `public/images/generated/`  | AI-generated: logo, about/portfolio/contact section backgrounds    |

**Rules** (from `CLAUDE.md`):
- Prefer original images over generated ones.
- All images in WebP format (except logos in PNG for transparency).
- Lazy-load all images except hero and logo.
- Reference via URL paths (e.g., `/images/original/hero.webp`), not ES module imports.
- No external image CDNs.

---

## Key Components in Detail

### Nav (`src/components/Nav.jsx`)
Sticky header with scroll-aware background (transparent → white with backdrop blur). Desktop horizontal links + mobile hamburger toggle. CTA button links to external appointment booking.

### useInView Hook (`src/hooks/useInView.js`)
Wraps the Intersection Observer API. Returns a ref to attach to any element. When the element enters the viewport (configurable threshold), adds the `visible` class to trigger CSS animations. Observes once, then disconnects.

### Contact Form (`src/pages/ContactPage.jsx`)
Fields: first name, last name, email, phone (optional), subject dropdown, message. Currently client-side only -- displays a success message on submit but is **not wired to a backend**. Ready for integration with Formspree, Netlify Forms, or a custom endpoint.

---

## SEO & Structured Data

`index.html` includes:
- Standard meta tags (title, description, keywords)
- Open Graph and Twitter Card meta tags
- Canonical URL: `https://www.bbfap.com/`
- JSON-LD structured data (`@type: FinancialService`) with:
  - Service types, area served (Montreal coordinates)
  - Named employees with job titles
  - Social profile links (Facebook, LinkedIn, YouTube)

---

## Accessibility

- Semantic HTML throughout: `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`
- Proper heading hierarchy (h1 → h2 → h3)
- `aria-label` on interactive elements, `aria-labelledby` on sections
- `aria-hidden` on decorative elements
- Visible focus styles (2px solid blue outline)
- Form labels associated with inputs

---

## External Links & Services

| Service              | URL / Notes                                                     |
|----------------------|-----------------------------------------------------------------|
| Appointment Booking  | `https://www.bbfap.com/prendre-rendez-vous` (external system)   |
| Facebook             | `https://www.facebook.com/profile.php?id=61560994705134`        |
| LinkedIn             | `https://www.linkedin.com/company/belanger-brosseau-...`        |
| YouTube              | `https://www.youtube.com/@BelangerBrosseau`                     |

No third-party analytics, tracking scripts, or API integrations.

---

## Supporting Documents

| File                        | Purpose                                                        |
|-----------------------------|----------------------------------------------------------------|
| `CLAUDE.md`                 | AI development guidelines: tech stack, design rules, image strategy, constraints |
| `development-plan.md`       | Full component specs, color palette, typography, spacing, animation details      |
| `FEEDBACK-TODO.md`          | Client feedback items with status (done / waiting)             |
| `content-brief.json`        | Scraped business metadata (mostly superseded by component content)              |
| `image-manifest.json`       | Central registry of all images with paths and purposes         |
| `original-site-content.md`  | Raw content scraped from the original bbfap.com site           |
