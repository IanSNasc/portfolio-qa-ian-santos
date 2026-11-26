const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealItems = document.querySelectorAll('.reveal');
let revealObserver;
const revealEverything = () => {
  revealObserver?.disconnect();
  revealItems.forEach(item => item.classList.remove('is-pending'));
};
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('is-pending');
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, {threshold:0,rootMargin:'0px 0px -35px 0px'});
  revealItems.forEach(item => {
    if (item.getBoundingClientRect().top < window.innerHeight - 35) return;
    item.classList.add('is-pending');
    revealObserver.observe(item);
  });
}
reducedMotion.addEventListener('change', event => { if (event.matches) revealEverything(); });

const header = document.querySelector('.site-header');
const backTop = document.querySelector('.back-top');
let scrollFrame = 0;
const updateScroll = () => {
  const range = document.documentElement.scrollHeight - window.innerHeight;
  const progress = range > 0 ? Math.min(1,Math.max(0,window.scrollY / range)) : 0;
  document.documentElement.style.setProperty('--read-progress', progress);
  header.classList.toggle('is-scrolled', window.scrollY > 25);
  backTop.classList.toggle('is-visible', window.scrollY > window.innerHeight);
  scrollFrame = 0;
};
window.addEventListener('scroll', () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); }, {passive:true});
window.addEventListener('resize', () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); });
updateScroll();
backTop.addEventListener('click', () => {
  window.scrollTo({top:0,behavior:reducedMotion.matches ? 'instant' : 'smooth'});
  document.querySelector('.brand').focus({preventScroll:true});
});

const navigation = [...document.querySelectorAll('.site-header nav a')];
const sections = navigation.map(link => document.querySelector(link.getAttribute('href')));
if ('IntersectionObserver' in window) {
  const activeSections = new Set();
  // Keep one observer for all sections so updates share the same active set.
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) activeSections.add(entry.target); else activeSections.delete(entry.target); });
    const current = sections.find(section => activeSections.has(section));
    navigation.forEach(link => {
      if (current && link.getAttribute('href') === '#' + current.id) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
  }, {rootMargin:'-20% 0px -45% 0px',threshold:0});
  sections.filter(Boolean).forEach(section => observer.observe(section));
}

const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
document.querySelectorAll('.project-stage').forEach(stage => {
  let frame = 0;
  stage.addEventListener('pointermove', event => {
    if (!finePointer.matches || reducedMotion.matches || frame) return;
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    frame = requestAnimationFrame(() => {
      stage.style.setProperty('--tilt-x', `${-y * 2}deg`);
      stage.style.setProperty('--tilt-y', `${x * 2}deg`);
      frame = 0;
    });
  });
  const reset = () => {
    cancelAnimationFrame(frame); frame = 0;
    stage.style.removeProperty('--tilt-x');
    stage.style.removeProperty('--tilt-y');
  };
  stage.addEventListener('pointerleave',reset);
  reducedMotion.addEventListener('change',reset);
});
const hero = document.querySelector('.editorial-hero');
let glowFrame = 0;
hero.addEventListener('pointermove', event => {
  if (!finePointer.matches || reducedMotion.matches || glowFrame) return;
  const rect = hero.getBoundingClientRect();
  glowFrame = requestAnimationFrame(() => {
    hero.style.setProperty('--glow-x', `${(event.clientX - rect.left) / rect.width * 100}%`);
    hero.style.setProperty('--glow-y', `${(event.clientY - rect.top) / rect.height * 100}%`);
    glowFrame = 0;
  });
});
hero.addEventListener('pointerleave', () => {
  cancelAnimationFrame(glowFrame); glowFrame = 0;
  hero.style.removeProperty('--glow-x'); hero.style.removeProperty('--glow-y');
});
