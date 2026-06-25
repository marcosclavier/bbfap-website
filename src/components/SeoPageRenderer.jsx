import { useSeo } from '../hooks/useSeo';
import PageRenderer from './PageRenderer';

/*
 * PageRenderer + per-page SEO meta. Used by the local-SEO landing routes, whose CMS page docs
 * carry a `seo` object ({ title, description, canonical }). useSeo is called unconditionally
 * here (this component is only mounted on the CMS path), so the Rules of Hooks are respected.
 */
export default function SeoPageRenderer({ seo, sections }) {
  useSeo(seo);
  return <PageRenderer sections={sections} />;
}
