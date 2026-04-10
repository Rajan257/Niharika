// frontend/js/main.js - Homepage Logic for Niharika

let _poems = [], _quotes = [], _quizQs = [], _qIdx = 0, _qScore = 0, _shareId = null;

// ── Init ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  initSlider();
  initSearch();
  initModals();
  initQuoteWidget();

  await Promise.all([
    renderTopPoems(),
    renderPoets('all'),
    renderKavita(),
    renderCategories(),
    renderVideos(),
    renderBlog(),
    renderFounderSection(),
  ]);

  initReveal && initReveal();
  initQuiz();
  initNewsletterBtn();
  initDictWidget();
  initWordOfDay();
});

// ── Hero Slider ───────────────────────────────────────
function initSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  let cur = 0, timer;

  function go(n) {
    slides[cur].classList.remove('active'); dots[cur].classList.remove('on');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('active'); dots[cur].classList.add('on');
  }
  function start() { clearInterval(timer); timer = setInterval(() => go(cur+1), 5500); }

  document.getElementById('heroPrev')?.addEventListener('click', () => { go(cur-1); start(); });
  document.getElementById('heroNext')?.addEventListener('click', () => { go(cur+1); start(); });
  dots.forEach((d,i) => d.addEventListener('click', () => { go(i); start(); }));
  start();
}

// ── Live Search ───────────────────────────────────────
function initSearch() {
  const input  = document.getElementById('globalSearch');
  const drop   = document.getElementById('searchDropdown');
  if (!input || !drop) return;

  let timer;
  input.addEventListener('input', () => {
    const q = input.value.trim();
    if (!q) { drop.classList.remove('visible'); return; }
    clearTimeout(timer);
    timer = setTimeout(async () => {
      const res = await NiharikaAPI.search(q) || [];
      if (!res.length) { drop.classList.remove('visible'); return; }
      drop.innerHTML = res.map(r => `
        <div class="search-item" onclick="showToast('Exploring: ${r.label}')">
          <div class="search-item-icon"><i class="fas fa-${r.icon||'search'}"></i></div>
          <div>
            <div class="search-item-label">${r.label}</div>
            ${r.sublabel ? `<div class="search-item-sub">${r.sublabel}</div>` : ''}
          </div>
          <span class="search-item-type">${r.type}</span>
        </div>
      `).join('');
      drop.classList.add('visible');
    }, 280);
  });

  document.addEventListener('click', e => { if (!e.target.closest('.header-search')) drop.classList.remove('visible'); });

  // Voice search
  document.getElementById('micBtn')?.addEventListener('click', () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return showToast('⚠️ Voice search not supported in this browser');
    const r = new SR(); r.lang = 'hi-IN'; r.start();
    showToast('🎤 Listening...');
    r.onresult = e => { input.value = e.results[0][0].transcript; input.dispatchEvent(new Event('input')); };
    r.onerror = () => showToast('Voice search failed');
  });
}

// ── Top Poems ─────────────────────────────────────────
async function renderTopPoems() {
  const el = document.getElementById('topPoemsList');
  if (!el) return;
  const data = await NiharikaAPI.getPoems('limit=5');
  _poems = data?.data || FB_POEMS.slice(0,5);

  el.innerHTML = _poems.map((p, i) => `
    <article class="poem-card reveal" style="margin-bottom:18px" id="pc-${p.id}">
      <span class="poem-number">${i+1}</span>
      <div class="poem-form-tag ${p.isRajanQuote?'gold':''}">${p.form} ${p.isRajanQuote?'· Rajan Rai ⭐':''}</div>
      <div class="poem-text ${isHindi(p.text)?'hindi':''}">${p.text.replace(/\n/g,'<br>')}</div>
      ${p.hindi && !isHindi(p.text) ? `<div class="poem-translation hindi">${p.hindi.replace(/\n/g,'<br>')}</div>` : ''}
      <div class="poem-footer">
        <div class="poem-poet-info">
          <div>
            <div class="poem-poet-name">${p.poet}</div>
            <div class="poem-poet-tag">${p.form}</div>
          </div>
        </div>
        <div class="poem-actions">
          <button class="btn-icon" title="Like" onclick="doLike(this,${p.id})"><i class="far fa-heart"></i></button>
          <button class="btn-icon" title="Save" onclick="doSave(${p.id})"><i class="fas fa-bookmark"></i></button>
          <button class="btn-icon" title="Share" onclick="doShare(${p.id})"><i class="fas fa-share-alt"></i></button>
          <button class="btn-icon" title="Copy" onclick="doCopy(${p.id})"><i class="fas fa-copy"></i></button>
        </div>
      </div>
      <div class="poem-likes"><i class="fas fa-heart"></i> ${fmt(p.likes)} likes</div>
    </article>
  `).join('');

  initReveal && initReveal();
}

