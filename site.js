/* SolvvSpace shared behaviour: header dropdowns, mobile menu, scroll reveal.
   Loaded once per page. Wrapped so nothing leaks into the global scope. */
(function () {
  'use strict';

  /* Scroll reveal */
  var items = document.querySelectorAll('.fu');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    items.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('vis');
      else io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add('vis'); });
  }

  /* Desktop dropdowns */
  function closeAll() {
    document.querySelectorAll('.dd.open').forEach(function (m) { m.classList.remove('open'); });
    document.querySelectorAll('.nav-dd-btn.open').forEach(function (b) {
      b.classList.remove('open'); b.setAttribute('aria-expanded', 'false');
    });
  }
  document.querySelectorAll('[data-dd]').forEach(function (btn) {
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var menu = document.getElementById(btn.getAttribute('data-dd'));
      if (!menu) return;
      var wasOpen = menu.classList.contains('open');
      closeAll();
      if (!wasOpen) { menu.classList.add('open'); btn.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest || !e.target.closest('.dd')) closeAll();
  });

  /* Mobile menu */
  var burger = document.getElementById('hburg');
  var panel = document.getElementById('mobm');
  var overlay = document.getElementById('mob-overlay');
  function setMenu(open) {
    if (!burger || !panel) return;
    panel.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (overlay) overlay.classList.toggle('open', open);
  }
  if (burger && panel) {
    burger.addEventListener('click', function () { setMenu(!panel.classList.contains('open')); });
    if (overlay) overlay.addEventListener('click', function () { setMenu(false); });
    panel.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    window.addEventListener('resize', function () { if (window.innerWidth > 960) setMenu(false); });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeAll(); setMenu(false); }
  });
})();
