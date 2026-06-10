/**
 * POST /api/contact
 *
 * Verifies a Google reCAPTCHA v3 token server-side using the secret key, then
 * accepts the contact-form submission. Keeping verification on the server is the
 * whole point of reCAPTCHA: the secret key must never reach the browser.
 *
 * Env: CAPTCHA_SECRET_KEY (set in .env locally / Vercel project settings in prod).
 *
 * Note: actual delivery of the message (email / CRM / Formspree) is not wired up
 * here — once verification passes, the validated fields are available on `body`
 * and can be forwarded wherever you want them to land.
 */

// reCAPTCHA v3 returns a 0.0–1.0 score (1.0 = very likely human). 0.5 is
// Google's suggested default threshold for accept/reject.
const MIN_SCORE = 0.5;
const EXPECTED_ACTION = 'contact';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const secret = process.env.CAPTCHA_SECRET_KEY;
  if (!secret) {
    console.error('[api/contact] CAPTCHA_SECRET_KEY is not configured');
    return res.status(500).json({ ok: false, error: 'captcha_not_configured' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const token = body?.captchaToken;
  if (!token) {
    return res.status(400).json({ ok: false, error: 'missing_captcha' });
  }

  try {
    const params = new URLSearchParams({ secret, response: token });
    const forwarded = req.headers['x-forwarded-for'];
    const ip = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0]?.trim();
    if (ip) params.append('remoteip', ip);

    const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
    const verify = await verifyRes.json();

    const scoreOk = typeof verify.score !== 'number' || verify.score >= MIN_SCORE;
    const actionOk = !verify.action || verify.action === EXPECTED_ACTION;

    if (!verify.success || !scoreOk || !actionOk) {
      console.warn('[api/contact] captcha rejected:', {
        success: verify.success,
        score: verify.score,
        action: verify.action,
        codes: verify['error-codes'],
      });
      return res.status(400).json({ ok: false, error: 'captcha_failed' });
    }

    // Verified human. `body` holds the validated contact fields
    // (prenom, nom, email, telephone, sujet, actifsInvestissables, discussion).
    // Wire up delivery (email / CRM) here when ready.

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[api/contact] verification error:', err.message);
    return res.status(502).json({ ok: false, error: 'verification_error' });
  }
}
