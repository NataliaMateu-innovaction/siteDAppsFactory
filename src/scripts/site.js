/* ============================================================================
   Comportamiento de la home — portado 1:1 desde la clase React del componente
   de Design (Component extends DCLogic).

   Qué cambió y qué no:
   · layout()  → se fue entero a CSS (src/styles/layout.css). Era lo único que
                 obligaba a esperar el JS para ver la página bien maquetada.
   · setState  → se reemplazó por escritura directa al DOM. El estado era solo
                 { open, active }: el acordeón de FAQ y el índice de Servicios.
   · Todo lo demás (scrub, reveals, count-up, parallax, magnético, video) es la
     misma lógica imperativa que ya tenía: no dependía de React.

   Los valores de animación no se tocaron.
   ========================================================================== */

const root = document.querySelector('[data-ref="root"]');
if (root) init(root);

function init(root) {
  const $ = (s, c = root) => c.querySelector(s);
  const $$ = (s, c = root) => Array.from(c.querySelectorAll(s));
  const ref = (n) => $('[data-ref="' + n + '"]');

  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mq = {
    sm: window.matchMedia('(min-width:641px)'),
    md: window.matchMedia('(min-width:769px)'),
    lg: window.matchMedia('(min-width:1025px)')
  };
  const S = (k, v) => root.style.setProperty(k, v);

  const nav = ref('nav');
  const pre = ref('pre');
  const panel = ref('panel');
  const panelWrap = ref('panelWrap');
  const video = ref('video');
  const poster = ref('poster');

  let scrolls = 0;
  let shown = new Set();

  /* ---- preloader: una sola vez por sesión ------------------------------- */
  (function preloader() {
    if (!pre) return;
    let seen = false;
    try { seen = sessionStorage.getItem('df_preloader') === '1'; } catch (e) {}
    if (seen || reduced()) { pre.style.display = 'none'; return; }
    try { sessionStorage.setItem('df_preloader', '1'); } catch (e) {}
    pre.style.opacity = '1';
    setTimeout(() => { pre.style.transform = 'translateY(-100%)'; }, 760);
    setTimeout(() => { pre.style.display = 'none'; }, 1320);
  })();

  /* ---- menú mobile ------------------------------------------------------ */
  let menuOpen = false;
  function setMenu(v) {
    menuOpen = v;
    if (panelWrap) {
      panelWrap.style.visibility = v ? 'visible' : 'hidden';
      panelWrap.style.opacity = v ? '1' : '0';
    }
    if (panel) panel.style.transform = v ? 'translateX(0)' : 'translateX(100%)';
    document.body.style.overflow = v ? 'hidden' : '';
    const btn = $('[data-menu-toggle]');
    if (btn) btn.setAttribute('aria-expanded', String(v));
  }
  $$('[data-menu-toggle]').forEach((b) => b.addEventListener('click', () => setMenu(!menuOpen)));
  $$('[data-menu-close]').forEach((b) => b.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menuOpen) setMenu(false); });

  /* ---- acordeón de FAQ -------------------------------------------------- */
  let openFaq = -1;
  const faqBtns = $$('[data-faq-toggle]');
  function paintFaq() {
    faqBtns.forEach((btn) => {
      const i = Number(btn.getAttribute('data-faq-toggle'));
      const on = openFaq === i;
      btn.setAttribute('aria-expanded', on ? 'true' : 'false');
      const plus = btn.querySelector('span[aria-hidden="true"]');
      if (plus) plus.style.transform = 'rotate(' + (on ? '45deg' : '0deg') + ')';
      const pane = document.getElementById('faq-panel-' + i);
      if (pane) pane.style.gridTemplateRows = on ? '1fr' : '0fr';
    });
  }
  faqBtns.forEach((btn) => btn.addEventListener('click', () => {
    const i = Number(btn.getAttribute('data-faq-toggle'));
    openFaq = openFaq === i ? -1 : i;
    paintFaq();
  }));
  paintFaq();

  /* ---- índice de Servicios ---------------------------------------------- */
  let active = 0;
  const panels = [0, 1, 2].map((i) => $('[data-panel="' + i + '"]')).filter(Boolean);
  const idxItems = $$('[data-idx]');
  function paintIdx() {
    idxItems.forEach((el) => {
      const i = Number(el.getAttribute('data-idx'));
      const on = active === i;
      el.style.opacity = on ? '1' : '0.38';
      el.setAttribute('aria-current', on ? 'true' : 'false');
      const bar = el.querySelector('[data-bar]');
      if (bar) bar.style.transform = 'scaleX(' + (on ? 1 : 0) + ')';
    });
  }
  $$('[data-go-panel]').forEach((btn) => btn.addEventListener('click', () => {
    const i = Number(btn.getAttribute('data-go-panel'));
    const p = panels[i];
    if (!p) return;
    const r = p.getBoundingClientRect();
    const target = Math.max(0, window.scrollY + r.top - Math.max(0, (window.innerHeight - r.height) / 2));
    window.scrollTo({ top: target, behavior: reduced() ? 'auto' : 'smooth' });
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

  /* ---- reveals y count-up ----------------------------------------------- */
  function countUp(el, raw) {
    const m = String(raw).match(/^([^0-9]*)([0-9]+(?:[.,][0-9]+)?)(.*)$/);
    if (!m || reduced()) { el.textContent = raw; return; }
    const pre_ = m[1], num = parseFloat(m[2].replace(',', '.')), suf = m[3];
    const dec = m[2].includes(',') || m[2].includes('.') ? 1 : 0;
    const t0 = performance.now(), dur = 1400;
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(2, -10 * p);
      el.textContent = pre_ + (num * e).toFixed(dec).replace('.', ',') + suf;
      if (p < 1) requestAnimationFrame(step); else el.textContent = raw;
    };
    requestAnimationFrame(step);
  }
  function revealAll() {
    $$('[data-reveal]').forEach((el) => { shown.add(el); el.style.opacity = '1'; el.style.transform = 'none'; });
    $$('[data-count]').forEach((el) => { const v = el.getAttribute('data-count'); if (v) el.textContent = v; });
  }
  if (reduced()) {
    revealAll();
    S('--cut', '0px');
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const d = parseInt(el.getAttribute('data-delay') || '0', 10);
        setTimeout(() => { shown.add(el); el.style.opacity = '1'; el.style.transform = 'none'; }, d);
        io.unobserve(el);
        const c = el.getAttribute('data-count');
        if (c) countUp(el, c);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
    $$('[data-reveal],[data-count]').forEach((el) => io.observe(el));
    // red de seguridad: si algo nunca intersecta, mostrarlo igual
    setTimeout(revealAll, 3500);
  }

  /* ---- hovers ----------------------------------------------------------- */
  const fine = window.matchMedia('(pointer:fine)').matches;
  $$('[data-navlinks] a').forEach((a) => {
    a.addEventListener('mouseenter', () => { a.style.color = 'var(--text-on-dark)'; });
    a.addEventListener('mouseleave', () => { a.style.color = 'var(--muted-on-dark)'; });
  });
  const ul = $('[data-underline]');
  if (ul) {
    const bar = ul.querySelector('[data-ul]');
    ul.addEventListener('mouseenter', () => { if (bar) bar.style.transform = 'scaleX(1)'; });
    ul.addEventListener('mouseleave', () => { if (bar) bar.style.transform = 'scaleX(0.2)'; });
  }
  if (fine && !reduced()) {
    $$('[data-row]').forEach((row) => {
      const t = row.querySelector('[data-rowtitle]');
      const ar = row.querySelector('[data-rowarrow]');
      const ln = row.querySelector('[data-rowline]');
      row.addEventListener('mouseenter', () => {
        row.style.background = 'rgba(255,255,255,0.03)';
        if (t) t.style.transform = 'translateX(8px)';
        if (ar) ar.style.transform = 'translate(6px,-6px)';
        if (ln) ln.style.transform = 'scaleX(1)';
      });
      row.addEventListener('mouseleave', () => {
        row.style.background = 'transparent';
        if (t) t.style.transform = 'none';
        if (ar) ar.style.transform = 'none';
        if (ln) ln.style.transform = 'scaleX(0)';
      });
    });
    $$('[data-cta],[data-navcta]').forEach((b) => {
      b.addEventListener('mouseenter', () => { b.style.filter = 'brightness(1.08)'; });
      b.addEventListener('mouseleave', () => { b.style.filter = 'none'; });
    });
    // botón magnético
    const mag = $$('[data-magnetic]');
    if (mag.length) {
      window.addEventListener('mousemove', (e) => {
        mag.forEach((el) => {
          const r = el.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            const k = 6 / Math.max(dist, 24);
            el.style.transform = 'translate(' + (dx * k).toFixed(2) + 'px,' + (dy * k).toFixed(2) + 'px)';
          } else if (el.style.transform) {
            el.style.transform = 'translate(0,0)';
          }
        });
      }, { passive: true });
    }
  }

  /* ---- video del hero ---------------------------------------------------- */
  if (video) {
    if (reduced()) {
      video.pause();
      video.removeAttribute('autoplay');
      video.style.display = 'none';
      if (poster) poster.style.display = 'block';
    } else {
      const tryPlay = () => {
        const r = video.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        if (video.paused) { const pr = video.play(); if (pr && pr.catch) pr.catch(() => {}); }
      };
      video.muted = true;
      tryPlay();
      setInterval(tryPlay, 1500);
      ['loadeddata', 'canplay', 'stalled', 'suspend'].forEach((ev) => video.addEventListener(ev, tryPlay));
      document.addEventListener('visibilitychange', tryPlay);
      window.addEventListener('pointerdown', tryPlay, { once: true });
    }
  }

  /* ---- rail del proceso -------------------------------------------------- */
  function syncRail() {
    const rail = $('[data-rail]');
    if (!rail) return;
    const wrap = rail.parentElement;
    const nums = [1, 2, 3].map((i) => $('[data-num="' + i + '"]'));
    if (nums.some((n) => !n)) return;
    if (mq.md.matches) {
      const anchor = nums[1].parentElement;
      rail.style.left = Math.max(0, anchor.getBoundingClientRect().left - wrap.getBoundingClientRect().left - 24) + 'px';
    } else {
      rail.style.left = '0px';
    }
    const offTop = (el) => { let y = 0, n = el; while (n && n !== wrap) { y += n.offsetTop; n = n.offsetParent; } return y; };
    const centers = nums.map((n) => offTop(n) + n.offsetHeight / 2);
    const span = centers[2] - centers[0];
    if (span <= 0) return;
    rail.style.top = (centers[0] - 3.5) + 'px';
    rail.style.height = span + 'px';
    const l0 = rail.querySelector('[data-railline]');
    if (l0) { l0.style.top = '3.5px'; l0.style.height = span + 'px'; }
    rail.querySelectorAll('[data-node]').forEach((n, i) => { n.style.top = (centers[i] - centers[0]) + 'px'; });
    if (scrolls < 2) return;
    const wr = wrap.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (window.innerHeight * 0.75 - (wr.top + centers[0])) / Math.max(1, span)));
    if (l0) l0.style.transform = 'scaleY(' + p.toFixed(3) + ')';
    rail.querySelectorAll('[data-node]').forEach((n, i) => {
      n.style.opacity = p >= i / 2 - 0.001 ? '1' : '0.25';
    });
  }

  /* ---- scroll driver ----------------------------------------------------- */
  const prog = (el, extra) => {
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    return Math.max(0, Math.min(1, (window.innerHeight - r.top) / (r.height + (extra || 0))));
  };

  function tick() {
    syncActive();
    syncRail();
    const y = window.scrollY || window.pageYOffset;

    if (nav) {
      const on = y > 80;
      // Alto: 104px arriba, 88px scrolleado (logo 56px + padding). El padding se
      // ajustó al agrandar el logo para que la barra no siguiera creciendo.
      // Conserva el gesto de compresión de 16px del diseño original.
      nav.style.padding = on ? '16px 0' : '24px 0';
      // 0.90 y no 0.55: con 0.55 el nav sobre las secciones claras compone a
      // ~#727170 y los links (#8A8A94) caían a 1,42:1 — gris sobre gris. Con
      // 0.90 compone a ~#1E1D1D y dan 4,88:1. El efecto vidrio lo da el blur,
      // no la transparencia, así que no se pierde.
      nav.style.background = on ? 'rgba(6,6,7,0.90)' : 'transparent';
      nav.style.backdropFilter = on ? 'blur(16px)' : 'none';
      nav.style.borderBottomColor = on ? 'var(--hairline-dark)' : 'transparent';
    }

    if (reduced()) return;

    S('--hero-p', String(Math.max(0, Math.min(1, y / Math.max(1, window.innerHeight * 0.85)))));

    const svc = $('[data-sec="svc"]');
    if (svc) {
      const rect = svc.getBoundingClientRect();
      const enter = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / 400));
      S('--cut', (72 * (1 - enter)).toFixed(1) + 'px');
      S('--svc', prog(svc, -window.innerHeight * 0.4).toFixed(3));
    }

    const proc = $('[data-sec="proc"]');
    if (proc) {
      const p = prog(proc, -window.innerHeight * 0.35);
      S('--proc', p.toFixed(3));
      [1, 2, 3, 4].forEach((i) => S('--s' + i, p > (i - 0.6) / 4 ? '1' : '0'));
    }

    const awrap = $('[data-archwrap]');
    if (awrap && mq.lg.matches && scrolls >= 1) {
      const rect = awrap.getBoundingClientRect();
      const dist = Math.max(1, rect.height - window.innerHeight);
      const p = Math.max(0, Math.min(1, (-rect.top) / dist));
      S('--arch', p.toFixed(3));
      S('--la', p > 0.35 ? '1' : '0');
      S('--lb', p > 0.5 ? '1' : '0');
      S('--lc', p > 0.65 ? '1' : '0');
    } else if (awrap && !mq.lg.matches) {
      // sin pin: capas en reposo y labels siempre visibles
      S('--arch', '0');
      S('--la', '1'); S('--lb', '1'); S('--lc', '1');
    }

    $$('[data-parallax]').forEach((img) => {
      if (!mq.md.matches) { img.style.transform = 'none'; return; }
      const rect = img.getBoundingClientRect();
      const mid = rect.top + rect.height / 2 - window.innerHeight / 2;
      const f = parseFloat(img.getAttribute('data-parallax'));
      img.style.transform = 'translate3d(0,' + (mid * (1 - f) * -1).toFixed(1) + 'px,0)';
    });
  }

  window.addEventListener('scroll', () => { scrolls++; tick(); }, { passive: true });
  window.addEventListener('resize', tick);
  tick();
  setInterval(tick, 500);
}
