/* Lu.dev — render de proyectos, filtros, reveals y formulario */

const grid = document.getElementById('projects-grid');
let projects = [];
let activeFilter = 'todos';

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function card(p) {
  return `
  <article class="card reveal ${p.featured ? 'featured' : ''}" data-category="${esc(p.category)}">
    ${p.featured ? '<span class="card-badge">★ DESTACADO</span>' : ''}
    <img src="${esc(p.thumbnail)}" alt="${esc(p.title)}" loading="lazy" />
    <div class="card-body">
      <div class="card-head">
        <h3>${esc(p.title)}</h3>
        <span class="card-year">${esc(p.year)}</span>
      </div>
      <p class="card-desc">${esc(p.description)}</p>
      <div class="card-tech">${(p.tech || []).map((t) => `<span>${esc(t)}</span>`).join('')}</div>
      <div class="card-actions">
        <a href="${esc(p.demoUrl)}" target="_blank" rel="noopener noreferrer">Ver demo</a>
        <a href="${esc(p.repoUrl)}" target="_blank" rel="noopener noreferrer">Ver código</a>
      </div>
    </div>
  </article>`;
}

function render() {
  const visible = projects.filter(
    (p) => activeFilter === 'todos' || p.category === activeFilter,
  );
  grid.innerHTML = visible.length
    ? visible.map(card).join('')
    : '<p class="grid-empty">No hay proyectos en esta categoría todavía.</p>';
  observeReveals();
}

/* Filtros */
document.querySelectorAll('.chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
    activeFilter = chip.dataset.filter;
    render();
  });
});

/* Animaciones de entrada (Intersection Observer, sin librerías) */
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }
  },
  { threshold: 0.1 },
);
function observeReveals() {
  document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el));
}

/* Formulario de contacto */
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  if (!data.name || !data.email || !data.message) {
    status.textContent = 'Completa todos los campos.';
    status.className = 'error';
    return;
  }
  status.textContent = 'Enviando…';
  status.className = '';
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error();
    status.textContent = '¡Mensaje enviado! Te responderé pronto.';
    status.className = 'ok';
    form.reset();
  } catch {
    status.textContent = 'No se pudo enviar. Intenta de nuevo.';
    status.className = 'error';
  }
});

/* Init */
document.documentElement.classList.add('js');
document.getElementById('year').textContent = new Date().getFullYear();
observeReveals();

fetch('/api/projects')
  .then((r) => r.json())
  .then((data) => { projects = data; render(); })
  .catch(() => { grid.innerHTML = '<p class="grid-empty">No se pudieron cargar los proyectos.</p>'; });
