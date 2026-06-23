# BBFAP Website - Codebase Introduction

## Overview

A professional, multi-page website for **Belanger, Brosseau Fiscalite, Assurances & Placements Inc.** (BBFAP) -- an independent financial advisory firm serving entrepreneurs and professionals in greater Montreal. All content is in French.

The site is a React SPA that ships as a static build, but it is **not** purely static: a small set of Vercel serverless functions back a self-serve blog editor, a live YouTube video feed, and a reCAPTCHA-verified contact form. Editorial content (blog posts + per-video overrides) lives in a **Sanity CMS** and is baked into the bundle at build time, so the public pages stay fast and dependency-free while remaining editable.

---

## Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Framework    | React 19 + Vite 6                   |
| Routing      | React Router v7 (client-side)       |
| Styling      | Tailwind CSS v3.4 + PostCSS + Autoprefixer |
| Icons        | lucide-react                        |
| CMS          | Sanity v3 (separate Studio in `studio/`) |
| Serverless   | Vercel Functions (`api/*.js`, Node runtime) |
| Rich text    | TipTap v3 (`/admin` editor) ↔ Portable Text |
| Spam defense | Google reCAPTCHA v3 (server-verified) |
| Deployment   | Vercel                              |
| State        | Local only (`useState` / `useRef`)  |
| Fonts        | System font stack (no external fonts) |
| Analytics    | None (intentionally excluded)       |

No server-side rendering and no state-management library. The serverless functions exist only for the editor, the live video feed, and contact-form verification; the public pages themselves render from build-time JSON snapshots.

---

## Architecture at a Glance

```
        Sanity CMS  ──┐                         YouTube channel RSS
   (blog posts +      │                                  │
    video overrides)  │                                  │
                      ▼                                  ▼
            scripts/build-content.mjs  ◄──── scripts/lib/youtube.mjs (merge)
                      │
                      ▼  writes
        src/data/blog.generated.json   +   src/data/videos.generated.json
                      │
                      ▼  imported at build time
              Vite bundle → dist/ (static, fast)

   Runtime extras (Vercel serverless functions):
     /api/posts   /api/upload   → self-serve blog editor at /admin (Sanity write token)
     /api/videos                → live merged YouTube feed (1h edge cache, snapshot fallback)
     /api/contact               → reCAPTCHA v3 verification for the contact form
```

The public site reads the two `*.generated.json` snapshots, so a CMS or YouTube outage never blanks a page. The serverless layer is purely additive — `useVideos` upgrades the baked feed to the live one when `/api/videos` is reachable, and the editor triggers a rebuild to refresh the blog snapshot.

---

## Directory Structure

