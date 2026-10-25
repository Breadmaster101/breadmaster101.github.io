// Renders projects.json into the filter list and card stack.

const TYPE_LABELS = { game: 'Games', app: 'Apps' };

const state = { projects: [], filter: 'all', query: '' };

const $filters = document.getElementById('filters');
const $search = document.getElementById('search');
const $projects = document.getElementById('projects');

const pad = (n) => String(n).padStart(2, '0');

function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else node.setAttribute(k, v);
  }
  node.append(...children.filter((c) => c != null));
  return node;
}

function renderFilters() {
  const counts = { all: state.projects.length };
  for (const p of state.projects) counts[p.type] = (counts[p.type] || 0) + 1;

  // Only show type filters that have at least one project.
  const options = [['all', 'All'], ...Object.entries(TYPE_LABELS).filter(([t]) => counts[t])];

  $filters.replaceChildren(...options.map(([value, label]) =>
    el('button', {
      class: 'filter',
      type: 'button',
      role: 'radio',
      'aria-checked': String(state.filter === value),
      'data-value': value,
    }, el('span', {}, label), el('span', {}, pad(counts[value])))
  ));
}

function matches(p) {
  if (state.filter !== 'all' && p.type !== state.filter) return false;
  if (!state.query) return true;
  const haystack = [p.title, p.description, p.type, ...(p.tags || [])].join(' ').toLowerCase();
  return state.query.split(/\s+/).every((word) => haystack.includes(word));
}

function card(p) {
  const typeLabel = p.type === 'app' ? 'App' : 'Game';
  const metaLeft = el('span', {},
    [p.featured ? 'Latest' : null, typeLabel, ...(p.tags || [])].filter(Boolean).join(' · ')
  );

  return el('article', { class: 'card' },
    el('div', { class: 'meta mono' },
      metaLeft,
      el('time', { datetime: p.released }, formatDate(p.released))
    ),
    el('h2', {}, p.title),
    el('p', {}, p.description),
    el('div', { class: 'actions' },
      p.source ? el('a', { class: 'source mono', href: p.source, target: '_blank', rel: 'noopener' }, 'Source') : null,
      el('a', { class: 'play', href: p.url, target: '_blank', rel: 'noopener', 'aria-label': `${p.type === 'app' ? 'Open' : 'Play'} ${p.title}` },
        (p.type === 'app' ? 'Open' : 'Play') + ' ↗')
    )
  );
}

function renderProjects({ animate = false } = {}) {
  const visible = state.projects.filter(matches);
  if (!visible.length) {
    $projects.replaceChildren(el('div', { class: 'empty mono' }, 'No projects match that search.'));
    return;
  }
  const cards = visible.map(card);
  if (animate) {
    // Stagger in after the side column's reveal.
    cards.forEach((c, i) => { c.classList.add('reveal'); c.style.setProperty('--i', i + 3); });
  }
  $projects.replaceChildren(...cards);
}

document.getElementById('year').textContent = new Date().getFullYear();

$filters.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter');
  if (!btn) return;
  state.filter = btn.dataset.value;
  renderFilters();
  renderProjects();
});

$search.addEventListener('input', () => {
  state.query = $search.value.trim().toLowerCase();
  renderProjects();
});

fetch('projects.json')
  .then((r) => r.json())
  .then((projects) => {
    // Newest first; the newest is featured unless one is marked explicitly.
    projects.sort((a, b) => b.released.localeCompare(a.released));
    if (!projects.some((p) => p.featured) && projects.length) projects[0].featured = true;
    state.projects = projects;
    renderFilters();
    renderProjects({ animate: true });
  })
  .catch(() => {
    $projects.replaceChildren(el('div', { class: 'empty mono' }, 'Couldn’t load projects.'));
  });
