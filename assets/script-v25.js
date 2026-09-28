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


const ingredients=document.querySelector('.ingredient-section');
const motion=matchMedia('(prefers-reduced-motion: reduce)');
const phone=matchMedia('(max-width:700px)');
const groupButtons=[...document.querySelectorAll('[data-ingredient-group]')];
let groupIndex=0,timer=null,inView=false,paused=false;
const pauseButton=document.querySelector('.ingredient-pause');
function stopGroups(){clearTimeout(timer);timer=null;}
function showGroup(index){groupIndex=index;document.querySelectorAll('.mobile-ingredient-group').forEach((g,i)=>g.classList.toggle('active',i===index));groupButtons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));}
function scheduleGroup(){stopGroups();if(!inView||paused||motion.matches||!phone.matches)return;timer=setTimeout(()=>{showGroup((groupIndex+1)%4);scheduleGroup();},4200);}
function playIngredients(){if(!ingredients)return;stopGroups();paused=false;pauseButton.textContent='Pause animation';showGroup(0);if(!motion.matches){ingredients.classList.remove('is-entering');void ingredients.offsetWidth;ingredients.classList.add('is-entering');}scheduleGroup();}
groupButtons.forEach(b=>b.addEventListener('click',()=>{paused=true;stopGroups();showGroup(Number(b.dataset.ingredientGroup));pauseButton.textContent='Play animation';}));
pauseButton?.addEventListener('click',()=>{paused=!paused;pauseButton.textContent=paused?'Play animation':'Pause animation';if(paused)stopGroups();else scheduleGroup();});
const observed=phone.matches?document.querySelector('.mobile-burger-diagram'):document.querySelector('.ingredient-diagram');
if(observed&&'IntersectionObserver'in window){new IntersectionObserver(entries=>{entries.forEach(e=>{inView=e.isIntersecting;if(inView)playIngredients();else stopGroups();});},{threshold:.45}).observe(observed);}
document.querySelector('.replay-ingredients')?.addEventListener('click',playIngredients);
motion.addEventListener('change',()=>{stopGroups();scheduleGroup();});
phone.addEventListener('change',scheduleGroup);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopGroups();else scheduleGroup();});