async function doLike(btn, id) {
  btn.classList.toggle('liked');
  btn.querySelector('i').className = btn.classList.contains('liked') ? 'fas fa-heart' : 'far fa-heart';
  if (btn.classList.contains('liked')) {
    showToast('❤️ Liked!');
    const r = await NiharikaAPI.likePoem(id);
    if (r?.data?.likes) {
      const el = document.querySelector(`#pc-${id} .poem-likes`);
      if (el) el.innerHTML = `<i class="fas fa-heart"></i> ${fmt(r.data.likes)} likes`;
    }
  }
}

function doSave(id) {
  const p = FB_POEMS.find(x => x.id === id) || _poems.find(x => x.id === id);
  if (p) saveFav(p);
}

function doCopy(id) {
  const p = [..._poems, ...FB_POEMS].find(x => x.id === id);
  if (!p) return;
  navigator.clipboard.writeText(`${p.text}\n- ${p.poet}\n(Niharika - निहारिका)`).then(() => showToast('📋 Copied!'));
}

function doShare(id) {
  _shareId = id;
  document.getElementById('shareModal')?.classList.add('open');
}

// ── Poets Grid ────────────────────────────────────────
async function renderPoets(cat = 'all') {
  const grid = document.getElementById('poetsGrid');
  if (!grid) return;
  const data = await NiharikaAPI.getPoets(cat);
  const poets = data?.data || FB_POETS;

  grid.innerHTML = poets.map(p => `
    <a href="poet-profile.html?id=${p.id}" class="poet-card reveal">
      <div class="poet-avatar-wrap">
        <div class="poet-avatar" style="background:linear-gradient(135deg,${p.color},${p.color}99)">${p.initials}</div>
        ${p.tags?.includes('founder') ? '<div class="poet-founder-crown"><i class="fas fa-crown"></i></div>' : ''}
      </div>
      <div class="poet-name-en">${p.name}</div>
      <div class="poet-name-hi hindi">${p.hindi}</div>
      <div class="poet-era">${p.period}</div>
    </a>
  `).join('');
  initReveal && initReveal();
}

initTabPills && document.addEventListener('DOMContentLoaded', () => {
  initTabPills('.tab-pill', cat => renderPoets(cat));
});

// ── Kavita Grid ───────────────────────────────────────
async function renderKavita() {
  const grid = document.getElementById('kavitaGrid');
  if (!grid) return;
  const data = await NiharikaAPI.getPoems();
  const poems = data?.data || FB_POEMS;
  grid.innerHTML = poems.slice(0, 6).map(p => `
    <article class="kavita-card reveal">
      <div class="kavita-tags">
        <span class="kavita-tag primary">${p.form}</span>
        ${p.isRajanQuote ? '<span class="kavita-tag gold">Rajan Rai ⭐</span>' : ''}
      </div>
      <div class="kavita-text ${isHindi(p.text)?'hindi':''}">${p.text.replace(/\n/g,'<br>')}</div>
      <div class="kavita-footer">
        <span class="kavita-poet">${p.poet}</span>
        <span class="kavita-likes"><i class="fas fa-heart"></i> ${fmt(p.likes)}</span>
      </div>
    </article>
  `).join('');
  initReveal && initReveal();
}

// ── Categories ────────────────────────────────────────
async function renderCategories() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;
  const data = await NiharikaAPI.getCategories();
  const cats = data?.data || FB_CATEGORIES;
  grid.innerHTML = cats.map(c => `
    <div class="category-card reveal" onclick="showToast('Browsing ${c.name}...')">
      <span class="category-icon">${c.icon}</span>
      <div class="category-name">${c.name}</div>
      <div class="category-count">${c.count}</div>
    </div>
  `).join('');
  initReveal && initReveal();
}

