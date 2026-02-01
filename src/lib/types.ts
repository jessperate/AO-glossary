export interface GlossaryTerm {
  id: string
  term: string
  definition: string
  category: Category
  relatedTerms: string[]
  example?: string
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
