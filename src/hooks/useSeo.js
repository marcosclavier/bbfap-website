import { useEffect } from 'react';

/**
 * Lightweight, dependency-free per-page SEO for this client-rendered SPA.
 * Sets document.title, the meta description, and the canonical link on mount,
 * then restores the previous values on unmount so navigating away (e.g. back to
 * the home page baked into index.html) doesn't leave stale tags behind.
 */
export function useSeo({ title, description, canonical }) {
  useEffect(() => {
    const restorers = [];

    if (title) {
      const prev = document.title;
      document.title = title;
      restorers.push(() => { document.title = prev; });
    }

    const upsertMeta = (name, content) => {
      if (!content) return;
      let el = document.head.querySelector(`meta[name="${name}"]`);
      if (el) {
        const prev = el.getAttribute('content');
        el.setAttribute('content', content);
        restorers.push(() => el.setAttribute('content', prev ?? ''));
      } else {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        el.setAttribute('content', content);
        document.head.appendChild(el);
        restorers.push(() => el.remove());
      }
    };

    const upsertLink = (rel, href) => {
      if (!href) return;
      let el = document.head.querySelector(`link[rel="${rel}"]`);
      if (el) {
        const prev = el.getAttribute('href');
        el.setAttribute('href', href);
        restorers.push(() => el.setAttribute('href', prev ?? ''));
      } else {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        el.setAttribute('href', href);
        document.head.appendChild(el);
        restorers.push(() => el.remove());
      }
    };

    upsertMeta('description', description);
    upsertLink('canonical', canonical);

    return () => {
      // Restore in reverse so the original document state is recovered cleanly.
      for (let i = restorers.length - 1; i >= 0; i--) restorers[i]();
    };
  }, [title, description, canonical]);
}
