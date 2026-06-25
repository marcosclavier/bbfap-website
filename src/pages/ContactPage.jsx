import pages from '../data/pages.generated.json';
import PageRenderer from '../components/PageRenderer';
import LegacyContactPage from './legacy/ContactPage';

/*
 * Contact route. Renders from the CMS (`page.contact`) once migrated; otherwise falls back to
 * the legacy hardcoded page. The form itself stays code-wired inside the contactFormSection
 * renderer (reCAPTCHA → /api/contact). See AboutPage.jsx for the per-page cutover pattern.
 */
export default function ContactPage() {
  const page = pages.contact;
  if (page && Array.isArray(page.sections) && page.sections.length > 0) {
    return <PageRenderer sections={page.sections} />;
  }
  return <LegacyContactPage />;
}
