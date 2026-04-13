/* ═══════════════════════════════════════
   SOLVVSPACE — SHARED JAVASCRIPT
═══════════════════════════════════════ */

/* ── SCROLL FADE ANIMATIONS ── */
function initFades() {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.10, rootMargin: '0px 0px -20px 0px' });
  els.forEach(el => obs.observe(el));
}

/* ── DROPDOWN MENUS ── */
function initDropdowns() {
  document.querySelectorAll('.nav-dd').forEach(dd => {
    const btn = dd.querySelector('.nav-dd-btn');
    const menu = dd.querySelector('.dd-menu, .hub-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.contains('open');
      closeAllDropdowns();
      if (!isOpen) {
        menu.classList.add('open');
        btn.classList.add('open');
      }
    });
  });

  document.addEventListener('click', closeAllDropdowns);
}

function closeAllDropdowns() {
  document.querySelectorAll('.dd-menu, .hub-menu').forEach(m => m.classList.remove('open'));
  document.querySelectorAll('.nav-dd-btn').forEach(b => b.classList.remove('open'));
}

/* ── MOBILE MENU ── */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

/* ── SUB TABS ── */
function initTabs() {
  document.querySelectorAll('.sub-tabs .stab').forEach(tab => {
    tab.addEventListener('click', function() {
      const tabs = this.closest('.sub-tabs').querySelectorAll('.stab');
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      const target = this.dataset.target;
      if (target) {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ── ACTIVE NAV LINK ── */
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && path.includes(href.replace('.html',''))) {
      a.classList.add('active');
    }
  });
}

/* ── INIT ALL ── */
document.addEventListener('DOMContentLoaded', () => {
  initFades();
  initDropdowns();
  initMobileMenu();
  initTabs();
  setActiveNav();
});
