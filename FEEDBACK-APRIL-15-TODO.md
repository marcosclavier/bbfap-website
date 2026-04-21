# Feedback Action Items — April 15, 2026

Source: `feedback-april-15.txt` (call between Arthur Lachieze-Rey and Marcos Clavier).

Overall tone: Arthur is very happy with the site. Sections 1, 2, 3 are "perfect" and he plans to present it to the client as-is. The items below are the only requested changes.

---

## 1. Services page — reduce gradient opacity on background — **DONE**

- **Where:** `src/pages/ServicesPage.jsx` (services hero overlays).
- **Change:** Dialed back the two stacked overlays from `/95`+`/85` and solid→`/40` down to `/75`+`/55` and `/65`→`/15`. Image underneath now reads through while headings remain legible on test build.
- **Context:** Commit `3e0b9c8` had recently *strengthened* this gradient; this partially reverses that. Worth eyeballing in the browser to confirm text contrast holds.

## 2. Replace service-section pictures (fiscalité / assurances / placements) — **DONE**

- **Where:** Three image blocks on `ServicesPage.jsx`.
- **Change:** Generated three cohesive editorial flat-lays via Gemini 2.5 Flash Image (script at `scripts/generate-service-images.mjs`, uses `GEMINI_API_KEY` from `.env`). Saved to `public/images/generated/`:
  - `service-fiscalite.webp` — calculator + tax documents + coins + coffee on warm wood
  - `service-assurances.webp` — paper-cut family silhouette inside a glowing translucent shield + brass key
  - `service-placements.webp` — tablet with upward navy/amber chart + succulent + notebook + coffee
- **Style:** Cohesive set — same warm wood surface, golden window light, muted navy/amber palette. Re-run the script if Arthur wants variants.
- **Note:** Fiscalité image has faint gibberish text on the documents (Gemini didn't fully honor "no text"). Blurry and well covered by the color overlay — acceptable at thumbnail size, but worth a second look in browser.

## 3. Add a "6th option" / catch-all entry under the clientèle list — **DONE**

- **Where:** Clientèle grid on `ServicesPage.jsx` (the 5-item list that starts with "Entrepreneurs incorporés").
- **Change:** Added a 6th item spanning both columns, styled in amber to stand out softly, wording: *"Et bien d'autres — contactez-nous pour en savoir plus"*, linked to `/contact` with an arrow icon that nudges on hover.

---

## Not changes (confirmations only)

- Sections 1, 2, 3: "perfect."
- The "knowledgeable" section: good.
- One later section Arthur flagged as "this one was good" and "this is nice / perfect."

## Next step per Arthur

> "Let me know when you have time to do this, and then I can let you know that the version 2 is ready."

Once the three items above are shipped, ping Arthur so he can trigger the v2 review from the client side.
