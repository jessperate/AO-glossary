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

  const article = term.article

  return (
    <article className="max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-[var(--primary)] text-black rounded-full mb-4 font-[family-name:var(--font-mono)]">
          {term.category}
        </span>
        <h1 className="text-4xl font-bold mb-4">What is {term.term}?</h1>
        <p className="text-xl text-[var(--muted-foreground)] leading-relaxed">
          {term.definition}
        </p>
      </div>

      {/* Example */}
      {term.example && (
        <section className="mb-10 p-4 bg-[var(--muted)] rounded-lg border-l-4 border-[var(--primary)]">
          <p className="text-sm font-medium text-[var(--muted-foreground)] mb-1">Example</p>
          <p className="text-[var(--foreground)]">{term.example}</p>
        </section>
      )}

      {/* Key Concepts */}
      {article?.keyConcepts && article.keyConcepts.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Key Concepts</h2>
          <div className="space-y-4">
            {article.keyConcepts.map((concept, index) => (
              <div key={index} className="border-b border-[var(--border)] pb-4 last:border-0">
                <h3 className="font-semibold text-[var(--primary)] mb-1">{concept.title}</h3>
                <p className="text-[var(--muted-foreground)]">{concept.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Benefits */}
      {article?.benefits && article.benefits.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
          <ul className="space-y-2">
            {article.benefits.map((benefit, index) => (
              <li key={index} className="flex gap-2">
                <span className="text-[var(--primary)] mt-1">•</span>
                <span className="text-[var(--muted-foreground)]">{benefit}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Comparison */}
      {article?.comparison && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{term.term} vs {article.comparison.term}</h2>
          <div className="bg-[var(--muted)] rounded-lg p-4">
            <p className="text-[var(--muted-foreground)]">{article.comparison.description}</p>
          </div>
        </section>
      )}

      {/* Tools & Technologies */}
      {article?.tools && article.tools.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Tools & Technologies</h2>
          <div className="grid gap-3">
            {article.tools.map((tool, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 shrink-0"></div>
                <div>
                  <span className="font-medium">{tool.name}</span>
                  <span className="text-[var(--muted-foreground)]"> — {tool.description}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Challenges & Solutions */}
      {article?.challenges && article.challenges.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Challenges & Solutions</h2>
          <div className="space-y-4">
            {article.challenges.map((item, index) => (
              <div key={index} className="border border-[var(--border)] rounded-lg p-4">
                <p className="font-medium text-[var(--foreground)] mb-2">
                  <span className="text-red-500">Challenge:</span> {item.challenge}
                </p>
                <p className="text-[var(--muted-foreground)]">
                  <span className="text-[var(--primary)] font-medium">Solution:</span> {item.solution}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {article?.faq && article.faq.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {article.faq.map((item, index) => (
              <div key={index} className="border-b border-[var(--border)] pb-4 last:border-0">
                <h3 className="font-semibold mb-2">{item.question}</h3>
                <p className="text-[var(--muted-foreground)]">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Terms */}
      {relatedTerms.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Related Terms</h2>
          <div className="flex flex-wrap gap-2">
            {relatedTerms.map((related) => (
              <Link
                key={related.id}
                href={`/glossary/${related.id}`}
                className="px-3 py-1.5 text-sm bg-[var(--muted)] text-[var(--foreground)] rounded-md hover:bg-[var(--border)] transition-colors"
              >
                {related.term}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Other Terms */}
      <section className="border-t border-[var(--border)] pt-8 mt-8">
        <h2 className="text-xl font-semibold mb-4">Explore More Terms</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {terms
            .filter((t) => t.id !== term.id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 9)
            .map((t) => (
              <Link
                key={t.id}
                href={`/glossary/${t.id}`}
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
