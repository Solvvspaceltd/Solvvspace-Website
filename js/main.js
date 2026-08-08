/* ═══════════════════════════════════════════════════════════
   SOLVVSPACE — SHARED SCRIPT
   Scroll-fade reveal, dropdown menus, and the mobile hamburger
   menu, shared across every page. Referenced via
   <script src="js/main.js"></script>.
═══════════════════════════════════════════════════════════ */

// Scroll fade
const _obs=new IntersectionObserver(
  es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('vis');}),
  {threshold:.08,rootMargin:'0px 0px -20px 0px'}
);
document.querySelectorAll('.fu').forEach(el=>{
  if(el.getBoundingClientRect().top<window.innerHeight)el.classList.add('vis');
  else _obs.observe(el);
});

// Dropdowns
function closeAll(){
  document.querySelectorAll('.dd.open,.mega.open').forEach(m=>m.classList.remove('open'));
  document.querySelectorAll('.nav-dd-btn.open').forEach(b=>{b.classList.remove('open');b.setAttribute('aria-expanded','false');});
}
document.querySelectorAll('[data-dd]').forEach(btn=>{
  btn.addEventListener('click',e=>{
    e.stopPropagation();
    const id=btn.dataset.dd;
    const menu=document.getElementById(id);
    if(!menu)return;
    const isOpen=menu.classList.contains('open');
    closeAll();
    if(!isOpen){menu.classList.add('open');btn.classList.add('open');btn.setAttribute('aria-expanded','true');}
  });
});
document.addEventListener('click',closeAll);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAll();});

// Mobile menu
const hburg=document.getElementById('hburg');
const mobm=document.getElementById('mobm');
if(hburg&&mobm){
  hburg.addEventListener('click',()=>{
    const open=mobm.classList.toggle('open');
    hburg.classList.toggle('open',open);
    hburg.setAttribute('aria-expanded',open);
    document.body.style.overflow=open?'hidden':'';
  });
  mobm.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click',()=>{
      mobm.classList.remove('open');
      hburg.classList.remove('open');
      hburg.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    });
  });
}
