'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GlossaryTerm, Category, CATEGORIES } from '@/lib/types'

interface SidebarProps {
  terms: GlossaryTerm[]
}

export function Sidebar({ terms }: SidebarProps) {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const filteredTerms = terms
    .filter((term) => {
      const matchesSearch = term.term
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || term.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => a.term.localeCompare(b.term))

  const basePath = process.env.NODE_ENV === 'production' ? '/AO-glossary' : ''

  return (
    <aside className="w-72 shrink-0 border-r border-[var(--border)] h-[calc(100vh-73px)] sticky top-[73px] overflow-hidden flex flex-col bg-[var(--background)]">
      <div className="p-4 border-b border-[var(--border)] space-y-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search terms..."
          className="w-full px-3 py-2 text-sm rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
        />
        <select
          value={selectedCategory || ''}
          onChange={(e) => setSelectedCategory(e.target.value as Category || null)}
          className="w-full px-3 py-2 text-sm rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-0.5">
          {filteredTerms.map((term) => {
            const isActive = pathname === `${basePath}/glossary/${term.id}` ||
                           pathname === `/glossary/${term.id}`
            return (
              <li key={term.id}>
                <Link
                  href={`./glossary/${term.id}`}
                  className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                    isActive
                      ? 'bg-[var(--primary)] text-black font-medium'
                      : 'text-[var(--foreground)] hover:bg-[var(--muted)]'
                  }`}
                >
                  {term.term}
                </Link>
              </li>
            )
          })}
        </ul>
        {filteredTerms.length === 0 && (
          <p className="text-sm text-[var(--muted-foreground)] text-center py-4">
            No terms found
          </p>
        )}
      </nav>

      <div className="p-4 border-t border-[var(--border)]">
        <Link
          href="./contribute"
          className="block w-full text-center px-4 py-2 text-sm font-medium bg-[var(--primary)] text-black rounded-md hover:opacity-90 transition-opacity"
        >
          Suggest a Term
        </Link>
      </div>
    </aside>
  )
}
