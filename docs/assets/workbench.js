const workbench = document.querySelector('[data-workbench]');
const tabs = [...workbench.querySelectorAll('[data-workbench-tab]')];
const panels = [...workbench.querySelectorAll('[role="tabpanel"]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function selectTab(key, focus = false) {
  const active = tabs.find(tab => tab.dataset.workbenchTab === key);
  if (!active) return;
  tabs.forEach(tab => {
    const selected = tab === active;
    tab.setAttribute('aria-selected',String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  panels.forEach(panel => { panel.hidden = panel.id !== active.getAttribute('aria-controls'); });
  if (focus) active.focus({preventScroll:true});
  const panel = document.getElementById(active.getAttribute('aria-controls'));
  if (!reducedMotion.matches) panel.animate([{opacity:.4,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:220,easing:'ease-out'});
}
workbench.querySelector('[role="tablist"]').hidden = false;
selectTab('development');
tabs.forEach((tab,index) => {
  tab.addEventListener('click',() => selectTab(tab.dataset.workbenchTab));
  tab.addEventListener('keydown',event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    let next;
    if (event.key === 'ArrowRight') next = (index+1)%tabs.length;
    if (event.key === 'ArrowLeft') next = (index-1+tabs.length)%tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length-1;
    if (next === undefined) return;
    event.preventDefault();
    selectTab(tabs[next].dataset.workbenchTab,true);
  });
});
document.querySelectorAll('[data-open-workbench]').forEach(link => link.addEventListener('click',event => {
  event.preventDefault();
  selectTab(link.dataset.openWorkbench,true);
  const target = document.querySelector(link.getAttribute('href'));
  if (window.location.hash !== link.getAttribute('href')) history.pushState(null,'',link.getAttribute('href'));
  target.scrollIntoView({behavior:reducedMotion.matches ? 'auto' : 'smooth',block:'start'});
}));
