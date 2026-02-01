'use client'

import { GlossaryTerm } from '@/lib/types'
import { GlossaryCard } from './GlossaryCard'

interface GlossaryListProps {
  terms: GlossaryTerm[]
}

export function GlossaryList({ terms }: GlossaryListProps) {
  if (terms.length === 0) {
    return (
      <div className="text-center py-12 text-[var(--muted-foreground)]">
        No terms found. Try a different search or category.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {terms.map((term) => (
        <GlossaryCard key={term.id} term={term} />
      ))}
    </div>
  )
}