// ── Videos ────────────────────────────────────────────
async function renderVideos() {
  const grid = document.getElementById('videosGrid');
  if (!grid) return;
  const data = await NiharikaAPI.getVideos();
  const videos = data?.data || FB_VIDEOS;
  grid.innerHTML = videos.map(v => `
    <article class="video-card reveal" onclick="showToast('▶ Playing: ${v.title}')">
      <div class="video-thumb" style="background:${v.bg}">
        <span class="video-letter hindi">${v.letter}</span>
        <div class="video-play"><i class="fas fa-play"></i></div>
        <span class="video-time">${v.duration}</span>
      </div>
      <div class="video-body">
        <div class="video-title">${v.title}</div>
        <div class="video-meta">
          <span class="video-poet-name">${v.poet}</span>
          <span><i class="fas fa-eye"></i> ${v.views}</span>
        </div>
      </div>
    </article>
  `).join('');
  initReveal && initReveal();
}

// ── Blog ──────────────────────────────────────────────
async function renderBlog() {
  const grid = document.getElementById('blogGrid');
  if (!grid) return;
  const data = await NiharikaAPI.getBlog(3);
  const posts = data?.data || FB_BLOG;
  grid.innerHTML = posts.map(b => `
    <article class="blog-card reveal" onclick="showToast('Reading: ${b.title.slice(0,30)}...')">
      <div class="blog-thumb" style="background:${b.bg}">
        <span>${b.emoji}</span>
        <span class="blog-label">${b.category}</span>
      </div>
      <div class="blog-body">
        <h3 class="blog-title">${b.title}</h3>
        <p class="blog-excerpt">${b.excerpt}</p>
        <div class="blog-meta">
          <span>${b.date}</span>
          <span class="blog-author"><i class="fas fa-feather-alt"></i> ${b.author}</span>
        </div>
      </div>
    </article>
  `).join('');
  initReveal && initReveal();
}

// ── Founder Section ───────────────────────────────────
async function renderFounderSection() {
  const philoEl = document.getElementById('founderPhilosophy');
  if (!philoEl) return;
  const data = await NiharikaAPI.getFounder();
  const quotes = data?.quotes || FB_QUOTES.slice(0, 3);

  philoEl.innerHTML = quotes.slice(0, 3).map(q => `
    <div class="philosophy-item" onclick="navigator.clipboard.writeText('${q.text} - ${q.author}').then(()=>showToast('📋 Copied!'))">
      <i class="fas fa-quote-left"></i>
      <p>"${q.text}"</p>
    </div>
  `).join('');

  if (data?.bio) {
    const bioEl = document.getElementById('founderBio');
    if (bioEl) bioEl.textContent = data.bio;
  }
}

// ── Word of the Day ───────────────────────────────────
const WOD_KEYS = Object.keys(FB_DICT);
let wodIdx = 0;

function initWordOfDay() {
  wodIdx = Math.floor(Math.random() * WOD_KEYS.length);
  updateWod(FB_DICT[WOD_KEYS[wodIdx]]);

  document.getElementById('wodSpeak')?.addEventListener('click', () => {
    const w = document.getElementById('wodRoman')?.textContent;
    if (!w) return;
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(w); u.lang = 'hi-IN'; speechSynthesis.speak(u);
      showToast('🔊 ' + w);
    } else showToast('Speech not supported');
  });

  document.getElementById('nextWodBtn')?.addEventListener('click', async () => {
    wodIdx = (wodIdx + 1) % WOD_KEYS.length;
    const key = WOD_KEYS[wodIdx];
    const r = await NiharikaAPI.lookupWord(key);
    updateWod(r?.data || FB_DICT[key]);
    showToast('Next word: ' + (r?.data?.word || FB_DICT[key]?.word));
  });
}

function updateWod(w) {
  if (!w) return;
  const s = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  const h = (id, v) => { const el = document.getElementById(id); if (el) el.innerHTML = v; };
  s('wodHindi',  w.hindi);
  s('wodRoman',  (w.word || '').toUpperCase());
  s('wodPos',    w.pos || '');
  h('wodMeaning', `<strong>Meaning:</strong> ${w.meaning}`);
  s('wodExample', w.example || '');
}