```
bbfap-com/
├── index.html                 # Root HTML template (SEO meta, JSON-LD structured data)
├── package.json               # Scripts: dev, build, preview, build:content, migrate:sanity
├── vite.config.js             # Vite build configuration
├── tailwind.config.js         # Tailwind content paths & theme
├── postcss.config.js          # PostCSS plugins (tailwindcss, autoprefixer)
├── vercel.json                # SPA rewrites (excluding /api & Vite dev paths) + headers
│
├── api/                       # Vercel serverless functions (Node runtime)
│   ├── posts.js               # CRUD for blog posts (backs /admin); Sanity write token
│   ├── upload.js              # Hero-image upload to Sanity asset store (backs /admin)
│   ├── videos.js              # Live merged YouTube feed (RSS + Sanity overrides), edge-cached
│   └── contact.js             # reCAPTCHA v3 server-side verification for the contact form
│
├── scripts/                   # Build-time & one-off Node scripts (run with `node`)
│   ├── build-content.mjs      # Fetches posts + videos → src/data/*.generated.json (runs on dev/build)
│   ├── migrate-content.mjs    # One-time: import legacy blogPosts.js + videos into Sanity
│   ├── set-video-urls.mjs     # One-off: patch youtubeUrl onto existing Sanity video docs
│   ├── generate-service-images.mjs  # One-off: Gemini image gen for service tiles (needs `sharp`)
│   └── lib/
│       ├── adminApi.mjs       # Shared server helpers for api/posts + api/upload (auth, clients)
│       └── youtube.mjs        # Shared YouTube RSS fetch + Sanity-override merge logic
│
├── studio/                    # Standalone Sanity Studio (separate package, own node_modules)
│   ├── sanity.config.ts       # Studio config (project id, plugins)
│   ├── sanity.cli.ts          # Studio CLI config
│   ├── schemas/
│   │   ├── blogPost.ts        # Blog post document schema (title, slug, heroImage, body, …)
│   │   ├── video.ts           # Optional per-video override (custom thumbnail / title)
│   │   └── index.ts           # Schema registry
│   └── README.md              # Studio setup & usage notes
│
├── src/
│   ├── main.jsx               # Entry point: React 19 root + BrowserRouter
│   ├── App.jsx                # Routes + ScrollToTop; lazy-loads /admin; hides nav/footer on /admin
│   ├── index.css              # Global styles, Tailwind directives, animations
│   │
│   ├── components/            # Reusable UI sections
│   │   ├── Nav.jsx            # Sticky header, mobile hamburger, scroll effects
│   │   ├── Hero.jsx           # Full-viewport hero (used on inner pages)
│   │   ├── Stats.jsx          # Impact cards + regulatory trust bar
│   │   ├── Valeurs.jsx        # 3-pillar values (Disponibilite, Transparence, Voir Loin)
│   │   ├── Services.jsx       # Service cards (alternating layout)
│   │   ├── About.jsx          # Company history timeline
│   │   ├── Team.jsx           # Team member cards with credentials
│   │   ├── Testimonials.jsx   # Google review screenshot + testimonial cards
│   │   ├── Videos.jsx         # YouTube grid (consumes the live/baked video feed)
│   │   ├── Contact.jsx        # CTA section + social links + trust signals
│   │   ├── Footer.jsx         # Links, legal disclosures, copyright
│   │   ├── LocalSeoLanding.jsx    # Data-driven template for the two local-SEO landing pages
│   │   ├── PortableTextBody.jsx   # Renders Sanity Portable Text (also handles legacy string[])
│   │   └── RichTextEditor.jsx     # TipTap WYSIWYG used by the /admin editor
│   │
│   ├── pages/                 # Route-level page components
│   │   ├── HomePage.jsx       # Landing: intro, services preview, why-us, about, CTA
│   │   ├── AboutPage.jsx      # Company story, team evolution, clientele
│   │   ├── ServicesPage.jsx   # Detailed service descriptions + approach
│   │   ├── BlogPage.jsx       # Blog index + YouTube video grid
│   │   ├── BlogPostPage.jsx   # Single post (/blogue/:slug), renders Portable Text
│   │   ├── ContactPage.jsx    # Contact form (reCAPTCHA v3) + trust-signals sidebar
│   │   ├── ConseillerFinancierRiveSud.jsx    # Local-SEO landing (wraps LocalSeoLanding)
│   │   ├── ConseillerFinancierMontreal.jsx   # Local-SEO landing (wraps LocalSeoLanding)
│   │   └── AdminPage.jsx      # Password-gated self-serve blog editor (lazy-loaded)
│   │
│   ├── hooks/
│   │   ├── useInView.js       # IntersectionObserver → boolean (scroll-triggered animations)
│   │   ├── useSeo.js          # Per-page <title>/description/canonical, restored on unmount
│   │   ├── useRecaptcha.js    # Loads reCAPTCHA v3 once, returns an execute() token helper
│   │   └── useVideos.js       # Returns baked feed, upgrades to /api/videos live feed when reachable
│   │
│   ├── lib/                   # Client-side helpers
│   │   ├── sanityClient.js    # Read-only Sanity client (CDN, published perspective) or null
│   │   ├── sanityImage.js     # Image-URL builder (urlFor / imageSrc)
│   │   ├── youtube.js         # YouTube id extraction, thumbnail & watch-URL helpers
│   │   └── portableTextTiptap.js  # Portable Text ↔ TipTap conversion (pure, unit-testable)
│   │
│   └── data/
│       ├── blogPosts.js       # Legacy hardcoded posts (migration source + offline fallback)
│       ├── blog.generated.json    # Build-time blog snapshot (generated; do not hand-edit)
│       └── videos.generated.json  # Build-time video snapshot (generated; do not hand-edit)
│
├── public/                    # Static assets (served as-is by Vite)
│   ├── favicon.png
│   ├── robots.txt
│   └── images/
│       ├── original/          # Real client photos (hero, team, YouTube thumbs)
│       └── generated/         # AI-generated images (logo, section backgrounds, thumbs)
│
├── dist/                      # Production build output (index.html, hashed assets, images)
│
├── content-brief.json         # Scraped business metadata & image references
├── image-manifest.json        # Central image inventory (original vs generated)
├── development-plan.md        # Component specs, color palette, typography
├── FEEDBACK-TODO.md           # Client feedback action items
├── CLAUDE.md                  # Project guidelines for AI-assisted development
├── original-site-content.md   # Content scraped from original bbfap.com
└── *.txt                      # Loose client-meeting transcripts & API notes (not code)
```

