'use client'

import { Category } from '@/lib/types'

interface CategoryFilterProps {
  categories: Category[]
  selected: Category | null
  onSelect: (category: Category | null) => void
}

export function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors font-[family-name:var(--font-mono)] ${
          selected === null
            ? 'bg-[var(--primary)] text-black'
            : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--border)]'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category === selected ? null : category)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors font-[family-name:var(--font-mono)] ${
            selected === category
              ? 'bg-[var(--primary)] text-black'
              : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--border)]'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
