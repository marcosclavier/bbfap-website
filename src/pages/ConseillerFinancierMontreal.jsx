import pages from '../data/pages.generated.json';
import SeoPageRenderer from '../components/SeoPageRenderer';
import LegacyConseillerFinancierMontreal from './legacy/ConseillerFinancierMontreal';

/*
 * Montréal landing route. Renders from the CMS (`page.conseiller-montreal`) once migrated —
 * including its per-page SEO meta via SeoPageRenderer — otherwise falls back to the legacy page.
 */
export default function ConseillerFinancierMontreal() {
  const page = pages['conseiller-montreal'];
  if (page && Array.isArray(page.sections) && page.sections.length > 0) {
    return <SeoPageRenderer seo={page.seo} sections={page.sections} />;
  }
  return <LegacyConseillerFinancierMontreal />;
}
