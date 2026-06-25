import { SECTION_RENDERERS } from '../sections/registry';

/*
 * Renders a marketing page from its CMS `sections` array. Each section is dispatched to its
 * renderer via the section registry; unknown types are skipped defensively so a future/unknown
 * section type can never crash a live page.
 */
export default function PageRenderer({ sections = [] }) {
  return (
    <>
      {sections.map((section, i) => {
        const Renderer = SECTION_RENDERERS[section?._type];
        if (!Renderer) return null;
        return <Renderer key={section._key || i} {...section} />;
      })}
    </>
  );
}
