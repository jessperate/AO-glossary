'use client'

import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import glossaryData from '../../data/glossary.json'
import { GlossaryTerm, Category, CATEGORIES } from '@/lib/types'
import { SearchBar } from '@/components/SearchBar'
import { CategoryFilter } from '@/components/CategoryFilter'
import { GlossaryList } from '@/components/GlossaryList'

const terms = glossaryData as GlossaryTerm[]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  )

  const fuse = useMemo(
    () =>
      new Fuse(terms, {
        keys: [
          { name: 'term', weight: 2 },
          { name: 'definition', weight: 1 },
          { name: 'example', weight: 0.5 },
        ],
        threshold: 0.3,
        includeScore: true,
      }),
    []
  )

  const filteredTerms = useMemo(() => {
    let result = terms

    if (searchQuery.trim()) {
      result = fuse.search(searchQuery).map((r) => r.item)
    }

    if (selectedCategory) {
      result = result.filter((term) => term.category === selectedCategory)
    }

    if (!searchQuery.trim() && !selectedCategory) {
      result = [...terms].sort((a, b) => a.term.localeCompare(b.term))
    }

    return result
  }, [searchQuery, selectedCategory, fuse])

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">AirOps Glossary</h1>
        <p className="text-[var(--muted-foreground)]">
          Search and explore AirOps terminology
        </p>
      </div>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <CategoryFilter
        categories={CATEGORIES}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <div className="text-sm text-[var(--muted-foreground)]">
        {filteredTerms.length} {filteredTerms.length === 1 ? 'term' : 'terms'}{' '}
        found
      </div>

      <GlossaryList terms={filteredTerms} />
    </div>
  )
}
