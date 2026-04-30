import {PortableText} from '@portabletext/react'

const components = {
  block: {
    normal: ({children}) => (
      <p className="text-gray-700 text-lg leading-relaxed">{children}</p>
    ),
    h2: ({children}) => (
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-10 mb-4 leading-tight">
        {children}
      </h2>
    ),
    h3: ({children}) => (
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-3 leading-tight">
        {children}
      </h3>
    ),
    blockquote: ({children}) => (
      <blockquote className="border-l-4 border-amber-400 pl-6 italic text-gray-600 my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}) => (
      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-lg leading-relaxed">
        {children}
      </ul>
    ),
    number: ({children}) => (
      <ol className="list-decimal pl-6 space-y-2 text-gray-700 text-lg leading-relaxed">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
    em: ({children}) => <em className="italic">{children}</em>,
    link: ({value, children}) => {
      const newWindow = value?.newWindow !== false
      return (
        <a
          href={value?.href}
          target={newWindow ? '_blank' : undefined}
          rel={newWindow ? 'noopener noreferrer' : undefined}
          className="text-blue-700 underline hover:text-blue-900"
        >
          {children}
        </a>
      )
    },
  },
}

export default function PortableTextBody({value}) {
  if (!value) return null

  if (Array.isArray(value) && value.every((item) => typeof item === 'string')) {
    return (
      <div className="space-y-6">
        {value.map((paragraph, i) => (
          <p key={i} className="text-gray-700 text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PortableText value={value} components={components} />
    </div>
  )
}
