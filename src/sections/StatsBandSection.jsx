/* Navy stats band: 4 value/label cards on a brand-blue background.
   Covers the stats band on the local-SEO landing pages. */
export default function StatsBandSection({ stats = [], srHeading = 'Notre impact en chiffres' }) {
  return (
    <section className="py-20 bg-[#16508C]" aria-label={srHeading}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="sr-only">{srHeading}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={s._key || i} className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-4xl sm:text-5xl font-bold text-amber-400 mb-2">{s.value}</div>
              <div className="text-blue-200 text-sm leading-relaxed">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
