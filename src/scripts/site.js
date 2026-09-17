/* ============================================================================
   Comportamiento de la home, portado desde la clase React del export de
   Claude Design a vanilla JS. Los valores de animación son los mismos.

   Qué hace:
   · scroll driver → escribe --hero-p, --cut, --svc, --proc, --s1..4, --arch,
     --la/lb/lc en :root; el CSS hace el resto
   · nav comprimido + botón "volver arriba"
   · menú mobile
   · índice de Servicios (fallback para browsers sin scroll-driven animations)
   · acordeón de FAQ
   · botones magnéticos
   · mantener el video del hero reproduciendo

   Qué NO hace: layout. Todo el responsive vive en global.css.
   ========================================================================== */

const root = document.documentElement;
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
const S = (k, v) => root.style.setProperty(k, v);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const mqMd = window.matchMedia('(min-width: 769px)');
const mqLg = window.matchMedia('(min-width: 1025px)');
const finePointer = window.matchMedia('(pointer: fine)').matches;

/* ---- scroll animado ------------------------------------------------------
   Para el botón "volver arriba" y los anclas del menú: se ve el recorrido en
   vez de saltar. La duración crece con la distancia (0,5 s a 1,4 s) y se
   cancela si el usuario mueve la rueda o toca la pantalla. */
const NAV_OFFSET = 104; // = scroll-padding-top en global.css
let scrollAnim = 0;
// `target` puede ser un número o una función: el destino se recalcula en cada
// frame porque el corte diagonal de Soluciones (--cut) mueve el layout hasta
// 72px mientras se scrollea.
function scrollToY(target) {
  const maxY = () => document.documentElement.scrollHeight - window.innerHeight;
  const dest = () => Math.max(0, Math.min(typeof target === 'function' ? target() : target, maxY()));
  if (reduced) { window.scrollTo(0, dest()); return; }
  cancelAnimationFrame(scrollAnim);
  const start = window.scrollY;
  const dist0 = dest() - start;
  if (Math.abs(dist0) < 2) return;
  const dur = Math.min(1400, Math.max(500, Math.abs(dist0) * 0.12));
  const t0 = performance.now();
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const cancel = () => cancelAnimationFrame(scrollAnim);
  window.addEventListener('wheel', cancel, { once: true, passive: true });
  window.addEventListener('touchstart', cancel, { once: true, passive: true });
  const step = (now) => {
    const p = Math.min(1, (now - t0) / dur);
    window.scrollTo(0, start + (dest() - start) * ease(p));
    if (p < 1) scrollAnim = requestAnimationFrame(step);
  };
  scrollAnim = requestAnimationFrame(step);
}
// Anclas "#id" y "/#id" (estas últimas, solo cuando ya estamos en la home;
// desde /blog o /contacto navegan normalmente).
const onHome = location.pathname === '/' || location.pathname === '/index.html';
$$('a[href^="#"], a[href^="/#"]').forEach((a) => a.addEventListener('click', (e) => {
  const href = a.getAttribute('href');
  if (href.startsWith('/') && !onHome) return;
  const id = href.slice(href.indexOf('#') + 1);
  if (id === 'top') { e.preventDefault(); scrollToY(0); history.replaceState(null, '', location.pathname + location.search); return; }
  const el = id && document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  scrollToY(() => el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET);
  history.replaceState(null, '', '#' + id);
}));

/* ---- menú mobile ------------------------------------------------------- */
const panelWrap = $('[data-panel-wrap]');
const menuBtn = $('[data-menu-toggle]');
let menuOpen = false;
function setMenu(v) {
  menuOpen = v;
  if (panelWrap) panelWrap.classList.toggle('is-open', v);
  if (menuBtn) menuBtn.setAttribute('aria-expanded', String(v));
  document.body.style.overflow = v ? 'hidden' : '';
}
if (menuBtn) menuBtn.addEventListener('click', () => setMenu(!menuOpen));
$$('[data-menu-close]').forEach((el) => el.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menuOpen) setMenu(false); });

/* ---- acordeón de FAQ ---------------------------------------------------- */
const faqBtns = $$('[data-faq-toggle]');
faqBtns.forEach((btn) => btn.addEventListener('click', () => {
  const open = btn.getAttribute('aria-expanded') === 'true';
  faqBtns.forEach((b) => b.setAttribute('aria-expanded', 'false'));
  btn.setAttribute('aria-expanded', open ? 'false' : 'true');
}));

// "Ver más preguntas": despliega las plegadas y se convierte en "Ver menos".
const faqMoreBtn = $('[data-faq-more]');
const faqMore = $('#faq-more');
if (faqMoreBtn && faqMore) {
  const label = $('[data-faq-more-label]', faqMoreBtn);
  const more = label ? label.textContent : '';
  faqMoreBtn.addEventListener('click', () => {
    const open = faqMore.hidden;
    faqMore.hidden = !open;
    faqMoreBtn.setAttribute('aria-expanded', String(open));
    faqMoreBtn.classList.toggle('is-open', open);
    if (label) label.textContent = open ? 'Ver menos preguntas' : more;
    if (!open) scrollToY(() => faqMoreBtn.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.6);
  });
}

