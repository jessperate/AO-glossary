'use client'

import { useState, useEffect } from 'react'
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
  const [isOpen, setIsOpen] = useState(false)

  // Close sidebar when route changes (mobile)
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const filteredTerms = terms
    .filter((term) => {
      const matchesSearch = term.term
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || term.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => a.term.localeCompare(b.term))

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 w-14 h-14 bg-[var(--primary)] text-black rounded-full shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-72 shrink-0 border-r border-[var(--border)] bg-[var(--background)] sticky top-[73px] h-[calc(100vh-73px)]">
        <div className="p-4 border-b border-[var(--border)] space-y-3 shrink-0">
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

        <nav className="flex-1 overflow-y-auto p-2 min-h-0">
          <ul className="space-y-0.5">
            {filteredTerms.map((term) => {
              const isActive = pathname?.endsWith(`/glossary/${term.id}`)
              return (
                <li key={term.id}>
                  <Link
                    href={`/glossary/${term.id}`}
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

        <div className="p-4 border-t border-[var(--border)] shrink-0">
          <Link
            href="/contribute"
            className="block w-full text-center px-4 py-2 text-sm font-medium bg-[var(--primary)] text-black rounded-md hover:opacity-90 transition-opacity"
          >
            Suggest a Term
          </Link>
        </div>
      </aside>

      {/* Sidebar - Mobile */}
      <aside className={`
        lg:hidden fixed inset-y-0 left-0 z-40 w-72 bg-[var(--background)] border-r border-[var(--border)]
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Mobile header */}
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between shrink-0">
          <span className="font-semibold">Browse Terms</span>
          <button onClick={() => setIsOpen(false)} className="p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 border-b border-[var(--border)] space-y-3 shrink-0">
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

        <nav className="flex-1 overflow-y-auto p-2 min-h-0">
          <ul className="space-y-0.5">
            {filteredTerms.map((term) => {
              const isActive = pathname?.endsWith(`/glossary/${term.id}`)
              return (
                <li key={term.id}>
                  <Link
                    href={`/glossary/${term.id}`}
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

        <div className="p-4 border-t border-[var(--border)] shrink-0">
          <Link
            href="/contribute"
            className="block w-full text-center px-4 py-2 text-sm font-medium bg-[var(--primary)] text-black rounded-md hover:opacity-90 transition-opacity"
          >
            Suggest a Term
          </Link>
        </div>
      </aside>
    </>
  )
}
