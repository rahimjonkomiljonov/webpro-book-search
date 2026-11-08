// Book Search: Open Library search with fetch + async/await.
const form = document.getElementById('search-form');
const input = document.getElementById('query');
const button = document.getElementById('search-btn');
const statusEl = document.getElementById('status');
const results = document.getElementById('results');

const API = 'https://openlibrary.org/search.json';
const FIELDS = 'key,title,author_name,first_publish_year,cover_i';

function setStatus(message, isError = false, withSpinner = false) {
  statusEl.className = isError ? 'status error' : 'status';
  statusEl.replaceChildren();
  if (withSpinner) {
    const spinner = document.createElement('span');
    spinner.className = 'spinner';
    statusEl.append(spinner);
  }
  statusEl.append(message);
}

function createCard(book) {
  const card = document.createElement('article');
  card.className = 'card';

  // cover_i can be missing: show a placeholder instead of a broken image
  let cover;
  if (book.cover_i) {
    cover = document.createElement('img');
    cover.className = 'cover';
    cover.src = 'https://covers.openlibrary.org/b/id/' + book.cover_i + '-M.jpg';
    cover.alt = '';
    cover.width = 72;
    cover.height = 108;
    cover.loading = 'lazy';
  } else {
    cover = document.createElement('div');
    cover.className = 'no-cover';
    cover.setAttribute('aria-hidden', 'true');
    cover.textContent = '📖';
  }

  const info = document.createElement('div');
  const title = document.createElement('h2');
  title.textContent = book.title;
  const author = document.createElement('p');
  author.textContent = (book.author_name || ['Unknown author']).slice(0, 2).join(', ');
  info.append(title, author);
  if (book.first_publish_year) {
    const year = document.createElement('p');
    year.className = 'year';
    year.textContent = 'First published ' + book.first_publish_year;
    info.append(year);
  }

  card.append(cover, info);
  return card;
}

async function searchBooks(query) {
  button.disabled = true;
  results.replaceChildren();
  setStatus('Searching...', false, true);
  try {
    const url = API + '?limit=12&fields=' + FIELDS + '&q=' + encodeURIComponent(query);
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();

    if (data.docs.length === 0) {
      setStatus('No books found for "' + query + '". Try another title or author.');
      return;
    }
    setStatus('Showing ' + data.docs.length + ' of ' + data.numFound.toLocaleString() + ' results.');
    results.append(...data.docs.map(createCard));
  } catch (error) {
    setStatus('Something went wrong while searching. Please check your connection and try again.', true);
  } finally {
    button.disabled = false;
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = input.value.trim();
  if (query) searchBooks(query);
});
