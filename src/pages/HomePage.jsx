import pages from '../data/pages.generated.json';
import PageRenderer from '../components/PageRenderer';
import LegacyHomePage from './legacy/HomePage';

/*
 * Home route. Renders from the CMS (`page.home`) once migrated; otherwise falls back to the
 * legacy hardcoded page. See AboutPage.jsx for the per-page cutover pattern.
 */
export default function HomePage() {
  const page = pages.home;
  if (page && Array.isArray(page.sections) && page.sections.length > 0) {
    return <PageRenderer sections={page.sections} />;
  }
  return <LegacyHomePage />;
}
