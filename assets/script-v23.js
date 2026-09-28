const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
function closeMenu() {
  nav?.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
  toggle?.setAttribute('aria-label', 'Open menu');
}
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
const scene = document.querySelector('.burger-scene');
const layers = document.querySelector('.burger-layers');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let scheduled = false;
function drawBurger() {
  scheduled = false;
  if (!scene || !layers) return;
  const rect = scene.getBoundingClientRect();
  const start = innerHeight * .92;
  const progress = (reducedMotion.matches || scrollY <= 1) ? 0 : Math.max(0, Math.min(1, (start - rect.top) / Math.max(180, innerHeight * .45)));
  layers.style.setProperty('--spread', `${(progress * Math.min(34, rect.width * .07)).toFixed(2)}px`);
}
function schedule() { if (!scheduled) { scheduled = true; requestAnimationFrame(drawBurger); } }
addEventListener('scroll', schedule, {passive:true});
addEventListener('resize', schedule, {passive:true});
reducedMotion.addEventListener('change', schedule);
drawBurger();