---

## Routing

Defined in `src/App.jsx` using React Router v7:

| Path                          | Component                   | Description                                  |
|-------------------------------|-----------------------------|----------------------------------------------|
| `/`                           | `HomePage`                  | Main landing page                            |
| `/a-propos`                   | `AboutPage`                 | Company story & evolution                    |
| `/services`                   | `ServicesPage`              | Detailed service descriptions                |
| `/blogue`                     | `BlogPage`                  | Blog index + YouTube videos                  |
| `/blogue/:slug`               | `BlogPostPage`              | Single blog post (Portable Text body)        |
| `/contact`                    | `ContactPage`               | Contact form + trust signals                 |
| `/conseiller-financier-rive-sud`  | `ConseillerFinancierRiveSud`  | Local-SEO landing page                   |
| `/conseiller-financier-montreal`  | `ConseillerFinancierMontreal` | Local-SEO landing page                   |
| `/admin`                      | `AdminPage` (lazy)          | Self-serve blog editor (password-gated)      |

- A `ScrollToTop` component auto-scrolls to the top on every route change.
- `/admin` is **code-split** (`lazy(() => import('./pages/AdminPage'))`) so the TipTap editor bundle never loads for public visitors. When the path starts with `/admin`, `App` renders the editor as a standalone full-screen app with no public `Nav`/`Footer`.
- The two `/conseiller-financier-*` routes both render the shared `LocalSeoLanding` component with locale-specific data.

---

## Build & Development

```bash
npm run dev          # build-content.mjs, then Vite dev server with HMR
npm run build        # build-content.mjs, then production build → dist/
npm run preview      # Preview the production build locally
npm run build:content   # Regenerate src/data/*.generated.json only
npm run migrate:sanity  # One-time legacy-content import into Sanity (see Scripts)
```

**Content step:** `dev` and `build` both run `node scripts/build-content.mjs` first. It fetches blog posts from Sanity (or falls back to legacy posts) and the YouTube feed (merged with Sanity overrides), then writes `src/data/blog.generated.json` and `src/data/videos.generated.json`, which the app imports.

**Build pipeline:** Tailwind scans `index.html` + `src/**/*.{js,jsx}` → PostCSS + autoprefixer → Vite bundles, minifies, and hashes assets into `dist/`.

> ⚠️ `npm run dev` (Vite) does **not** serve the `/api/*` functions. To exercise the contact form, the live video feed, or the `/admin` editor locally, run **`npx vercel dev`** instead. `vercel.json`'s SPA rewrite deliberately excludes `/api/`, `/@`, `/src/`, `/node_modules/`, and dotted paths so `vercel dev` can still serve Vite's dev modules.

