'use client'

import { useState } from 'react'
import { GlossaryTerm } from '@/lib/types'

interface GlossaryCardProps {
  term: GlossaryTerm
}

export function GlossaryCard({ term }: GlossaryCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="border border-[var(--border)] rounded-lg p-4 hover:border-[var(--primary)] transition-colors cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg">{term.term}</h3>
            <span className="px-2 py-0.5 rounded-full text-xs bg-[var(--muted)] text-[var(--muted-foreground)]">
              {term.category}
            </span>
          </div>
          <p className="text-[var(--muted-foreground)]">{term.definition}</p>
        </div>
        <svg
          className={`w-5 h-5 text-[var(--muted-foreground)] transition-transform ${
            expanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-[var(--border)] space-y-3">
          {term.example && (
            <div>
              <h4 className="text-sm font-medium mb-1">Example</h4>
              <p className="text-sm text-[var(--muted-foreground)] bg-[var(--muted)] p-3 rounded-md">
                {term.example}
              </p>
            </div>
          )}
          {term.relatedTerms.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-1">Related Terms</h4>
              <div className="flex flex-wrap gap-1">
                {term.relatedTerms.map((related) => (
                  <span
                    key={related}
                    className="px-2 py-0.5 rounded text-xs bg-[var(--muted)] text-[var(--muted-foreground)]"
                  >
                    {related}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
