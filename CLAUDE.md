# PureStudio Redesign Workspace

## Project Context
You are redesigning a website for a small business. The content brief is at
`./content-brief.json`. It contains scraped content from multiple pages of their
current website. Use this data as the foundation. Never invent specific facts
(addresses, phone numbers, names) not present in the brief.

## Tech Stack
- React 18 + Vite
- Tailwind CSS v4
- Static site (no server-side rendering needed)
- Target: Vercel deployment

## Design Requirements
- Mobile-first, fully responsive
- Lighthouse scores: Performance >= 90, SEO >= 90, Accessibility >= 90
- Fast load times: < 1.5s on 3G
- All images optimized as WebP, lazy-loaded
- Semantic HTML with proper heading hierarchy
- Include all content from the content brief — do not omit sections
- **The site MUST have at least 6 distinct, content-rich sections**
- Use a modern, visually polished design with generous whitespace
- Add smooth scroll navigation and subtle scroll animations

## Quality Bar
A good redesign should look like a professionally designed website that would
cost $2,000–$5,000 to build. It should NOT look like a basic template or a
barebones single-section landing page. Every section should have real content,
relevant imagery, and thoughtful layout.

## Image Strategy
- Check for `image-manifest.json` in the workspace root. It lists two pools of images:
  1. **`original_images`** — real photos from the business's existing website.
     These are in `public/images/original/` and should be **preferred** over generated
     images because they show the actual business, team, and work.
  2. **`generated_images`** — AI-generated images created to fill gaps.
     These are in `public/images/generated/` and should only be used for sections
     where no original image with a matching `purpose` exists.
- **Priority order:** original image → generated image → CSS gradient/SVG fallback.
  Always check the manifest's `original_images` array first.
- The `logo_source` field in the manifest tells you where the logo comes from:
  `"original"`, `"generated"`, or `"none"`. Use it accordingly.
- Map the `purpose` field to site sections: `logo` → header/nav, `hero` → hero
  section, `section-services` → services, `section-about` → about, etc.
- Reference images by their `filename` field (e.g. `/images/original/hero.webp`,
  `/images/generated/section-contact.webp`). Vite serves `public/` at the root path.
- Do NOT import images as ES modules — use the URL path directly in `src` attributes.
- Logo files have transparent backgrounds (PNG with alpha) — use directly.
- You may reuse an image in multiple sections if needed.
- **Do NOT use external image URLs** (Unsplash, Pexels, stock photo CDNs, etc.)
  External URLs break when services change. Only use local images from `public/`.
- For sections without a matching image in either pool, use CSS gradients, SVG icons,
  or decorative backgrounds instead of external image URLs.
- Every major section should have a relevant image or visual element.
- Hero section should have a striking full-width image.
- A `public/favicon.png` (32x32) is auto-generated from the logo. The scaffold
  `index.html` already has `<link rel="icon" href="/favicon.png">`. Do NOT remove it.

## Constraints
- Do NOT use external fonts (use system font stack for speed)
- Do NOT add analytics or tracking scripts
- Do NOT fabricate specific testimonials, services, or contact info not in brief
- You MAY create "Why Choose Us", "Our Approach", or similar sections using
  information reasonably derived from the business description and services
- Do NOT run any shell commands other than: npm, npx, node, vite, tsc


## Niche-Specific Guidelines: General Small Business

### Design Tone
- Professional, clean, modern
- Approachable and trustworthy
- Let the content brief guide the specific tone

### Color Palette Suggestions
- Use colors from the content brief if available
- Default: Blue primary (trust), dark gray text, white backgrounds
- Accent: Complementary warm color for CTAs

### Key Sections (Priority Order)
1. **Hero** — Business name, tagline, primary CTA
2. **Services / Products** — Grid layout with icons or images
3. **About** — Business story, team, values
4. **Testimonials** — Customer reviews with attribution
5. **Contact** — Phone, email, address, hours, contact form CTA

### Image Strategy
- Check `image-manifest.json` — prefer **original images** (`public/images/original/`) over generated ones
- Only fall back to AI-generated images (`public/images/generated/`) for sections with no original
- Do NOT use external image URLs (Unsplash, etc.) — use only local images from `public/`
- Avoid: overly generic stock photos

### CTA Best Practices
- Primary CTA: "Contact Us", "Get Started", or "Request a Quote"
- Phone number and email visible in header and footer
- Include a clear call-to-action in the hero section
