# Book Search

A small book search app built for Web Programming (K0126002, Gachon University).

It searches the free [Open Library](https://openlibrary.org/developers/api) API and shows each result as a card with the cover, title, author and first publication year.

**Live site:** https://rahimjonkomiljonov.github.io/webpro-book-search/

## What it practises
- Semantic HTML (`header`, `main`, `footer`, a labelled search form)
- CSS variables, a Flexbox search bar and a CSS Grid of cards
- `fetch` with `async`/`await`, `res.ok` checks and `try`/`catch`/`finally`
- Creating elements with `createElement` and `append`
- Loading, error and "no results" states, and a placeholder when a book has no cover

## Files
| File | Purpose |
| --- | --- |
| `index.html` | page structure (must be in the repo root for GitHub Pages) |
| `style.css` | layout and styling |
| `app.js` | search and rendering |
