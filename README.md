# AirOps Glossary

A searchable glossary of AirOps terminology and concepts.

## Features

- **Search** - Fuzzy search across all terms
- **Category Filtering** - Filter by category (Core Concepts, Workflows & Actions, Integrations, Data & Variables, AI & Models)
- **User Contributions** - Suggest new terms via GitHub Issues

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding New Terms

Edit `data/glossary.json` and add a new entry:

```json
{
  "id": "unique-slug",
  "term": "Term Name",
  "definition": "Clear definition of the term.",
  "category": "Core Concepts",
  "relatedTerms": ["related", "terms"],
  "example": "Optional example of usage."
}
```

## Deployment

The site automatically deploys to GitHub Pages on push to `main`.

Live at: https://jessperate.github.io/AO-glossary/
