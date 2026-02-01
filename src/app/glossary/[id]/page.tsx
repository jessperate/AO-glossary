import Link from 'next/link'
import { notFound } from 'next/navigation'
import glossaryData from '../../../../data/glossary.json'
import { GlossaryTerm } from '@/lib/types'

const terms = glossaryData as GlossaryTerm[]

export function generateStaticParams() {
  return terms.map((term) => ({
    id: term.id,
  }))
}

export function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  return params.then(({ id }) => {
    const term = terms.find((t) => t.id === id)
    if (!term) return { title: 'Term Not Found' }
    return {
      title: `${term.term} - AirOps Glossary`,
      description: term.definition,
    }
  })
}

export default async function TermPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const term = terms.find((t) => t.id === id)

  if (!term) {
    notFound()
  }

  const relatedTerms = terms.filter((t) =>
    term.relatedTerms.includes(t.id) || term.relatedTerms.includes(t.term.toLowerCase())
  )

  return (
    <article className="max-w-3xl">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-[var(--primary)] text-black rounded-full mb-4">
          {term.category}
        </span>
        <h1 className="text-4xl font-bold mb-4">{term.term}</h1>
        <p className="text-xl text-[var(--muted-foreground)] leading-relaxed">
          {term.definition}
        </p>
      </div>

      {term.example && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Example</h2>
          <div className="bg-[var(--muted)] rounded-lg p-4">
            <p className="text-[var(--foreground)]">{term.example}</p>
          </div>
        </section>
      )}

      {relatedTerms.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Related Terms</h2>
          <div className="flex flex-wrap gap-2">
            {relatedTerms.map((related) => (
              <Link
                key={related.id}
                href={`./${related.id}`}
                className="px-3 py-1.5 text-sm bg-[var(--muted)] text-[var(--foreground)] rounded-md hover:bg-[var(--border)] transition-colors"
              >
                {related.term}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-[var(--border)] pt-8 mt-8">
        <h2 className="text-xl font-semibold mb-4">Other Terms</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {terms
            .filter((t) => t.id !== term.id)
            .slice(0, 9)
            .map((t) => (
              <Link
                key={t.id}
                href={`./${t.id}`}
                className="px-3 py-2 text-sm bg-[var(--muted)] text-[var(--foreground)] rounded-md hover:bg-[var(--border)] transition-colors truncate"
              >
                {t.term}
              </Link>
            ))}
        </div>
      </section>
    </article>
  )
}
