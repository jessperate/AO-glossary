import Link from 'next/link'
import glossaryData from '../../data/glossary.json'
import { GlossaryTerm, CATEGORIES } from '@/lib/types'

const terms = glossaryData as GlossaryTerm[]

export default function Home() {
  const termsByCategory = CATEGORIES.map((category) => ({
    category,
    terms: terms.filter((t) => t.category === category).sort((a, b) => a.term.localeCompare(b.term)),
  }))

  return (
    <div className="max-w-3xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">AirOps Glossary</h1>
        <p className="text-xl text-[var(--muted-foreground)]">
          Your guide to understanding AirOps terminology, AI concepts, and workflow automation.
        </p>
      </div>

      <div className="space-y-8">
        {termsByCategory.map(({ category, terms: categoryTerms }) => (
          <section key={category}>
            <h2 className="text-lg font-semibold mb-3 text-[var(--primary)]">
              {category}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {categoryTerms.map((term) => (
                <Link
                  key={term.id}
                  href={`/glossary/${term.id}`}
                  className="px-3 py-2 text-sm bg-[var(--muted)] text-[var(--foreground)] rounded-md hover:bg-[var(--border)] transition-colors"
                >
                  {term.term}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 p-6 bg-[var(--muted)] rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Missing a term?</h2>
        <p className="text-[var(--muted-foreground)] mb-4">
          Help us improve the glossary by suggesting new terms.
        </p>
        <Link
          href="/contribute"
          className="inline-block px-4 py-2 bg-[var(--primary)] text-black font-medium rounded-md hover:opacity-90 transition-opacity"
        >
          Suggest a Term
        </Link>
      </div>
    </div>
  )
}