// ── Dictionary Widget ─────────────────────────────────
function initDictWidget() {
  const doSearch = async () => {
    const q = document.getElementById('dictInput')?.value.toLowerCase().trim();
    const result = document.getElementById('dictResult');
    if (!result) return;
    if (!q) { result.innerHTML = '<span style="color:var(--muted)">Enter a word.</span>'; return; }

    result.innerHTML = '<i class="fas fa-spinner fa-spin" style="color:var(--crimson)"></i> Searching...';
    const r = await NiharikaAPI.lookupWord(q);
    const data = r?.data || FB_DICT[q];

    if (data) {
      result.innerHTML = `
        <div style="margin-top:12px;padding:14px;background:var(--surface);border-radius:10px;border-left:3px solid var(--crimson)">
          <div class="hindi" style="font-size:30px;color:var(--crimson);font-weight:700">${data.hindi}</div>
          <div style="font-size:11px;font-weight:700;letter-spacing:1px;color:var(--muted);margin:4px 0">${data.word} · ${data.pos||''}</div>
          <div style="font-size:13px;color:var(--text)">${data.meaning}</div>
          ${data.example ? `<div class="hindi" style="font-size:13px;color:var(--muted);margin-top:6px;font-style:italic">${data.example}</div>` : ''}
        </div>
      `;
    } else {
      result.innerHTML = `<span style="color:var(--muted)">No results for "<strong>${q}</strong>". Try: doha, kavita, prem, virah, ras...</span>`;
    }
  };

  document.getElementById('dictSearchBtn')?.addEventListener('click', doSearch);
  document.getElementById('dictInput')?.addEventListener('keypress', e => { if (e.key === 'Enter') doSearch(); });
}

// ── Rajan Rai Quote Widget ────────────────────────────
function initQuoteWidget() {
  let idx = 0;
  const update = (q) => {
    const s = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    s('quoteText',   `"${q.text}"`);
    s('quoteHindi',  `"${q.hindi}"`);
    s('quoteAuthor', `- ${q.author}${q.isFounder ? ', Founder of Niharika' : ''}`);
  };

  async function loadQuotes() {
    const r = await NiharikaAPI.getQuotes(true);
    _quotes = r?.data?.length ? r.data : FB_QUOTES;
    // Get daily quote
    const d = await NiharikaAPI.getDailyQuote();
    if (d?.data) { idx = _quotes.findIndex(q => q.id === d.data.id); if (idx < 0) idx = 0; }
    update(_quotes[idx]);
  }
  loadQuotes();

  document.getElementById('nextQuoteBtn')?.addEventListener('click', () => {
    if (!_quotes.length) return;
    idx = (idx + 1) % _quotes.length;
    update(_quotes[idx]);
    showToast('✨ New thought by Rajan Rai');
  });
  document.getElementById('copyQuoteBtn')?.addEventListener('click', () => {
    const q = _quotes[idx];
    if (!q) return;
    navigator.clipboard.writeText(`"${q.text}"\n- ${q.author} (Niharika)`).then(() => showToast('📋 Copied!'));
  });
  document.getElementById('likeQuoteBtn')?.addEventListener('click', function() {
    this.querySelector('i').className = 'fas fa-heart'; this.style.color = 'var(--crimson)';
    showToast('❤️ Liked!');
  });
  document.getElementById('shareQuoteBtn')?.addEventListener('click', () => {
    const q = _quotes[idx];
    if (!q) return;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${q.text}"\n- ${q.author} (Niharika)`)}`, '_blank');
  });
}

// ── Quiz ──────────────────────────────────────────────
function initQuiz() {
  document.getElementById('startQuizBtn')?.addEventListener('click', async () => {
    if (!_quizQs.length) {
      const r = await NiharikaAPI.getQuiz();
      _quizQs = r?.data?.length ? [...r.data] : [...FB_QUIZ];
      _quizQs.sort(() => Math.random() - 0.5);
    }
    _qIdx = 0; _qScore = 0;
    renderQuizQ();
    document.getElementById('quizModal')?.classList.add('open');
  });
}

