import pages from '../data/pages.generated.json';
import PageRenderer from '../components/PageRenderer';
import LegacyServicesPage from './legacy/ServicesPage';

/*
 * Services route. Renders from the CMS (`page.services`) once migrated; otherwise falls back
 * to the legacy hardcoded page. See AboutPage.jsx for the per-page cutover pattern.
 */
export default function ServicesPage() {
  const page = pages.services;
  if (page && Array.isArray(page.sections) && page.sections.length > 0) {
    return <PageRenderer sections={page.sections} />;
  }
  return <LegacyServicesPage />;
}
