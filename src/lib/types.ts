export interface FAQ {
  question: string
  answer: string
}

export interface GlossaryTerm {
  id: string
  term: string
  definition: string
  category: Category
  relatedTerms: string[]
  example?: string
  article?: {
    keyConcepts?: {
      title: string
      description: string
    }[]
    benefits?: string[]
    comparison?: {
      term: string
      description: string
    }
    tools?: {
      name: string
      description: string
    }[]
    challenges?: {
      challenge: string
      solution: string
    }[]
    faq?: FAQ[]
  }
}

export type Category =
  | 'Core Concepts'
  | 'Workflows & Actions'
  | 'Integrations'
  | 'Data & Variables'
  | 'AI & Models'

export const CATEGORIES: Category[] = [
  'Core Concepts',
  'Workflows & Actions',
  'Integrations',
  'Data & Variables',
  'AI & Models',
]
