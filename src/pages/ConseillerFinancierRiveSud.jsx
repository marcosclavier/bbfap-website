import pages from '../data/pages.generated.json';
import SeoPageRenderer from '../components/SeoPageRenderer';
import LegacyConseillerFinancierRiveSud from './legacy/ConseillerFinancierRiveSud';

/*
 * Rive-Sud landing route. Renders from the CMS (`page.conseiller-rive-sud`) once migrated —
 * including its per-page SEO meta via SeoPageRenderer — otherwise falls back to the legacy page.
 */
export default function ConseillerFinancierRiveSud() {
  const page = pages['conseiller-rive-sud'];
  if (page && Array.isArray(page.sections) && page.sections.length > 0) {
    return <SeoPageRenderer seo={page.seo} sections={page.sections} />;
  }
  return <LegacyConseillerFinancierRiveSud />;
}
