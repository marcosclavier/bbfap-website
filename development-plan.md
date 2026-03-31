# Development Plan — Bélanger Brosseau Fiscalité, Assurances & Placements Inc.

## Business Summary
**Company:** Bélanger, Brosseau Fiscalité, Assurances & Placements Inc.
**Domain:** bbfap.com
**Type:** Independent financial advisory firm — tax, insurance, and portfolio management
**Market:** Entrepreneurs and incorporated professionals in the greater Montreal area
**Language:** French

---

## 1. Project Initialization

- Framework: React 18 + Vite (already scaffolded)
- Styling: Tailwind CSS v3 (already installed)
- Icons: lucide-react (already in dependencies)
- Target: Vercel static deployment
- Entry: `src/main.jsx` → `src/App.jsx`

---

## 2. Full Section Inventory

Identified from all crawled pages (home, apropos, assurances, fiscalite, placements):

| # | Section | Source Page | Notes |
|---|---------|-------------|-------|
| 1 | **Navigation** | All | Logo, links to sections, CTA button |
| 2 | **Hero** | Home | Full-width hero, main tagline, CTA |
| 3 | **Notre Impact (Stats)** | Home | 100+ entrepreneurs, 33% multi-gen, 100% fiscaliste access |
| 4 | **Nos Valeurs** | Home | Disponibilité, Transparence, Voir Loin |
| 5 | **Services** | Home + service pages | Fiscalité, Assurances, Placements |
| 6 | **Notre Histoire** | À Propos | Company founding, family business succession |
| 7 | **Notre Équipe** | À Propos | Frédéric Babeux & Annie Bélanger bios |
| 8 | **Témoignages** | Home | Customer review screenshot + trust signals |
| 9 | **Ressources YouTube** | Home | 9 videos with titles and descriptions |
| 10 | **Contact / CTA** | All | Appointment booking CTA |
| 11 | **Footer** | All | Social links, legal, credits |

---

## 3. Component Breakdown

### `Nav.jsx`
- Logo from `/images/generated/logo.png`
- Links: #services, #about, #team, #ressources, #contact
- Sticky header with backdrop blur on scroll
- Mobile hamburger menu

### `Hero.jsx`
- Background: `/images/original/hero.webp` with dark overlay
- Heading: "GESTION DE PATRIMOINE COMPLÈTE POUR PROFESSIONNELS ET ENTREPRENEURS"
- Subheading: "Notre service assure un lien direct avec votre conseiller financier, renforcé par une fiscaliste attitrée."
- CTA button → "Prendre Rendez-Vous" (https://www.bbfap.com/prendre-rendez-vous)

### `Stats.jsx`
- 3 large stat blocks:
  - "100+" Entrepreneurs (Dentistes, Médecins, Optométristes)
  - "33%" Familles servies sur plus d'une génération
  - "100%" Des clients ont accès à notre fiscaliste gratuitement
- Trust bar: 130+ covered businesses, 22 insurers network

### `Valeurs.jsx`
- 3 value cards with icon + title + bullet points:
  1. **Disponibilité** — Retours <24h, domicile/bureau/vidéoconférence, jour ET soir, fiscaliste attitrée
  2. **Transparence** — Conseillers 100% indépendants, pas de produits maison, frais divulgués
  3. **Voir Loin** — Vos besoins en premier, approche multi-générationnelle, relations à long terme

### `Services.jsx`
- 3 service cards with image, icon, title, description, learn more:
  1. **Fiscalité** — Tax optimization, business structure, succession planning; direct fiscaliste access
  2. **Assurances** — Life, disability, critical illness, 22 insurers, business protection
  3. **Placements** — Warren Buffett philosophy, diversification, fee-based, no hidden commissions

### `About.jsx`
- Company founding story — Annie Bélanger & Louis-Pierre Brosseau (années 90)
- 2019: Frédéric Babeux joins; 2021: succession
- "PLEIN FEU SUR LE REPRENEURIAT FAMILIAL"
- Image: `/images/generated/section-about.webp`

### `Team.jsx`
- 2 team member cards:
  1. **Frédéric Babeux** — B.A.A., CIM — Gestionnaire de Portefeuille; 8+ years; PEAK
  2. **Annie Bélanger** — M. Fisc, Pl. Fin, A.V.A. — Fiscaliste; 30+ years; U Ottawa + U Sherbrooke

### `Testimonials.jsx`
- Review image: `/images/original/general.webp`
- Section title + trust statement derived from content
- 3 implied testimonial cards (from business context — dentists, doctors, entrepreneurs)

### `Videos.jsx`
- Section: "Apprenez à nous connaître sur notre chaîne YouTube"
- Grid of 9 video cards using `/images/original/general-1.webp` through `general-9.webp`
- Video titles and descriptions from site content
- CTA: Subscribe button → YouTube channel

### `Contact.jsx`
- Large CTA section with gradient background
- Appointment booking button → https://www.bbfap.com/prendre-rendez-vous
- Secondary: Social links (Facebook, LinkedIn, YouTube)
- Image: `/images/generated/section-contact.webp`

### `Footer.jsx`
- Company name and tagline
- Service links
- Social icons (Facebook, LinkedIn, YouTube)
- Legal disclosure (OCRI, PEAK, AMF references)
- Copyright

---

## 4. Page Structure & Order

```
<Nav /> (sticky)
<Hero /> (full viewport height)
<Stats /> (dark blue background)
<Valeurs /> (white background)
<Services /> (light gray background)
<About /> (white background)
<Team /> (light blue tinted background)
<Testimonials /> (white background)
<Videos /> (light gray background)
<Contact /> (deep navy CTA)
<Footer /> (darkest navy)
```

---

## 5. Styling Plan

### Colors
- **Primary Navy:** `#1B3A6B` (deep trust blue)
- **Secondary Blue:** `#2563EB` (accent interactive)
- **Gold/Amber:** `#D97706` (warm CTA accent)
- **Dark Text:** `#111827`
- **Medium Text:** `#374151`
- **Muted Text:** `#6B7280`
- **Background:** `#FFFFFF`
- **Surface:** `#F9FAFB`
- **Surface Dark:** `#F3F4F6`

### Typography
- System font stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- Headings: bold, tight tracking
- Body: 1.6 line-height

### Spacing
- Generous padding: sections use `py-20 md:py-28`
- Max content width: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

### Animations
- Fade-in on scroll using Intersection Observer
- Subtle hover transforms on cards
- Smooth scroll for anchor links

---

## 6. Image Strategy

| Section | Image Source |
|---------|-------------|
| Logo | `/images/generated/logo.png` |
| Hero | `/images/original/hero.webp` (with dark overlay) |
| About | `/images/generated/section-about.webp` |
| Portfolio/Placements | `/images/generated/section-portfolio.webp` |
| Contact CTA | `/images/generated/section-contact.webp` |
| Testimonials | `/images/original/general.webp` |
| Videos | `/images/original/general-1.webp` through `general-9.webp` |

All images referenced by URL path (not ES imports). No external URLs.

---

## 7. SEO

- `<title>`: "Bélanger Brosseau | Conseiller Financier Indépendant — Fiscalité, Assurances & Placements"
- `<meta name="description">`: Services financiers pour entrepreneurs incorporés — gestion de portefeuille, fiscalité, assurances dans la région de Montréal.
- Open Graph: og:title, og:description, og:type="website"
- Structured data: LocalBusiness JSON-LD
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`
- Heading hierarchy: h1 in hero, h2 for section titles, h3 for cards
- lang="fr" on html element
