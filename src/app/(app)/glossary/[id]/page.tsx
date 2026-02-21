import Link from 'next/link'
import { notFound } from 'next/navigation'
import glossaryData from '../../../../../data/glossary.json'
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
      <div className="mb-6 sm:mb-8">
        <span className="inline-block px-2.5 sm:px-3 py-1 text-xs font-medium bg-[var(--primary)] text-black rounded-full mb-3 sm:mb-4 font-[family-name:var(--font-mono)]">
          {term.category}
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 font-[family-name:var(--font-serif)]">What is {term.term}?</h1>
        <p className="text-base sm:text-lg lg:text-xl text-[var(--muted-foreground)] leading-relaxed">
          {term.definition}
        </p>
      </div>

      {/* Metaphor */}
      {term.metaphor && (
        <section className="mb-8 sm:mb-10 p-4 sm:p-5 bg-[#f0fff4] rounded-lg border border-[var(--primary)]">
          <p className="text-xs sm:text-sm font-medium text-[var(--primary)] mb-2 font-[family-name:var(--font-mono)]">Think of it this way</p>
          <p className="text-sm sm:text-base text-[var(--foreground)] italic">&quot;{term.metaphor}&quot;</p>
        </section>
      )}

      {/* Example */}
      {term.example && (
        <section className="mb-8 sm:mb-10 p-3 sm:p-4 bg-[var(--muted)] rounded-lg border-l-4 border-[var(--primary)]">
          <p className="text-xs sm:text-sm font-medium text-[var(--muted-foreground)] mb-1">Example</p>
          <p className="text-sm sm:text-base text-[var(--foreground)]">{term.example}</p>
        </section>
      )}

      {/* Marketer Use Cases */}
      {article?.marketerUseCases && article.marketerUseCases.length > 0 && (
        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Marketer Use Cases</h2>
          <div className="space-y-3">
            {article.marketerUseCases.map((useCase, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[var(--primary)] text-black flex items-center justify-center text-xs sm:text-sm font-medium shrink-0">
                  {index + 1}
                </div>
                <p className="text-sm sm:text-base text-[var(--muted-foreground)]">{useCase}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Key Concepts */}
      {article?.keyConcepts && article.keyConcepts.length > 0 && (
        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Key Concepts</h2>
          <div className="space-y-3 sm:space-y-4">
            {article.keyConcepts.map((concept, index) => (
              <div key={index} className="border-b border-[var(--border)] pb-3 sm:pb-4 last:border-0">
                <h3 className="font-semibold text-[var(--primary)] mb-1 text-sm sm:text-base">{concept.title}</h3>
                <p className="text-sm sm:text-base text-[var(--muted-foreground)]">{concept.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Benefits */}
      {article?.benefits && article.benefits.length > 0 && (
        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Benefits</h2>
          <ul className="space-y-2">
            {article.benefits.map((benefit, index) => (
              <li key={index} className="flex gap-2">
                <span className="text-[var(--primary)] mt-0.5 sm:mt-1">•</span>
                <span className="text-sm sm:text-base text-[var(--muted-foreground)]">{benefit}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Comparison */}
      {article?.comparison && (
        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">{term.term} vs {article.comparison.term}</h2>
          <div className="bg-[var(--muted)] rounded-lg p-3 sm:p-4">
            <p className="text-sm sm:text-base text-[var(--muted-foreground)]">{article.comparison.description}</p>
          </div>
        </section>
      )}

      {/* Tools & Technologies */}
      {article?.tools && article.tools.length > 0 && (
        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Tools & Technologies</h2>
          <div className="grid gap-3">
            {article.tools.map((tool, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-1.5 sm:mt-2 shrink-0"></div>
                <div className="text-sm sm:text-base">
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
        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Challenges & Solutions</h2>
          <div className="space-y-3 sm:space-y-4">
            {article.challenges.map((item, index) => (
              <div key={index} className="border border-[var(--border)] rounded-lg p-3 sm:p-4">
                <p className="font-medium text-[var(--foreground)] mb-2 text-sm sm:text-base">
                  <span className="text-red-500">Challenge:</span> {item.challenge}
                </p>
                <p className="text-sm sm:text-base text-[var(--muted-foreground)]">
                  <span className="text-[var(--primary)] font-medium">Solution:</span> {item.solution}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {article?.faq && article.faq.length > 0 && (
        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3 sm:space-y-4">
            {article.faq.map((item, index) => (
              <div key={index} className="border-b border-[var(--border)] pb-3 sm:pb-4 last:border-0">
                <h3 className="font-semibold mb-2 text-sm sm:text-base">{item.question}</h3>
                <p className="text-sm sm:text-base text-[var(--muted-foreground)]">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Terms */}
      {relatedTerms.length > 0 && (
        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Related Terms</h2>
          <div className="flex flex-wrap gap-2">
            {relatedTerms.map((related) => (
              <Link
                key={related.id}
                href={`/glossary/${related.id}`}
                className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-[var(--muted)] text-[var(--foreground)] rounded-md hover:bg-[var(--border)] transition-colors"
              >
                {related.term}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Other Terms */}
      <section className="border-t border-[var(--border)] pt-6 sm:pt-8 mt-6 sm:mt-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Explore More Terms</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {terms
            .filter((t) => t.id !== term.id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 9)
            .map((t) => (
              <Link
                key={t.id}
                href={`/glossary/${t.id}`}
                className="px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-[var(--muted)] text-[var(--foreground)] rounded-md hover:bg-[var(--border)] transition-colors truncate"
              >
                {t.term}
              </Link>
            ))}
        </div>
      </section>
    </article>
  )
}
