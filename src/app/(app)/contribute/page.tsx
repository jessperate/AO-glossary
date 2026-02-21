'use client'

import { useState } from 'react'
import { CATEGORIES, Category } from '@/lib/types'

const GITHUB_REPO = 'jessperate/AO-glossary'

export default function ContributePage() {
  const [term, setTerm] = useState('')
  const [definition, setDefinition] = useState('')
  const [category, setCategory] = useState<Category>('Core Concepts')
  const [example, setExample] = useState('')
  const [relatedTerms, setRelatedTerms] = useState('')

  const generateIssueUrl = () => {
    const title = encodeURIComponent(`[New Term] ${term}`)
    const body = encodeURIComponent(
      `## New Glossary Term Suggestion

**Term:** ${term}

**Category:** ${category}

**Definition:**
${definition}

**Example (optional):**
${example || 'N/A'}

**Related Terms (optional):**
${relatedTerms || 'N/A'}

---
*Submitted via the AirOps Glossary contribution form*`
    )

    return `https://github.com/${GITHUB_REPO}/issues/new?title=${title}&body=${body}&labels=new-term`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!term.trim() || !definition.trim()) {
      alert('Please fill in the term and definition fields.')
      return
    }
    window.open(generateIssueUrl(), '_blank')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Suggest a New Term</h1>
        <p className="text-[var(--muted-foreground)]">
          Help expand the AirOps Glossary by suggesting new terms. Your
          submission will create a GitHub issue for review.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="term" className="block text-sm font-medium mb-2">
            Term <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="term"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="e.g., Vector Database"
            required
            className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="definition"
            className="block text-sm font-medium mb-2"
          >
            Definition <span className="text-red-500">*</span>
          </label>
          <textarea
            id="definition"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            placeholder="A clear, concise definition of the term..."
            required
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent resize-none"
          />
        </div>

        <div>
          <label htmlFor="example" className="block text-sm font-medium mb-2">
            Example (optional)
          </label>
          <textarea
            id="example"
            value={example}
            onChange={(e) => setExample(e.target.value)}
            placeholder="An example showing how this term is used in practice..."
            rows={2}
            className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent resize-none"
          />
        </div>

        <div>
          <label
            htmlFor="relatedTerms"
            className="block text-sm font-medium mb-2"
          >
            Related Terms (optional)
          </label>
          <input
            type="text"
            id="relatedTerms"
            value={relatedTerms}
            onChange={(e) => setRelatedTerms(e.target.value)}
            placeholder="e.g., embedding, similarity search, RAG"
            className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          />
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">
            Comma-separated list of related terms
          </p>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full px-6 py-3 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium rounded-lg transition-colors"
          >
            Submit via GitHub
          </button>
          <p className="mt-2 text-xs text-center text-[var(--muted-foreground)]">
            This will open GitHub in a new tab with a pre-filled issue. You will
            need a GitHub account to submit.
          </p>
        </div>
      </form>

      <div className="pt-4 text-center">
        <a href="./" className="text-[var(--primary)] hover:underline text-sm">
          Back to Glossary
        </a>
      </div>
    </div>
  )
}