**Sanity Studio** is a separate package under `studio/` with its own `node_modules` and scripts (`sanity dev` on port 3333, `sanity deploy`). See `studio/README.md`.

---

## Content System (Sanity + build-time snapshots)

### Sanity schemas (`studio/schemas/`)

- **`blogPost`** — `title`, `slug`, `publishedAt`, `readTime`, `category` (one of a fixed list), `heroImage` (with `alt`), `excerpt`, `hasVideo`, and a Portable Text `body`. The body block schema is intentionally limited to the styles/marks the site renders: `normal | h2 | h3 | blockquote`, bullet/number lists, `strong`/`em` decorators, and a `link` annotation (`href`, `newWindow`).
- **`video`** — an **optional override** keyed by `youtubeUrl`. The YouTube channel RSS feed is the source of truth for which videos exist and their order; a `video` document only exists to supply a custom thumbnail and/or a title override for one video.

The blog `category` list is duplicated in three places that **must stay in sync**: `studio/schemas/blogPost.ts`, `scripts/lib/adminApi.mjs` (`CATEGORIES`), and `src/pages/AdminPage.jsx` (`CATEGORIES`).

### Build-time snapshots (`src/data/*.generated.json`)

`scripts/build-content.mjs` produces both snapshots:

- **Blog:** if `VITE_SANITY_PROJECT_ID` is set, posts are fetched from Sanity (hero images resolved through the image-URL builder); otherwise it falls back to `src/data/blogPosts.js` (legacy hardcoded posts). The public blog (`BlogPage`/`BlogPostPage`) reads `blog.generated.json`, so a freshly saved post only appears after a rebuild.
- **Videos:** the YouTube channel RSS feed is fetched and merged with Sanity overrides via `scripts/lib/youtube.mjs`. On RSS failure the previous snapshot is preserved so a transient blip never blanks the videos section.

`PortableTextBody.jsx` renders a post body; it also detects a legacy `string[]` body (plain paragraphs) and renders that form too, so old and new posts coexist.

---

## Serverless API (`api/`)

All four are standard Vercel function handlers (`export default function handler(req, res)`).

### `POST /api/contact`
Server-side **reCAPTCHA v3** verification. Reads `CAPTCHA_SECRET_KEY`, calls Google's `siteverify`, and accepts the submission only when `success`, `score >= 0.5`, and `action === 'contact'`. The secret never reaches the browser. **Note:** message *delivery* (email/CRM) is not yet wired up — once verification passes, the validated fields are available on `body` for forwarding.

### `GET /api/videos`
Returns the live merged video feed (YouTube RSS + Sanity overrides). Edge-cached `s-maxage=3600, stale-while-revalidate=86400`, so a new upload shows within ~1h at near-zero cost. On RSS failure it serves the baked `videos.generated.json` (`source: 'fallback'`); on Sanity failure it serves RSS-only.

### `POST /api/upload` and `/api/posts` (the editor backend)
These back the `/admin` editor and are gated by admin credentials (see below). They hold the **Sanity write token** (`SANITY_API_TOKEN`), which never reaches the browser.

- **`/api/posts`** — `GET` lists posts (also used as the auth/health check), `GET ?id=` returns one post for editing, `POST` creates (no `_id`) or replaces (with `_id`) a post, `DELETE ?id=` deletes one. A `POST`/`DELETE` with `publish:true` fires the Vercel deploy hook so the blog snapshot rebuilds. Server-side validation mirrors the Sanity schema, and every block/span/markDef is defensively given a unique `_key`.
- **`/api/upload`** — uploads a hero image to Sanity's asset store. The browser downscales/JPEG-encodes first (see `AdminPage`), keeping the base64 payload under Vercel's ~4.5 MB body limit (hard-capped at 4 MB server-side).