/* ---- índice de Servicios ------------------------------------------------ */
const panels = [0, 1, 2].map((i) => $('[data-panel="' + i + '"]')).filter(Boolean);
const idxBtns = $$('[data-idx]');
let active = 0;
function paintIdx() {
  idxBtns.forEach((el) => {
    el.setAttribute('aria-current', Number(el.getAttribute('data-idx')) === active ? 'true' : 'false');
  });
}
idxBtns.forEach((btn) => btn.addEventListener('click', () => {
  const i = Number(btn.getAttribute('data-idx'));
  const p = panels[i];
  if (!p) return;
  scrollToY(() => {
    const r = p.getBoundingClientRect();
    return window.scrollY + r.top - Math.max(0, (window.innerHeight - r.height) / 2);
  });
  active = i;
  paintIdx();
}));
function syncActive() {
  if (!panels.length) return;
  const ih = window.innerHeight;
  let best = null, bestD = Infinity;
  panels.forEach((p, i) => {
    const r = p.getBoundingClientRect();
    const d = Math.abs((r.top + r.height / 2) - ih * 0.45);
    if (r.bottom > ih * 0.1 && r.top < ih * 0.9 && d < bestD) { bestD = d; best = i; }
  });
  if (best !== null && best !== active) { active = best; paintIdx(); }
}
paintIdx();

/* ---- botones magnéticos ------------------------------------------------- */
const magnetic = $$('[data-magnetic]');
if (magnetic.length && finePointer && !reduced) {
  window.addEventListener('mousemove', (e) => {
    magnetic.forEach((el) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      if (dist < 120) {
        const k = 6 / Math.max(dist, 24);
        el.style.transform = 'translate(' + (dx * k).toFixed(2) + 'px,' + (dy * k).toFixed(2) + 'px)';
      } else if (el.style.transform) {
        el.style.transform = '';
      }
    });
  }, { passive: true });
}

/* ---- video del hero ----------------------------------------------------- */
const video = $('[data-hero-video]');
if (video) {
  if (reduced) {
    video.pause();
    video.removeAttribute('autoplay');
  } else {
    const tryPlay = () => {
      const r = video.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      if (video.paused) { const p = video.play(); if (p && p.catch) p.catch(() => {}); }
    };
    video.muted = true;
    tryPlay();
    ['loadeddata', 'canplay', 'stalled', 'suspend'].forEach((ev) => video.addEventListener(ev, tryPlay));
    document.addEventListener('visibilitychange', tryPlay);
    window.addEventListener('pointerdown', tryPlay, { once: true });
    video.addEventListener('pause', () => setTimeout(tryPlay, 60));
  }
}

/* ---- scroll driver ------------------------------------------------------ */
const nav = $('[data-nav]');
const btt = $('[data-btt]');
const svc = $('[data-sec="svc"]');
const proc = $('[data-sec="proc"]');
const archWrap = $('[data-archwrap]');

const prog = (el, extra) => {
  const r = el.getBoundingClientRect();
  return Math.max(0, Math.min(1, (window.innerHeight - r.top) / (r.height + (extra || 0))));
};

let scrolls = 0;
function tick() {
  const y = window.scrollY || window.pageYOffset;
  const ih = window.innerHeight;

  if (nav) nav.classList.toggle('is-scrolled', y > 80);
  if (btt) btt.classList.toggle('is-visible', y > 600);
  syncActive();

  if (reduced) return;

  S('--hero-p', String(Math.max(0, Math.min(1, y / Math.max(1, ih * 0.85)))));

  if (svc) {
    const rect = svc.getBoundingClientRect();
    const enter = Math.max(0, Math.min(1, (ih - rect.top) / 400));
    S('--cut', (72 * (1 - enter)).toFixed(1) + 'px');
    S('--svc', prog(svc, -ih * 0.4).toFixed(3));
  }

  if (proc) {
    const p = prog(proc, -ih * 0.35);
    S('--proc', p.toFixed(3));
    for (let i = 1; i <= 4; i++) S('--s' + i, p > (i - 0.6) / 4 ? '1' : '0');
  }

  if (archWrap) {
    if (mqLg.matches) {
      // Pinned: las capas se abren y los labels aparecen al avanzar el pin.
      // Hasta el primer scroll real queda en reposo (labels ocultos).
      if (scrolls >= 1) {
        const rect = archWrap.getBoundingClientRect();
        const dist = Math.max(1, rect.height - ih);
        const p = Math.max(0, Math.min(1, (-rect.top) / dist));
        S('--arch', p.toFixed(3));
        S('--la', p > 0.35 ? '1' : '0');
        S('--lb', p > 0.5 ? '1' : '0');
        S('--lc', p > 0.65 ? '1' : '0');
      } else {
        S('--arch', '0');
        S('--la', '0'); S('--lb', '0'); S('--lc', '0');
      }
    } else {
      // Sin pin: capas en reposo y labels siempre visibles.
      S('--arch', '0');
      S('--la', '1'); S('--lb', '1'); S('--lc', '1');
    }
  }
}

let raf = 0;
const schedule = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; tick(); }); };
window.addEventListener('scroll', () => { scrolls++; schedule(); }, { passive: true });
window.addEventListener('resize', schedule);
mqMd.addEventListener('change', schedule);
mqLg.addEventListener('change', schedule);
tick();
