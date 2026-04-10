// frontend/js/utils.js - Shared Utilities for Niharika

// ── DOM Helpers ──────────────────────────────────────
const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];

// ── Toast ─────────────────────────────────────────────
function showToast(msg, duration = 2800) {
  const el = $('#toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), duration);
}

// ── Format Numbers ────────────────────────────────────
function fmt(n) {
  if (n >= 1e6) return (n/1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n/1e3).toFixed(1) + 'K';
  return String(n);
}

// ── Is Hindi text? ────────────────────────────────────
function isHindi(t) { return /[\u0900-\u097F]/.test(t); }

// ── Scroll top button ─────────────────────────────────
window.addEventListener('scroll', () => {
  $('#scrollTopFab')?.classList.toggle('show', scrollY > 300);
  $('#siteHeader')?.classList.toggle('scrolled', scrollY > 40);
});
document.addEventListener('DOMContentLoaded', () => {
  $('#scrollTopFab')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});

// ── Hamburger ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  $('#hamburgerBtn')?.addEventListener('click', () => {
    $('#siteNav')?.classList.toggle('open');
  });
});

// ── Keyboard shortcuts ────────────────────────────────
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const f = document.querySelector('.search-field');
    if (f) { f.focus(); showToast('🔍 Search opened'); }
  }
  if (e.key === 'Escape') {
    $$('.modal-overlay.open').forEach(m => m.classList.remove('open'));
    $('#favPanel')?.classList.remove('open');
  }
});

// ── Reveal animation ──────────────────────────────────
function initReveal() {
  if (!('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  $$('.reveal').forEach(el => obs.observe(el));
}

// ── Favorites ─────────────────────────────────────────
let FAVORITES = JSON.parse(localStorage.getItem('niharikaFavs') || '[]');

function saveFav(poem) {
  if (FAVORITES.some(f => f.id === poem.id)) { showToast('Already in favorites!'); return; }
  FAVORITES.push(poem);
  localStorage.setItem('niharikaFavs', JSON.stringify(FAVORITES));
  updateFavBadge(); renderFavPanel(); showToast('⭐ Saved to favorites!');
}

function removeFav(id) {
  FAVORITES = FAVORITES.filter(f => f.id !== id);
  localStorage.setItem('niharikaFavs', JSON.stringify(FAVORITES));
  updateFavBadge(); renderFavPanel(); showToast('Removed from favorites');
}

function updateFavBadge() {
  const el = $('#favCountBadge');
  if (el) el.textContent = FAVORITES.length;
}

function renderFavPanel() {
  const body = $('#favPanelBody');
  if (!body) return;
  if (!FAVORITES.length) {
    body.innerHTML = '<div class="fav-empty"><i class="fas fa-heart"></i><p>No favorites yet.<br>Click ❤ on any poem to save it!</p></div>';
    return;
  }
  body.innerHTML = FAVORITES.map(f => `
    <div class="fav-item" id="fav-${f.id}">
      <div class="fav-item-text ${isHindi(f.text) ? 'hindi' : ''}">${f.text.replace(/\n/g,'<br>')}</div>
      <div class="fav-item-poet">- ${f.poet || f.author}</div>
      <button class="fav-remove" onclick="removeFav(${f.id})"><i class="fas fa-times"></i></button>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  updateFavBadge();
  renderFavPanel();
  $('#favFab')?.addEventListener('click', () => $('#favPanel')?.classList.add('open'));
  $('#closeFavPanel')?.addEventListener('click', () => $('#favPanel')?.classList.remove('open'));
});

// ── Active nav link ───────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname.split('/').pop() || 'index.html';
  $$('.nav-link').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
    else a.classList.remove('active');
  });
});

// ── Language toggle ───────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  $$('.lang-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.lang-opt').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      showToast(btn.dataset.lang === 'hi' ? 'हिंदी भाषा चुनी गई ✓' : 'English selected ✓');
    });
  });
});

// ── Tab pills ─────────────────────────────────────────
function initTabPills(selector, callback) {
  $$(selector).forEach(btn => {
    btn.addEventListener('click', () => {
      $$(selector).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      callback(btn.dataset.tab);
    });
  });
}

// Tab pill default style
document.head.insertAdjacentHTML('beforeend', `
<style>
.tab-pill {
  padding: 9px 20px; border-radius: 24px; font-size: 12.5px; font-weight: 600;
  color: var(--muted); border: 1.5px solid var(--border); transition: all 0.2s ease;
  letter-spacing: 0.3px; background: transparent; cursor: pointer; margin-bottom: -2px;
}
.tab-pill:hover { color: var(--crimson); border-color: var(--crimson); }
.tab-pill.active { background: var(--crimson); color: white; border-color: var(--crimson); }
</style>
`);
