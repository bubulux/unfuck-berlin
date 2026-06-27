/* Internal reporter dashboard logic.
   Auth via Supabase Auth (single reporter user). Data protected by RLS:
   reads/updates only work with a valid authenticated session. */

const SUPABASE_URL = 'https://ugxzkzydoajexjgwcqtq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVneHprenlkb2FqZXhqZ3djcXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNTM5MTksImV4cCI6MjA5NTgyOTkxOX0.pgO_pJ0ksQiGp5mYiLtz6E8uxD78MmWbXrufJA669_U';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ---------- tiny helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function fmtDate(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString('de-DE', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  } catch { return iso; }
}

function photosOf(row) {
  return Array.isArray(row.file_urls) ? row.file_urls.filter(Boolean) : [];
}

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3500);
}

/* ---------- tab config + state ---------- */
const TABS = {
  stickers: { table: 'sticker_requests' },
  nervkrams: { table: 'nervkrams_reports' },
};

const state = {
  active: 'stickers',
  stickers: { rows: [], filtered: [], view: 'table', card: 0, loaded: false },
  nervkrams: { rows: [], filtered: [], view: 'table', card: 0, loaded: false },
};

/* =====================================================================
   AUTH
   ===================================================================== */
async function init() {
  const { data: { session } } = await sb.auth.getSession();
  if (session) showApp(session);
  else showLogin();
}

function showLogin() {
  $('#app').hidden = true;
  $('#login').hidden = false;
}

async function showApp(session) {
  $('#login').hidden = true;
  $('#app').hidden = false;
  $('#userEmail').textContent = session?.user?.email || '';
  await loadTab(state.active);
}

$('#loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const err = $('#loginError');
  err.hidden = true;
  const email = $('#loginEmail').value.trim();
  const password = $('#loginPassword').value;
  const btn = $('#loginBtn');
  btn.disabled = true;
  btn.textContent = 'Logging in…';
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  btn.disabled = false;
  btn.textContent = 'Log in';
  if (error) {
    err.textContent = 'Login failed. Check your email and password.';
    err.hidden = false;
    return;
  }
  // reset per-tab loaded flags for a clean session
  state.stickers.loaded = false;
  state.nervkrams.loaded = false;
  showApp(data.session);
});

$('#logoutBtn').addEventListener('click', async () => {
  await sb.auth.signOut();
  showLogin();
});

/* =====================================================================
   DATA LOADING
   ===================================================================== */
async function loadTab(key) {
  const cfg = TABS[key];
  const st = state[key];
  if (st.loaded) { applyFilters(key); return; }
  const { data, error } = await sb.from(cfg.table).select('*');
  if (error) {
    toast('Could not load data: ' + error.message);
    return;
  }
  st.rows = data || [];
  st.loaded = true;
  applyFilters(key);
}

/* =====================================================================
   FILTERING
   ===================================================================== */
function applyFilters(key) {
  if (key === 'stickers') filterStickers();
  else filterNervkrams();
  render(key);
}

