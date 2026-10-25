// Renders projects.json into the filter list and card stack.

// Checkbox groups built from project tags. Within a group any checked tag
// matches; across groups every group with a checked tag must match.
// Tags not listed here fall into "Other".
const TAG_GROUPS = [
  ['Type', ['Game', 'App', 'Tool']],
  ['Players', ['Singleplayer', 'Multiplayer']],
  ['Platform', ['PC', 'Mobile']],
];

const state = { projects: [], groups: [], selected: new Set(), query: '' };

const $filters = document.getElementById('filters');
const $search = document.getElementById('search');
const $projects = document.getElementById('projects');


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

function buildGroups() {
  const used = new Set(state.projects.flatMap((p) => p.tags || []));
  const known = new Set(TAG_GROUPS.flatMap(([, tags]) => tags));
  const other = [...used].filter((t) => !known.has(t)).sort();
  // Only keep tags that at least one project has.
  return [...TAG_GROUPS, ['Other', other]]
    .map(([name, tags]) => [name, tags.filter((t) => used.has(t))])
    .filter(([, tags]) => tags.length);
}

function renderFilters() {
  state.groups = buildGroups();
  $filters.replaceChildren(
    ...state.groups.map(([name, tags]) =>
      el('fieldset', { class: 'group' },
        el('legend', { class: 'mono' }, name),
        ...tags.map((tag) =>
          el('label', { class: 'filter' },
            el('input', { type: 'checkbox', value: tag }),
            el('span', {}, tag),
            el('span', { class: 'count' })
          )
        )
      )
    ),
    el('button', { class: 'clear mono', type: 'button', hidden: '' }, 'Clear filters')
  );
  updateFilters();
}

// Counts show how many projects each box would match alongside the other
// groups' selections, so they stay meaningful as boxes are checked.
function updateFilters() {
  for (const box of $filters.querySelectorAll('input')) {
    const tag = box.value;
    const group = state.groups.findIndex(([, tags]) => tags.includes(tag));
    const n = state.projects.filter((p) => (p.tags || []).includes(tag) && matches(p, group)).length;
    box.checked = state.selected.has(tag);
    box.parentElement.querySelector('.count').textContent = n;
    box.parentElement.classList.toggle('none', !n && !box.checked);
  }
  $filters.querySelector('.clear').hidden = !state.selected.size;
}

function matches(p, skipGroup = -1) {
  const tags = p.tags || [];
  for (const [i, [, groupTags]] of state.groups.entries()) {
    if (i === skipGroup) continue;
    const checked = groupTags.filter((t) => state.selected.has(t));
    if (checked.length && !checked.some((t) => tags.includes(t))) return false;
  }
  if (!state.query) return true;
  const haystack = [p.title, p.description, p.type, ...tags].join(' ').toLowerCase();
  return state.query.split(/\s+/).every((word) => haystack.includes(word));
}

function card(p) {
  const metaLeft = el('span', {},
    [p.featured ? 'Latest' : null, ...(p.tags || [])].filter(Boolean).join(' · ')
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

function renderProjects() {
  const visible = state.projects.filter((p) => matches(p));
  if (!visible.length) {
    $projects.replaceChildren(el('div', { class: 'empty mono' }, 'No projects match those filters.'));
    return;
  }
  $projects.replaceChildren(...visible.map(card));
}

document.getElementById('year').textContent = new Date().getFullYear();

$filters.addEventListener('change', (e) => {
  const tag = e.target.value;
  if (e.target.checked) state.selected.add(tag);
  else state.selected.delete(tag);
  updateFilters();
  renderProjects();
});

$filters.addEventListener('click', (e) => {
  if (!e.target.closest('.clear')) return;
  state.selected.clear();
  updateFilters();
  renderProjects();
});

$search.addEventListener('input', () => {
  state.query = $search.value.trim().toLowerCase();
  updateFilters();
  renderProjects();
});

// Revalidate every load so a newly added project shows up immediately.
fetch('projects.json', { cache: 'no-cache' })
  .then((r) => r.json())
  .then((projects) => {
    // Newest first; the newest is featured unless one is marked explicitly.
    projects.sort((a, b) => b.released.localeCompare(a.released));
    if (!projects.some((p) => p.featured) && projects.length) projects[0].featured = true;
    state.projects = projects;
    renderFilters();
    renderProjects();
  })
  .catch(() => {
    $projects.replaceChildren(el('div', { class: 'empty mono' }, 'Couldn’t load projects.'));
  });
