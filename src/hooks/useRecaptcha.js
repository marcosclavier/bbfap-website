import { useEffect, useCallback } from 'react';

// Loads Google reCAPTCHA v3 once and caches the ready `grecaptcha` instance.
let scriptPromise = null;
function loadRecaptcha(siteKey) {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    if (window.grecaptcha?.execute) {
      window.grecaptcha.ready(() => resolve(window.grecaptcha));
      return;
    }
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => window.grecaptcha.ready(() => resolve(window.grecaptcha));
    script.onerror = () => {
      scriptPromise = null; // allow a later retry
      reject(new Error('reCAPTCHA failed to load'));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

/**
 * reCAPTCHA v3 hook. Preloads the script on mount and returns an `execute`
 * function that resolves to a fresh token for the given action. Returns null
 * when no site key is configured so the caller can degrade gracefully.
 */
export function useRecaptcha(siteKey) {
  useEffect(() => {
    if (siteKey) loadRecaptcha(siteKey).catch(() => {});
  }, [siteKey]);

  return useCallback(
    async (action = 'submit') => {
      if (!siteKey) return null;
      const grecaptcha = await loadRecaptcha(siteKey);
      return grecaptcha.execute(siteKey, { action });
    },
    [siteKey],
  );
}
