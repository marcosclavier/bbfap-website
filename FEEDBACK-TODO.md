# Arthur Feedback — BBFAP Redesign TODO

Feedback from Arthur Lachieze-Rey review session. Items for Marcos to implement.

---

## 1. Logo text: Change "BBF" → "BBFAP"

The logo currently shows "BBF" — it should read "BBFAP".

- **File:** `/images/generated/logo.png`
- **Action:** Regenerate or edit the logo image so it says **BBFAP** instead of BBF.

---

## 2. Consider renaming to "Bélanger Brosseau"

Arthur mentioned the client may want to rebrand from BBFAP to **Bélanger Brosseau** (or similar). He's checking with the client on domain availability and preferred name.

- **Action:** Wait for Arthur's confirmation. If the name changes, update:
  - Logo image
  - All page headings/copy referencing "BBFAP"
  - Nav, Footer, meta tags, structured data in `index.html`
  - Page titles and SEO

---

## 3. Make headings bigger

Arthur asked for all headings — specifically the amber/orange section labels and the main headings — to be **a bit bigger** across the site.

- **Where:** All pages (HomePage, AboutPage, ServicesPage, BlogPage, ContactPage)
- **What to change:**
  - The small amber uppercase labels (currently `text-sm`) → try `text-base`
  - The main section headings (currently `text-3xl sm:text-4xl`) → try `text-4xl sm:text-5xl`
  - Hero H1s (currently `text-4xl sm:text-5xl lg:text-6xl`) → try `text-5xl sm:text-6xl lg:text-7xl`
- **Note:** Arthur said "just my opinion" — use judgment on what looks balanced, but bump them up one size step as a starting point.

---

## 4. Replace placeholder image in About/Trust section

Arthur pointed out one of the images (likely the About/Trust section on the homepage or the About page) needs a **new photo from the client**.

- **Action:** Ask Arthur/client for the replacement photo. Once received, swap it in:
  - `HomePage.jsx` — About/Trust section image (`/images/original/general.webp`)
  - `AboutPage.jsx` — any sections using placeholder general images
- **Current images used:** `general.webp`, `general-1.webp`, `general-2.webp` — confirm which one Arthur flagged.

---

## Summary

| # | Change | Status | Blocking? |
|---|--------|--------|-----------|
| 1 | Logo BBF → BBFAP | DONE — using original logo from bbfap.com | No |
| 2 | Possible rebrand to "Bélanger Brosseau" | Waiting on Arthur | Yes — need confirmation |
| 3 | Bump heading sizes up one step | DONE — labels sm→base, headings 3xl/4xl→4xl/5xl, H3s 2xl/3xl→3xl/4xl | No |
| 4 | Replace placeholder photo | DONE — swapped Google review screenshot with generated team/planning images | No |
