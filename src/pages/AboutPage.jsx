import pages from '../data/pages.generated.json';
import PageRenderer from '../components/PageRenderer';
import LegacyAboutPage from './legacy/AboutPage';

/*
 * À propos route. Renders from the CMS (`page.about` in pages.generated.json) when that page
 * has been migrated; otherwise falls back to the legacy hardcoded page so the route is never
 * at risk. This per-page cutover lets pages move to the section builder one at a time.
 */
export default function AboutPage() {
  const page = pages.about;
  if (page && Array.isArray(page.sections) && page.sections.length > 0) {
    return <PageRenderer sections={page.sections} />;
  }
  return <LegacyAboutPage />;
}
