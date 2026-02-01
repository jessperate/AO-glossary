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
    <div className="space-y-6">
      <div className="sticky top-0 z-10 bg-[var(--background)] pb-4 pt-2 -mx-4 px-4 border-b border-[var(--border)]">
        <div className="space-y-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--muted-foreground)]">
              Filter by category
            </label>
            <CategoryFilter
              categories={CATEGORIES}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
        </div>
      </div>

      <div className="text-sm text-[var(--muted-foreground)]">
        {filteredTerms.length} {filteredTerms.length === 1 ? 'term' : 'terms'}{' '}
        found
      </div>

      <GlossaryList terms={filteredTerms} />
    </div>
  )
}
