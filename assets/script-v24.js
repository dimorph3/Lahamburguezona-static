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

const ingredients = document.querySelector('.ingredient-section');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
function playIngredients() {
 if (!ingredients || motion.matches) return;
 ingredients.classList.remove('is-entering');
 void ingredients.offsetWidth;
 ingredients.classList.add('is-entering');
}
if (ingredients && 'IntersectionObserver' in window) {
 const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) playIngredients(); });
 }, {threshold:0.2});
 observer.observe(ingredients);
}
document.querySelector('.replay-ingredients')?.addEventListener('click', playIngredients);
