import Link from 'next/link'
import glossaryData from '../../../data/glossary.json'
import { GlossaryTerm, CATEGORIES } from '@/lib/types'

const terms = glossaryData as GlossaryTerm[]

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Core Concepts': 'Foundational ideas every AirOps user should know.',
  'Workflows & Actions': 'How to build, automate, and orchestrate tasks.',
  'Integrations': 'Connecting AirOps to external tools and services.',
  'Data & Variables': 'Working with inputs, outputs, and dynamic data.',
  'AI & Models': 'The language models and AI capabilities behind it all.',
}

const FEATURED_IDS = [
  'prompt',
  'workflow',
  'large-language-model',
  'rag',
  'agent',
  'variable',
]

export default function LandingPage() {
  const termCount = terms.length

  const categoryCounts = CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = terms.filter((t) => t.category === cat).length
    return acc
  }, {})

  const featuredTerms = FEATURED_IDS
    .map((id) => terms.find((t) => t.id === id))
    .filter((t): t is GlossaryTerm => !!t)
    .slice(0, 6)

  return (
    <div>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">

          {/* Eyebrow */}
          <span className="inline-block px-3 py-1 text-xs font-medium bg-[var(--primary)] text-black mb-6 font-[family-name:var(--font-mono)]">
            AirOps
          </span>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] mb-6 font-[family-name:var(--font-serif)]">
            The AI Marketing<br />
            <span className="text-[var(--primary)]">Glossary</span>
          </h1>

          <p className="text-lg sm:text-xl text-[var(--muted-foreground)] max-w-2xl mb-10 leading-relaxed">
            New to content engineering? Been in SEO for a decade? Either way, this glossary has your back.
            Clear definitions, zero jargon about jargon.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-black font-medium text-sm hover:bg-[var(--primary-hover)] transition-colors"
            >
              Browse all {termCount} terms
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contribute"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border)] text-[var(--foreground)] font-medium text-sm hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
            >
              Suggest a term
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────── */}
      <section className="border-b border-[var(--border)] bg-[var(--muted)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 flex flex-wrap gap-x-10 gap-y-3">
          {[
            { value: `${termCount}+`, label: 'Terms defined' },
            { value: `${CATEGORIES.length}`, label: 'Categories' },
            { value: 'Open source', label: 'Community-driven' },
          ].map(({ value, label }) => (
            <div key={label} className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-[family-name:var(--font-serif)]">{value}</span>
              <span className="text-sm text-[var(--muted-foreground)]">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Browse by category ───────────────────────────────────────── */}
      <section className="border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <h2 className="text-2xl sm:text-3xl mb-2 font-[family-name:var(--font-serif)]">Browse by category</h2>
          <p className="text-[var(--muted-foreground)] text-sm mb-8">Pick a topic and dive in.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)]">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/browse?category=${encodeURIComponent(cat)}`}
                className="group bg-[var(--background)] p-6 hover:bg-[#f0fff4] transition-colors border border-transparent hover:border-[var(--primary)] -m-px relative"
              >
                {/* Category pill */}
                <span className="inline-block px-2 py-0.5 text-xs font-medium bg-[var(--muted)] text-[var(--muted-foreground)] mb-3 font-[family-name:var(--font-mono)] group-hover:bg-[var(--primary)] group-hover:text-black transition-colors">
                  {categoryCounts[cat]} terms
                </span>

                <h3 className="font-semibold text-base mb-2 group-hover:text-[var(--primary)] transition-colors">
                  {cat}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {CATEGORY_DESCRIPTIONS[cat]}
                </p>

                {/* Arrow */}
                <span className="mt-4 flex items-center gap-1 text-xs font-medium text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured terms ───────────────────────────────────────────── */}
      <section className="border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <h2 className="text-2xl sm:text-3xl mb-2 font-[family-name:var(--font-serif)]">Start here</h2>
          <p className="text-[var(--muted-foreground)] text-sm mb-8">The terms that come up most often.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)]">
            {featuredTerms.map((term) => (
              <Link
                key={term.id}
                href={`/glossary/${term.id}`}
                className="group bg-[var(--background)] p-6 hover:bg-[#fafafa] transition-colors border border-transparent hover:border-[var(--primary)] -m-px relative"
              >
                {/* Category badge */}
                <span className="inline-block px-2 py-0.5 text-xs font-medium bg-[var(--muted)] text-[var(--muted-foreground)] mb-3 font-[family-name:var(--font-mono)]">
                  {term.category}
                </span>

                <h3 className="font-semibold text-base mb-2 group-hover:text-[var(--primary)] transition-colors">
                  {term.term}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed line-clamp-3">
                  {term.definition.length > 120
                    ? term.definition.substring(0, 120) + '…'
                    : term.definition}
                </p>

                <span className="mt-4 flex items-center gap-1 text-xs font-medium text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                  Read more
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground)] border border-[var(--border)] px-5 py-2.5 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
            >
              View all {termCount} terms
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Design tokens showcase ───────────────────────────────────── */}
      <section className="border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <h2 className="text-2xl sm:text-3xl mb-2 font-[family-name:var(--font-serif)]">Design at a glance</h2>
          <p className="text-[var(--muted-foreground)] text-sm mb-10">The visual language across this glossary.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Typography */}
            <div className="space-y-4">
              <h3 className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-widest font-[family-name:var(--font-mono)]">Typography</h3>
              <div className="space-y-3 border border-[var(--border)] p-5">
                <p className="text-3xl font-[family-name:var(--font-serif)]">Serrif</p>
                <p className="text-base font-[family-name:var(--font-sans)]">Saans — body & UI</p>
                <p className="text-sm font-[family-name:var(--font-mono)]">Saans Mono — labels & code</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-xs font-normal font-[family-name:var(--font-sans)]">Regular</span>
                  <span className="text-xs font-medium font-[family-name:var(--font-sans)]">Medium</span>
                  <span className="text-xs font-semibold font-[family-name:var(--font-sans)]">SemiBold</span>
                  <span className="text-xs font-bold font-[family-name:var(--font-sans)]">Bold</span>
                </div>
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-4">
              <h3 className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-widest font-[family-name:var(--font-mono)]">Colors</h3>
              <div className="border border-[var(--border)] p-5 space-y-2">
                {[
                  { swatch: 'bg-[#00FF64]', label: '#00FF64', name: 'Primary' },
                  { swatch: 'bg-[#00cc50]', label: '#00CC50', name: 'Primary hover' },
                  { swatch: 'bg-black', label: '#000000', name: 'Foreground' },
                  { swatch: 'bg-[#333333]', label: '#333333', name: 'Muted text' },
                  { swatch: 'bg-[#f5f5f5] border border-[var(--border)]', label: '#F5F5F5', name: 'Muted bg' },
                  { swatch: 'bg-[#e5e5e5]', label: '#E5E5E5', name: 'Border' },
                ].map(({ swatch, label, name }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className={`w-6 h-6 shrink-0 ${swatch}`} />
                    <div className="min-w-0">
                      <p className="text-xs font-medium leading-none mb-0.5">{name}</p>
                      <p className="text-xs text-[var(--muted-foreground)] font-[family-name:var(--font-mono)]">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Components */}
            <div className="space-y-4">
              <h3 className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-widest font-[family-name:var(--font-mono)]">Components</h3>
              <div className="border border-[var(--border)] p-5 space-y-4">

                {/* Buttons */}
                <div className="space-y-2">
                  <p className="text-xs text-[var(--muted-foreground)]">Buttons</p>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-2 text-xs font-medium bg-[var(--primary)] text-black hover:bg-[var(--primary-hover)] transition-colors">
                      Primary
                    </button>
                    <button className="px-4 py-2 text-xs font-medium border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
                      Secondary
                    </button>
                  </div>
                </div>

                {/* Pills / badges */}
                <div className="space-y-2">
                  <p className="text-xs text-[var(--muted-foreground)]">Badges</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 text-xs font-medium bg-[var(--primary)] text-black font-[family-name:var(--font-mono)]">
                      AI &amp; Models
                    </span>
                    <span className="px-2.5 py-1 text-xs font-medium bg-[var(--muted)] text-[var(--muted-foreground)] font-[family-name:var(--font-mono)]">
                      Core Concepts
                    </span>
                  </div>
                </div>

                {/* Input */}
                <div className="space-y-2">
                  <p className="text-xs text-[var(--muted-foreground)]">Input</p>
                  <input
                    type="text"
                    placeholder="Search terms..."
                    readOnly
                    className="w-full px-3 py-2 text-xs border border-[var(--border)] bg-[var(--background)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  />
                </div>

                {/* Metaphor card */}
                <div className="space-y-2">
                  <p className="text-xs text-[var(--muted-foreground)]">Metaphor block</p>
                  <div className="p-3 bg-[#f0fff4] border border-[var(--primary)]">
                    <p className="text-xs font-medium text-[var(--primary)] mb-1 font-[family-name:var(--font-mono)]">Think of it this way</p>
                    <p className="text-xs italic text-[var(--foreground)]">&ldquo;Like a recipe for your AI.&rdquo;</p>
                  </div>
                </div>

                {/* Example block */}
                <div className="space-y-2">
                  <p className="text-xs text-[var(--muted-foreground)]">Example block</p>
                  <div className="p-3 bg-[var(--muted)] border-l-4 border-[var(--primary)]">
                    <p className="text-xs font-medium text-[var(--muted-foreground)] mb-1">Example</p>
                    <p className="text-xs text-[var(--foreground)]">A marketer uses RAG to answer questions about their brand.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl mb-2 font-[family-name:var(--font-serif)]">Know something we don&apos;t?</h2>
            <p className="text-[var(--muted-foreground)] text-sm">
              This glossary grows with the community. Submit a term and we&apos;ll review it.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/contribute"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-black font-medium text-sm hover:bg-[var(--primary-hover)] transition-colors whitespace-nowrap"
            >
              Suggest a term
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border)] text-[var(--foreground)] font-medium text-sm hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors whitespace-nowrap"
            >
              Browse the glossary
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
