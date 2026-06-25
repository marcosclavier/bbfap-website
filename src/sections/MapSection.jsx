/* Embedded map (Google Maps iframe). Covers the "Nous trouver" section on the Contact page. */
export default function MapSection({
  heading,
  embedUrl,
  iframeTitle = 'Carte',
  background = 'gray',
}) {
  const bg = background === 'white' ? 'bg-white' : 'bg-gray-50';
  if (!embedUrl) return null;

  return (
    <section className={`py-12 ${bg}`} aria-label={heading || undefined}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {heading && (
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">{heading}</h2>
        )}
        <div className="w-full h-[400px] rounded-3xl overflow-hidden shadow-lg border border-gray-200">
          <iframe
            title={iframeTitle}
            src={embedUrl}
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
