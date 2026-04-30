# BBFAP Sanity Studio

This folder hosts the Sanity Studio that the client uses to manage blog posts and YouTube videos. It is **separate** from the public website (the Vite app in the repo root) and runs on its own dependencies (React 18 + `sanity` v3).

The Studio is deployed to a stable Sanity-hosted URL (e.g. `https://bbfap.sanity.studio`); the client logs in there, edits content, and clicks Publish. A Sanity webhook notifies Vercel, which rebuilds the public site with the new content.

---

## One-time setup (developer)

1. **Create a Sanity project**:
   - Go to https://sanity.io and sign in with Google.
   - Click "Create new project".
   - Choose a project name (e.g. "BBFAP"), dataset name `production`, and **set the dataset to public**.
   - Copy the **Project ID** (looks like `abcd1234`) — you'll need it twice.

2. **Configure the Studio**:
   ```bash
   cd studio
   echo "SANITY_STUDIO_PROJECT_ID=YOUR_PROJECT_ID" > .env
   echo "SANITY_STUDIO_DATASET=production" >> .env
   npm install
   npm run dev
   ```
   Open http://localhost:3333 and confirm the schema loads (you should see "Article de blogue" and "Vidéo YouTube" in the left sidebar).

3. **Configure the public site**:
   In the repo root, add to `.env`:
   ```
   VITE_SANITY_PROJECT_ID=YOUR_PROJECT_ID
   VITE_SANITY_DATASET=production
   ```

4. **Migrate existing content** (one-time):
   - Generate a write token at https://sanity.io/manage → your project → API → Tokens. Permissions: **Editor**. Copy it.
   - Add to repo-root `.env` (temporarily): `SANITY_WRITE_TOKEN=sk...`
   - From the repo root: `npm run migrate:sanity`
   - This uploads every blog hero image to Sanity, creates 17 `blogPost` documents and 9 `video` documents.
   - **Delete the `SANITY_WRITE_TOKEN` line from `.env`** when done. Revoke the token at sanity.io/manage if you don't need it again.
   - Open the Studio. Each video document has a placeholder for `youtubeUrl` — paste the real YouTube URL for each video.

5. **Deploy the Studio**:
   ```bash
   cd studio
   npm run deploy
   ```
   Pick a hostname when prompted (e.g. `bbfap`). The Studio will be live at `https://bbfap.sanity.studio`.

6. **Invite the client**:
   - In sanity.io/manage → your project → Members → Invite member.
   - Use the role **Editor**. The client receives an email and creates a Sanity account.

7. **Wire up the auto-rebuild**:
   - **In Vercel**: Project Settings → Git → Deploy Hooks → Create a hook (e.g. "Sanity content"). Copy the URL.
   - **In Sanity**: sanity.io/manage → API → Webhooks → Create webhook.
     - URL: paste the Vercel deploy hook
     - Dataset: production
     - Trigger on: Create, Update, Delete
     - Filter (GROQ): `_type == "blogPost" || _type == "video"`
   - Test it: edit a blog post in Studio, click Publish, confirm Vercel builds within 30–60 seconds.

8. **Add Sanity env to Vercel**: Project Settings → Environment Variables:
   - `VITE_SANITY_PROJECT_ID` = your project id
   - `VITE_SANITY_DATASET` = `production`
   Apply to Production, Preview, and Development.

---

## Day-to-day (client)

Bookmark `https://bbfap.sanity.studio` and log in with the email Annie was invited on.

### Add a blog post

1. Click "Article de blogue" → "Create".
2. Fill in: titre, slug (auto-generated from the title), date de publication, temps de lecture, catégorie.
3. Upload an "Image principale" by dragging a file into the field. Add a "Texte alternatif" describing the image.
4. Write the "Extrait" (the short summary shown on the blog list).
5. Compose the article in the "Contenu" field. Use the toolbar for **gras**, *italique*, headings (H2 / H3), bullet/numbered lists, and links.
6. Click **Publish** (top right). The site rebuilds in about a minute.

### Add a YouTube video

1. Click "Vidéo YouTube" → "Create".
2. Paste the YouTube URL into "URL YouTube" (`https://www.youtube.com/watch?v=...`).
3. Fill in titre, durée (mm:ss), description.
4. Optionally upload a "Vignette personnalisée" — if you skip it, YouTube's auto-generated thumbnail is used.
5. Set "Ordre d'affichage" to control where the video appears in the grid (lower = earlier).
6. Toggle "Afficher sur la page d'accueil" if you want the video on the home page (in addition to the blog page).
7. Click **Publish**.

### Edit or delete

Click any document in the list to edit. To delete, open the document → "..." menu (top right) → Delete.

---

## Troubleshooting

- **Edits don't show up on the site after Publish**: Check Vercel deploys (vercel.com). The Sanity webhook should have triggered a build. If the build is missing, verify the webhook + deploy hook are still wired (see step 7 above).
- **Studio shows "Project not found"**: The `SANITY_STUDIO_PROJECT_ID` in `studio/.env` doesn't match the project. Double-check.
- **Images take a long time to upload**: Large images (>5 MB) are slow. Resize to ~2000 px wide before uploading for best performance.