function renderQuizQ() {
  const el = document.getElementById('quizContent');
  if (!el) return;
  if (_qIdx >= _quizQs.length) { renderQuizResult(); return; }
  const q = _quizQs[_qIdx];
  const pct = Math.round((_qIdx / _quizQs.length) * 100);
  el.innerHTML = `
    <div class="quiz-progress"><div class="quiz-progress-bar" style="width:${pct}%"></div></div>
    <div class="quiz-meta">Q ${_qIdx+1} OF ${_quizQs.length} &nbsp;·&nbsp; SCORE: ${_qScore}</div>
    <div class="quiz-question">${q.question}</div>
    <div class="quiz-options">
      ${q.options.map((o,i) => `
        <button class="quiz-option" onclick="answerQ(this,${i},${q.answer})">
          <span class="quiz-option-letter">${String.fromCharCode(65+i)}</span>${o}
        </button>
      `).join('')}
    </div>
    <div id="qFeedback" style="margin-top:14px;min-height:20px;font-size:14px;color:var(--muted)"></div>
  `;
}

function answerQ(btn, sel, correct) {
  const opts = document.querySelectorAll('.quiz-option');
  opts.forEach(o => o.disabled = true);
  opts[correct].classList.add('correct');
  if (sel !== correct) {
    btn.classList.add('wrong');
    document.getElementById('qFeedback').innerHTML = `✗ Wrong! Correct: <strong>${opts[correct].textContent.trim()}</strong>`;
  } else {
    _qScore++;
    document.getElementById('qFeedback').innerHTML = `<span style="color:#22c55e">✓ Correct!</span>`;
  }
  setTimeout(() => { _qIdx++; renderQuizQ(); }, 1600);
}

function renderQuizResult() {
  const pct = Math.round((_qScore / _quizQs.length) * 100);
  const emoji = pct >= 80 ? '🏆' : pct >= 50 ? '📚' : '🌱';
  const msg = pct >= 80 ? 'Outstanding! You truly know Hindi poetry!' : pct >= 50 ? 'Good effort! Keep reading.' : 'Keep exploring Niharika to learn more!';
  document.getElementById('quizContent').innerHTML = `
    <div class="quiz-result">
      <div class="quiz-result-emoji">${emoji}</div>
      <h3 style="font-family:var(--font-display);font-size:28px;margin-bottom:10px">Quiz Complete!</h3>
      <div class="quiz-result-score">${_qScore}/${_quizQs.length}</div>
      <p style="color:var(--muted);margin-top:8px">${pct}% · ${msg}</p>
      <button class="btn btn-gold" style="margin-top:24px" onclick="_qIdx=0;_qScore=0;_quizQs.sort(()=>Math.random()-.5);renderQuizQ()">
        <i class="fas fa-redo"></i> Play Again
      </button>
    </div>
  `;
}

// ── Modals ────────────────────────────────────────────
function initModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
  });
  document.getElementById('closeQuizModal')?.addEventListener('click', () => document.getElementById('quizModal')?.classList.remove('open'));
  document.getElementById('closeShareModal')?.addEventListener('click', () => document.getElementById('shareModal')?.classList.remove('open'));

  document.querySelectorAll('.share-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = FB_POEMS.find(x => x.id === _shareId);
      if (!p) return;
      const txt = encodeURIComponent(`${p.text}\n- ${p.poet}\n(Niharika - Indian Poetry Platform)`);
      if (btn.classList.contains('share-wa'))  window.open(`https://api.whatsapp.com/send?text=${txt}`, '_blank');
      if (btn.classList.contains('share-tw'))  window.open(`https://twitter.com/intent/tweet?text=${txt}`, '_blank');
      if (btn.classList.contains('share-fb'))  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}`, '_blank');
      if (btn.classList.contains('share-cp'))  navigator.clipboard.writeText(location.href).then(() => showToast('🔗 Link copied!'));
      document.getElementById('shareModal')?.classList.remove('open');
    });
  });
}

// ── Newsletter ────────────────────────────────────────
function initNewsletterBtn() {
  document.getElementById('subscribeBtn')?.addEventListener('click', async () => {
    const email = document.getElementById('newsletterEmail')?.value.trim();
    if (!email?.includes('@')) return showToast('⚠️ Enter a valid email address');
    const r = await NiharikaAPI.subscribe(email);
    if (r?.success) {
      document.getElementById('newsletterEmail').value = '';
      showToast('🎉 ' + r.message);
    } else {
      showToast(r?.message || '⚠️ Something went wrong, try again');
    }
  });
}