### Shared helpers (`scripts/lib/adminApi.mjs`)
Server-only module imported by `api/posts.js` and `api/upload.js`:
- `getWriteClient()` / `getImageBuilder()` — memoized Sanity write client (`useCdn:false`) and image-URL builder.
- `isAuthorized(req)` — checks the `x-admin-username` header against `ADMIN_USERNAME` (default `fbabeux@peakgroup.com`, case-insensitive) and the `x-admin-password` header against `ADMIN_PASSWORD` in **constant time** (`timingSafeEqual`).
- `guard(req, res)` — returns `true` to proceed, otherwise writes a 500 (misconfigured) or 401 (unauthorized) and returns `false`.
- `readJsonBody(req)`, `triggerRebuild()` (best-effort `VERCEL_DEPLOY_HOOK_URL` POST), and the canonical `CATEGORIES` list.

---

## Self-Serve Blog Editor (`/admin`)

A password-gated editor (`src/pages/AdminPage.jsx`) lets a non-technical editor add/edit/delete posts without touching Sanity Studio.

- **Auth:** a username + shared password entered on a lock screen, kept in `sessionStorage` and sent on every request via `x-admin-username` / `x-admin-password` headers. A successful `GET /api/posts` confirms the credentials; a `401` clears the session. This is "good enough for one trusted editor," not full auth.
- **Workflow:** list view (with hero thumbnails) → editor form (title with auto-slug, date, read time, category, excerpt, hero-image upload with in-browser downscale, "contains a video" flag, and the rich-text body). **Enregistrer** saves a draft to Sanity; **Publier** saves and fires the deploy hook (post live in ~1–2 min after rebuild).
- **Body editing:** `RichTextEditor.jsx` is a **TipTap v3** WYSIWYG restricted to exactly what `PortableTextBody` renders (bold, italic, H2, H3, bullet/ordered lists, blockquote, links). StarterKit features the public renderer can't show (strike, code, codeBlock, horizontalRule, underline) are disabled; StarterKit's bundled Link is kept (don't also add `@tiptap/extension-link` — it collides). The editor speaks Portable Text in/out via `src/lib/portableTextTiptap.js`.
- The page injects a `noindex, nofollow` robots meta on mount so the editor stays out of search results.

### `src/lib/portableTextTiptap.js`
Pure, framework-free conversion used by the editor:
- `portableTextToTiptap(blocks)` — Portable Text → TipTap/ProseMirror doc JSON (groups consecutive list items and blockquote blocks).
- `tiptapToPortableText(doc)` — the reverse (drops empty paragraphs, mints `_key`s, maps marks).
- `portableTextHasContent(blocks)` — true when at least one block has visible text (used to block empty saves).

---

## Scripts (`scripts/`)

| Script                       | Type        | Purpose                                                                 |
|------------------------------|-------------|-------------------------------------------------------------------------|
| `build-content.mjs`          | build-time  | Fetch posts (Sanity/legacy) + videos (YouTube+Sanity) → `src/data/*.generated.json`. Runs automatically on `dev`/`build`. Loads `.env` itself. |
| `migrate-content.mjs`        | one-time    | Import `src/data/blogPosts.js` + a canonical 9-video list into Sanity. Idempotent (skips existing slugs/titles). Needs `SANITY_WRITE_TOKEN`. (`npm run migrate:sanity`) |
| `set-video-urls.mjs`         | one-off     | Patch `youtubeUrl` onto existing Sanity `video` docs by exact title match. Idempotent. |
| `generate-service-images.mjs`| one-off     | Generate the three service-tile images via Gemini and encode to WebP. Needs `GEMINI_API_KEY` and the `sharp` package (not a project dependency). |
| `lib/adminApi.mjs`           | shared      | Server helpers for the editor API routes (see Serverless API).          |
| `lib/youtube.mjs`            | shared      | `fetchYouTubeFeed`, `fetchSanityOverrides`, `mergeVideos`, `extractVideoId`. Used by both `build-content.mjs` and `api/videos.js`. Default channel `UC0qp3oXbnyHBRsg74-FSikQ`. |

The `.mjs` scripts each include a tiny inline `.env` loader (no `dotenv` dependency).

---

## Hooks (`src/hooks/`)

### `useInView(ref, options)` — `useInView.js`
Wraps IntersectionObserver. Pass it a ref and an optional `{ threshold }` (default `0.15`); it **returns a boolean** that flips to `true` once the element scrolls into view, then unobserves. Callers toggle a `visible` class to fire the CSS `fade-in` animation. *(This replaced the older self-attaching version that added the class directly.)*

### `useSeo({ title, description, canonical })` — `useSeo.js`
Per-page SEO for this client-rendered SPA. Sets `document.title`, the `meta[name=description]`, and the canonical `<link>` on mount, and **restores the previous values on unmount** so navigating back to the `index.html`-baked home page leaves no stale tags. Used by the local-SEO landing pages and other inner pages.

### `useRecaptcha(siteKey)` — `useRecaptcha.js`
Loads the reCAPTCHA v3 script once (module-level cached promise), preloads it on mount, and returns an `execute(action)` function resolving to a fresh token. Returns `null` (graceful degradation) when no site key is configured. Paired with `POST /api/contact`.

### `useVideos()` — `useVideos.js`
Returns the baked `videos.generated.json` immediately, then fetches `/api/videos` and swaps in the live feed if it returns a non-empty list. Failures are silently ignored, so the section always renders.

---

## Client Libraries (`src/lib/`)

- **`sanityClient.js`** — read-only Sanity client (`useCdn:true`, `published` perspective), or `null` when no project id is configured.
- **`sanityImage.js`** — `urlFor(source)` and `imageSrc(source, {width,height,quality})`; pass-through for plain string URLs.
- **`youtube.js`** — client-side `extractYouTubeId`, `youtubeThumbnail`, `youtubeWatchUrl`. (Distinct from the server-side `scripts/lib/youtube.mjs`.)
- **`portableTextTiptap.js`** — see the editor section above.

---

## Styling Architecture

- **Utility-first** via Tailwind CSS -- almost all styling is inline classes.
- **Custom animations** in `src/index.css`:
  - `fade-in`: opacity 0→1 + translateY 24px→0 (0.65s ease-out), triggered by adding `visible` (via `useInView`).
  - `hero-visible`: hero content entrance (0.9s).
  - `animate-bounce`: scroll indicator in Hero.
- **Brand color:** the current brand blue is **`#16508C`** (used across the footer, gradients, CTAs, and hardcoded as `BLUE` in `AdminPage`/`RichTextEditor`). The older palette below from `development-plan.md` is partly superseded by this unification:
  - Navy `#1B3A6B`, Blue `#2563EB`, Amber `#D97706` (still used for editor "Publier"/blockquote accents), grays for text hierarchy.
- **The `/admin` editor styles TipTap content with Tailwind arbitrary variants** (`[&_h2]:…`) — no global CSS and no typography plugin.
- **Responsive breakpoints:** mobile-first with `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px).

---

## Image Strategy

Two image sources, tracked in `image-manifest.json`:

| Source       | Path                        | Contents                                      |
|--------------|-----------------------------|-----------------------------------------------|
| Original     | `public/images/original/`   | Real photos: hero, logo, team, Google review, YouTube thumbnails |
| Generated    | `public/images/generated/`  | AI-generated: logo, section backgrounds, service tiles, video thumbs |
| Sanity CDN   | `cdn.sanity.io`             | CMS-managed blog hero images & custom video thumbnails (allowed exception) |

**Rules** (from `CLAUDE.md`):
- Prefer original images over generated ones.
- All images in WebP (except logos in PNG for transparency).
- Lazy-load all images except hero and logo.
- Reference via URL paths, not ES module imports.
- No external image CDNs **except `cdn.sanity.io`** (the project's own CMS asset store).

---

## Key Components in Detail

### Nav (`src/components/Nav.jsx`)
Sticky header with scroll-aware background (transparent → white with backdrop blur). Desktop horizontal links + mobile hamburger toggle. CTA button links to external appointment booking.

### LocalSeoLanding (`src/components/LocalSeoLanding.jsx`)
Data-driven template shared by both `/conseiller-financier-*` routes. Each route passes locale-specific `data` (hero copy, SEO tags via `useSeo`, services, service areas, stats). All facts come from approved site content — nothing is invented.

### Contact Form (`src/pages/ContactPage.jsx`)
Fields incl. first/last name, email, phone, subject, investable-assets, and the discussion message. Submits with a reCAPTCHA v3 token (`useRecaptcha`) verified by `POST /api/contact`. Verification works once configured; **message delivery is not yet wired up** (the verified fields are ready to forward).

---

## SEO & Structured Data

- `index.html` includes standard meta, Open Graph/Twitter cards, a canonical URL, and JSON-LD (`@type: FinancialService`) with service types, area served, named employees, and social links.
- Inner pages set their own `<title>`/description/canonical at runtime via `useSeo`, restoring the baked defaults on unmount.
- The `/admin` editor injects `noindex, nofollow`.

---

## Accessibility

- Semantic HTML throughout: `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`.
- Proper heading hierarchy; `aria-label`/`aria-labelledby`/`aria-hidden` where appropriate.
- Visible focus styles; form labels associated with inputs; toolbar buttons in the editor expose `aria-pressed`/`aria-label`.

---

## External Links & Services

| Service              | URL / Notes                                                     |
|----------------------|-----------------------------------------------------------------|
| Appointment Booking  | `https://www.bbfap.com/prendre-rendez-vous` (external system)   |
| Facebook             | `https://www.facebook.com/profile.php?id=61560994705134`        |
| LinkedIn             | `https://www.linkedin.com/company/belanger-brosseau-...`        |
| YouTube              | `https://www.youtube.com/@BelangerBrosseau` (channel `UC0qp3oXbnyHBRsg74-FSikQ`) |
| Sanity CMS           | Studio in `studio/` (project id from `VITE_SANITY_PROJECT_ID`)  |
| reCAPTCHA v3         | Google siteverify (server-side, via `/api/contact`)             |

No third-party analytics or tracking scripts.

---

## Environment Variables

Set in a local `.env` (read by the `.mjs` scripts and Vite) and in Vercel project settings for production.

| Variable                  | Used by                                  | Purpose                                              |
|---------------------------|------------------------------------------|------------------------------------------------------|
| `VITE_SANITY_PROJECT_ID`  | build, client, api                       | Sanity project id (client-exposed via `VITE_` prefix). `REPLACE_WITH_PROJECT_ID` ⇒ treated as unconfigured. |
| `VITE_SANITY_DATASET`     | build, client, api                       | Sanity dataset (default `production`).               |
| `SANITY_API_TOKEN`        | `api/posts`, `api/upload`                | **Server-only** write token. Never `VITE_`-prefixed. |
| `SANITY_WRITE_TOKEN`      | migration scripts                        | Editor-rights token for one-time migrations (delete after). |
| `ADMIN_USERNAME`          | `scripts/lib/adminApi.mjs`               | Editor username (default `fbabeux@peakgroup.com`).   |
| `ADMIN_PASSWORD`          | `scripts/lib/adminApi.mjs`               | **Server-only** shared editor password.              |
| `VERCEL_DEPLOY_HOOK_URL`  | `scripts/lib/adminApi.mjs`               | Deploy hook fired on Publier/delete to rebuild the snapshot. |
| `CAPTCHA_SECRET_KEY`      | `api/contact`                            | **Server-only** reCAPTCHA v3 secret.                 |
| `YOUTUBE_CHANNEL_ID`      | build, `api/videos`                      | Override the default YouTube channel id.             |
| `GEMINI_API_KEY`          | `scripts/generate-service-images.mjs`    | One-off image generation only.                       |

Never prefix a secret with `VITE_` — that exposes it to the browser bundle.

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
| `studio/README.md`          | Sanity Studio setup & usage                                    |
| `*.txt` (root)              | Loose client-meeting transcripts and an API reference — working notes, not part of the build |