function filterStickers() {
  const st = state.stickers;
  const q = $('#stk-search').value.trim().toLowerCase();
  const status = $('#stk-status').value;
  const conf = $('#stk-confirmed').value;
  const sort = $('#stk-sort').value;

  let rows = st.rows.filter((r) => {
    if (status !== 'all' && (r.status || 'open') !== status) return false;
    if (conf === 'confirmed' && !r.email_confirmed) return false;
    if (conf === 'unconfirmed' && r.email_confirmed) return false;
    if (q) {
      const hay = [r.name, r.email, r.strasse, r.stadt, r.plz].join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  rows = sortByCreated(rows, sort);
  st.filtered = rows;
  clampCard(st);
}

function filterNervkrams() {
  const st = state.nervkrams;
  const q = $('#nrv-search').value.trim().toLowerCase();
  const status = $('#nrv-status').value;
  const photos = $('#nrv-photos').value;
  const sort = $('#nrv-sort').value;

  let rows = st.rows.filter((r) => {
    if (status !== 'all' && (r.status || 'open') !== status) return false;
    const has = photosOf(r).length > 0;
    if (photos === 'with' && !has) return false;
    if (photos === 'without' && has) return false;
    if (q) {
      const hay = [r.problem, r.ort, r.kontakt].join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  rows = sortByCreated(rows, sort);
  st.filtered = rows;
  clampCard(st);
}

function sortByCreated(rows, sort) {
  const dir = sort === 'created_asc' ? 1 : -1;
  return rows.slice().sort((a, b) => {
    const ta = a.created_at ? Date.parse(a.created_at) : 0;
    const tb = b.created_at ? Date.parse(b.created_at) : 0;
    return (ta - tb) * dir;
  });
}

function clampCard(st) {
  if (st.card >= st.filtered.length) st.card = Math.max(0, st.filtered.length - 1);
  if (st.card < 0) st.card = 0;
}

/* =====================================================================
   RENDER
   ===================================================================== */
function render(key) {
  const st = state[key];
  const panel = $(`[data-panel="${key}"]`);
  // view visibility
  $$('.view', panel).forEach((v) => { v.hidden = v.dataset.view !== st.view; });
  $$('.vt', panel).forEach((b) => b.classList.toggle('is-active', b.dataset.view === st.view));

  if (key === 'stickers') {
    $('#stk-count').textContent = `${st.filtered.length} of ${st.rows.length}`;
    if (st.view === 'table') renderStickerTable();
    else renderStickerCard();
  } else {
    $('#nrv-count').textContent = `${st.filtered.length} of ${st.rows.length}`;
    if (st.view === 'table') renderNervkramsTable();
    else renderNervkramsCard();
  }
}

/* ---------- status checkbox cell ---------- */
function statusTick(key, row) {
  const td = document.createElement('td');
  td.className = 'col-status';
  const cb = document.createElement('input');
  cb.type = 'checkbox';
  cb.className = 'tick';
  cb.checked = (row.status === 'done');
  cb.title = 'Mark as done';
  cb.addEventListener('click', (e) => e.stopPropagation());
  cb.addEventListener('change', () => {
    setStatus(key, row, cb.checked ? 'done' : 'open', () => { cb.checked = !cb.checked; });
  });
  td.appendChild(cb);
  return td;
}

/* ---------- Stickers table ---------- */
function renderStickerTable() {
  const st = state.stickers;
  const tbody = $('#stk-table tbody');
  tbody.innerHTML = '';
  $('#stk-empty').hidden = st.filtered.length > 0;

  st.filtered.forEach((row, idx) => {
    const tr = document.createElement('tr');
    if (row.status === 'done') tr.classList.add('is-done');
    tr.appendChild(statusTick('stickers', row));
    addCell(tr, row.name);
    addCell(tr, row.email);
    addCell(tr, row.strasse);
    addCell(tr, row.plz);
    addCell(tr, row.stadt);
    const conf = document.createElement('td');
    conf.appendChild(badge(row.email_confirmed ? 'Yes' : 'No', row.email_confirmed ? 'yes' : 'no'));
    tr.appendChild(conf);
    addCell(tr, fmtDate(row.created_at), 'cellmuted');
    tr.addEventListener('click', () => openCard('stickers', idx));
    tbody.appendChild(tr);
  });
}

/* ---------- Nervkrams table ---------- */
function renderNervkramsTable() {
  const st = state.nervkrams;
  const tbody = $('#nrv-table tbody');
  tbody.innerHTML = '';
  $('#nrv-empty').hidden = st.filtered.length > 0;

  st.filtered.forEach((row, idx) => {
    const tr = document.createElement('tr');
    if (row.status === 'done') tr.classList.add('is-done');
    tr.appendChild(statusTick('nervkrams', row));
    addCell(tr, row.problem, 'truncate');
    addCell(tr, row.ort);
    addCell(tr, row.kontakt || '—', row.kontakt ? '' : 'cellmuted');
    const n = photosOf(row).length;
    const pc = document.createElement('td');
    pc.className = 'col-photos';
    if (n) pc.appendChild(badge(String(n), 'photos'));
    else { pc.textContent = '—'; pc.classList.add('cellmuted'); }
    tr.appendChild(pc);
    addCell(tr, fmtDate(row.created_at), 'cellmuted');
    tr.addEventListener('click', () => openCard('nervkrams', idx));
    tbody.appendChild(tr);
  });
}

function addCell(tr, text, cls) {
  const td = document.createElement('td');
  td.textContent = (text == null || text === '') ? '—' : text;
  if (cls) td.className = cls;
  tr.appendChild(td);
}

function badge(text, kind) {
  const span = document.createElement('span');
  span.className = 'badge badge--' + kind;
  span.textContent = text;
  return span;
}

/* =====================================================================
   CARD VIEW
   ===================================================================== */
function openCard(key, idx) {
  const st = state[key];
  st.view = 'card';
  st.card = idx;
  render(key);
}

function cardStep(key, delta) {
  const st = state[key];
  const n = st.filtered.length;
  if (!n) return;
  st.card = Math.min(n - 1, Math.max(0, st.card + delta));
  if (key === 'stickers') renderStickerCard();
  else renderNervkramsCard();
}

function cardNavBar(key) {
  const st = state[key];
  const pos = key === 'stickers' ? $('#stk-pos') : $('#nrv-pos');
  pos.textContent = st.filtered.length ? `${st.card + 1} / ${st.filtered.length}` : '0 / 0';
  const panel = $(`[data-panel="${key}"]`);
  $(`[data-card-prev="${key}"]`).disabled = st.card <= 0;
  $(`[data-card-next="${key}"]`).disabled = st.card >= st.filtered.length - 1;
}

function statusButton(key, row) {
  const wrap = document.createElement('div');
  wrap.className = 'statuspill';
  const dot = document.createElement('span');
  dot.className = 'dot ' + (row.status === 'done' ? 'dot--done' : 'dot--open');
  const label = document.createElement('span');
  label.textContent = row.status === 'done' ? 'Done' : 'Open';
  wrap.append(dot, label);

  const btn = document.createElement('button');
  const done = row.status === 'done';
  btn.className = 'btn ' + (done ? 'btn--outline' : 'btn--done');
  btn.textContent = done ? 'Mark as open' : (key === 'stickers' ? 'Mark envelope ready' : 'Mark as done');
  btn.addEventListener('click', () => {
    setStatus(key, row, done ? 'open' : 'done', null, () => {
      if (key === 'stickers') renderStickerCard();
      else renderNervkramsCard();
    });
  });
  const row2 = document.createElement('div');
  row2.className = 'cardactions';
  row2.append(wrap, btn);
  return row2;
}

/* ---------- Sticker card ---------- */
function renderStickerCard() {
  cardNavBar('stickers');
  const st = state.stickers;
  const host = $('#stk-card');
  host.innerHTML = '';
  if (!st.filtered.length) { host.innerHTML = '<p class="empty">No matching entries.</p>'; return; }
  const row = st.filtered[st.card];

  const head = document.createElement('div');
  head.className = 'bigcard__head';
  const left = document.createElement('div');
  const h = document.createElement('h2');
  h.style.margin = '0';
  h.textContent = row.name || '—';
  const meta = document.createElement('div');
  meta.className = 'bigcard__meta';
  meta.textContent = `Created ${fmtDate(row.created_at)}`;
  left.append(h, meta);
  const conf = badge(row.email_confirmed ? 'Confirmed' : 'Unconfirmed', row.email_confirmed ? 'yes' : 'no');
  head.append(left, conf);
  host.appendChild(head);

  // envelope block
  const env = document.createElement('div');
  env.className = 'envelope';
  const eName = document.createElement('div');
  eName.className = 'ename';
  eName.textContent = row.name || '';
  const eStreet = document.createElement('div');
  eStreet.textContent = row.strasse || '';
  const eCity = document.createElement('div');
  eCity.textContent = `${row.plz || ''} ${row.stadt || ''}`.trim();
  env.append(eName, eStreet, eCity);
  host.appendChild(env);

  // email row
  const emailRow = document.createElement('div');
  emailRow.className = 'fieldrow';
  const el1 = document.createElement('span'); el1.className = 'flabel'; el1.textContent = 'Email';
  const el2 = document.createElement('span'); el2.className = 'fval'; el2.textContent = row.email || '—';
  emailRow.append(el1, el2);
  host.appendChild(emailRow);

  // actions: copy + status
  const actions = statusButton('stickers', row);
  const copy = document.createElement('button');
  copy.className = 'btn btn--outline';
  copy.textContent = 'Copy address';
  copy.addEventListener('click', () => {
    const text = [row.name, row.strasse, `${row.plz || ''} ${row.stadt || ''}`.trim()].filter(Boolean).join('\n');
    navigator.clipboard.writeText(text).then(() => toast('Address copied'), () => toast('Copy failed'));
  });
  actions.appendChild(copy);
  host.appendChild(actions);
}

/* ---------- Nervkrams card + carousel ---------- */
let carousel = { urls: [], i: 0 };

function renderNervkramsCard() {
  cardNavBar('nervkrams');
  const st = state.nervkrams;
  const host = $('#nrv-card');
  host.innerHTML = '';
  if (!st.filtered.length) { host.innerHTML = '<p class="empty">No matching entries.</p>'; return; }
  const row = st.filtered[st.card];
  const urls = photosOf(row);
  carousel = { urls, i: 0 };

  const head = document.createElement('div');
  head.className = 'bigcard__head';
  const left = document.createElement('div');
  const meta = document.createElement('div');
  meta.className = 'bigcard__meta';
  meta.textContent = `Created ${fmtDate(row.created_at)}`;
  left.appendChild(meta);
  head.appendChild(left);
  host.appendChild(head);

  // carousel or placeholder
  if (urls.length) host.appendChild(buildCarousel());
  else {
    const np = document.createElement('div');
    np.className = 'nophotos';
    np.textContent = 'No photos for this report.';
    host.appendChild(np);
  }

  // problem
  const prob = document.createElement('p');
  prob.className = 'problem';
  prob.textContent = row.problem || '—';
  host.appendChild(prob);

  // location + contact
  host.appendChild(fieldRow('Location', row.ort || '—'));
  host.appendChild(fieldRow('Contact', row.kontakt || '—'));

  host.appendChild(statusButton('nervkrams', row));
}

function fieldRow(label, val) {
  const r = document.createElement('div');
  r.className = 'fieldrow';
  const a = document.createElement('span'); a.className = 'flabel'; a.textContent = label;
  const b = document.createElement('span'); b.className = 'fval'; b.textContent = val;
  r.append(a, b);
  return r;
}

function buildCarousel() {
  const wrap = document.createElement('div');
  wrap.className = 'carousel';

  const stage = document.createElement('div');
  stage.className = 'carousel__stage';
  const img = document.createElement('img');
  img.src = carousel.urls[carousel.i];
  img.alt = `Photo ${carousel.i + 1}`;
  img.addEventListener('click', () => openLightbox(carousel.i));
  stage.appendChild(img);

  const counter = document.createElement('div');
  counter.className = 'carousel__counter';
  counter.textContent = `${carousel.i + 1} / ${carousel.urls.length}`;
  stage.appendChild(counter);

  if (carousel.urls.length > 1) {
    const prev = arrow('carousel__prev', '‹', () => stepCarousel(-1));
    const next = arrow('carousel__next', '›', () => stepCarousel(1));
    stage.append(prev, next);
  }
  wrap.appendChild(stage);

  if (carousel.urls.length > 1) {
    const thumbs = document.createElement('div');
    thumbs.className = 'thumbs';
    carousel.urls.forEach((u, i) => {
      const t = document.createElement('img');
      t.src = u;
      t.alt = `Thumbnail ${i + 1}`;
      if (i === carousel.i) t.classList.add('is-active');
      t.addEventListener('click', () => { carousel.i = i; refreshCarousel(); });
      thumbs.appendChild(t);
    });
    wrap.appendChild(thumbs);
  }
  return wrap;
}

function arrow(cls, glyph, fn) {
  const b = document.createElement('button');
  b.className = 'carousel__arrow ' + cls;
  b.textContent = glyph;
  b.addEventListener('click', fn);
  return b;
}

function stepCarousel(delta) {
  const n = carousel.urls.length;
  carousel.i = (carousel.i + delta + n) % n;
  refreshCarousel();
}

function refreshCarousel() {
  const wrap = $('#nrv-card .carousel');
  if (!wrap) return;
  const fresh = buildCarousel();
  wrap.replaceWith(fresh);
}

/* =====================================================================
   LIGHTBOX
   ===================================================================== */
let lb = { urls: [], i: 0 };
function openLightbox(i) {
  lb = { urls: carousel.urls, i };
  $('#lbImg').src = lb.urls[lb.i];
  const multi = lb.urls.length > 1;
  $('#lbPrev').hidden = !multi;
  $('#lbNext').hidden = !multi;
  $('#lightbox').hidden = false;
}
function closeLightbox() { $('#lightbox').hidden = true; }
function lbStep(delta) {
  const n = lb.urls.length;
  lb.i = (lb.i + delta + n) % n;
  $('#lbImg').src = lb.urls[lb.i];
}
$('#lbClose').addEventListener('click', closeLightbox);
$('#lbPrev').addEventListener('click', () => lbStep(-1));
$('#lbNext').addEventListener('click', () => lbStep(1));
$('#lightbox').addEventListener('click', (e) => { if (e.target.id === 'lightbox') closeLightbox(); });

/* =====================================================================
   STATUS UPDATE
   ===================================================================== */
async function setStatus(key, row, newStatus, onRevert, onOk) {
  const prev = row.status;
  row.status = newStatus; // optimistic
  const { error } = await sb.from(TABS[key].table).update({ status: newStatus }).eq('id', row.id);
  if (error) {
    row.status = prev;
    if (onRevert) onRevert();
    toast('Update failed: ' + error.message);
    return;
  }
  // keep filtered list in sync if a status filter is active
  applyFilters(key);
  if (onOk) onOk();
}

/* =====================================================================
   WIRING: tabs, view toggles, filters, nav, keyboard
   ===================================================================== */
$$('.tab').forEach((b) => b.addEventListener('click', () => {
  state.active = b.dataset.tab;
  $$('.tab').forEach((t) => t.classList.toggle('is-active', t === b));
  $$('[data-panel]').forEach((p) => { p.hidden = p.dataset.panel !== state.active; });
  loadTab(state.active);
}));

$$('.vt').forEach((b) => b.addEventListener('click', () => {
  const key = b.dataset.for;
  state[key].view = b.dataset.view;
  render(key);
}));

// filter inputs
['#stk-search', '#stk-status', '#stk-confirmed', '#stk-sort'].forEach((sel) => {
  $(sel).addEventListener('input', () => applyFilters('stickers'));
});
['#nrv-search', '#nrv-status', '#nrv-photos', '#nrv-sort'].forEach((sel) => {
  $(sel).addEventListener('input', () => applyFilters('nervkrams'));
});

// card nav buttons
$$('[data-card-prev]').forEach((b) => b.addEventListener('click', () => cardStep(b.dataset.cardPrev, -1)));
$$('[data-card-next]').forEach((b) => b.addEventListener('click', () => cardStep(b.dataset.cardNext, 1)));

// keyboard
document.addEventListener('keydown', (e) => {
  if ($('#app').hidden) return;
  const tag = (document.activeElement && document.activeElement.tagName) || '';
  if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;

  // lightbox takes priority
  if (!$('#lightbox').hidden) {
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') lbStep(-1);
    else if (e.key === 'ArrowRight') lbStep(1);
    return;
  }
  const key = state.active;
  if (state[key].view !== 'card') return;
  if (e.key === 'ArrowLeft') cardStep(key, -1);
  else if (e.key === 'ArrowRight') cardStep(key, 1);
});

init();
