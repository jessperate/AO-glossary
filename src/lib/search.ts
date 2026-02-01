import Fuse, { type IFuseOptions } from 'fuse.js'
import type { GlossaryTerm } from './types'

const fuseOptions: IFuseOptions<GlossaryTerm> = {
  keys: [
    { name: 'term', weight: 2 },
    { name: 'definition', weight: 1 },
    { name: 'example', weight: 0.5 },
  ],
  threshold: 0.3,
  includeScore: true,
}

export function createSearchIndex(terms: GlossaryTerm[]): Fuse<GlossaryTerm> {
  return new Fuse(terms, fuseOptions)
}

export function searchTerms(
  fuse: Fuse<GlossaryTerm>,
  query: string
): GlossaryTerm[] {
  if (!query.trim()) {
    return []
  }
  return fuse.search(query).map((result) => result.item)
}
