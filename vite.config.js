import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load all env vars (no prefix filter) so we can expose the *public* reCAPTCHA
  // site key to the client without renaming the user's CAPTCHA_SITE_KEY var.
  // On Vercel the value comes from process.env; locally from .env.
  const env = loadEnv(mode, process.cwd(), "");
  const captchaSiteKey = process.env.CAPTCHA_SITE_KEY || env.CAPTCHA_SITE_KEY || "";

  return {
    plugins: [react()],
    server: {
      host: true,
    },
    define: {
      // The site key is public by design (it ships in the page). The SECRET key
      // is never referenced here — it stays server-side in api/contact.js.
      "import.meta.env.VITE_CAPTCHA_SITE_KEY": JSON.stringify(captchaSiteKey),
    },
  };
});
