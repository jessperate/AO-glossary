'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import glossaryData from '../../data/glossary.json'
import { GlossaryTerm } from '@/lib/types'

const terms = glossaryData as GlossaryTerm[]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTerms = useMemo(() => {
    const sorted = [...terms].sort((a, b) => a.term.localeCompare(b.term))
    if (!searchQuery.trim()) return sorted
    return sorted.filter(
      (term) =>
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4 font-[family-name:var(--font-serif)]">Glossary</h1>
        <p className="text-base sm:text-lg text-[var(--muted-foreground)]">
          New to content engineering? Been in SEO for a decade? Either way, this glossary has your back. Clear definitions, zero jargon about jargon.
        </p>
      </div>

      {/* Search and Count */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6">
        <div className="relative flex-1 sm:flex-none">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full sm:w-64 px-4 py-3 pr-10 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          />
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <span className="text-[var(--foreground)] font-medium text-sm sm:text-base">
          {filteredTerms.length} items
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--border)] mb-6 sm:mb-8"></div>

      {/* Terms List */}
      <div className="space-y-3 sm:space-y-4">
        {filteredTerms.map((term) => (
          <Link
            key={term.id}
            href={`/glossary/${term.id}`}
            className="block group"
          >
            <div className="border border-[var(--border)] rounded-lg p-4 sm:p-6 transition-all hover:border-[var(--primary)] hover:border-l-4 hover:border-l-[var(--primary)] bg-white hover:bg-[#fafafa]">
              <h2 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-[var(--primary)] transition-colors">
                {term.term}
              </h2>
              <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
                {term.definition.length > 150
                  ? term.definition.substring(0, 150) + '...'
                  : term.definition}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center py-12 text-[var(--muted-foreground)]">
          No terms found matching &quot;{searchQuery}&quot;
        </div>
      )}
    </div>
  )
}
