const projects = {
  condosphere: {
    title: 'CondoSphere', category: 'GESTÃO CONDOMINIAL', summary: 'Gestão condominial · React + TypeScript',
    url: 'https://condosphere.netlify.app/demo/gestao', link: 'Abrir demonstração',
    provenance: 'Captura da demonstração pública · 25/11/2026',
    screens: [
      { file: 'condosphere-visao-geral.jpg', title: 'Visão geral', alt: 'Visão geral da demonstração pública do CondoSphere', context: 'Demonstração pública com unidades, moradores, comunicados e atalhos de gestão.' },
      { file: 'condosphere-reservas.jpg', title: 'Reservas', alt: 'Tela de reservas na demonstração pública do CondoSphere', context: 'Fluxo de reservas da demonstração pública, com dados fictícios e alterações locais à página.' }
    ]
  },
  pmba: {
    title: 'Foco PMBA', category: 'APLICATIVO DE ESTUDOS', summary: 'Estudos e prática · React + PWA',
    url: 'https://pm-sp-questoes.web.app/', link: 'Abrir aplicação',
    provenance: 'Captura da aplicação publicada · 25/11/2026',
    screens: [
      { file: 'pmba-painel.jpg', title: 'Painel de estudos', alt: 'Painel original do aplicativo Foco PMBA', context: 'Ponto de partida para organizar os estudos, acompanhar o progresso e acessar a prática.' },
      { file: 'pmba-sprint.jpg', title: 'Prática por matéria', alt: 'Seleção de matéria para praticar no Foco PMBA', context: 'Seleção de disciplinas na página de prática do aplicativo publicado no Firebase Hosting.' }
    ]
  },
  klipper: {
    title: 'Klipper', category: 'AGENDAMENTO / WEB E MOBILE', summary: 'Agendamento para barbearias · Flutter + Flask',
    url: 'https://github.com/IanSNasc/projeto-extensao-2-klipper', link: 'Ver repositório',
    provenance: 'Capturas originais do aplicativo Flutter · Acervo do projeto',
    screens: [
      { file: 'klipper-dashboard.jpeg', title: 'Painel mobile', alt: 'Painel original do Klipper em Flutter', context: 'Painel de agendamentos do aplicativo Flutter, preservado no repositório do projeto de extensão.' },
      { file: 'klipper-horarios.jpeg', title: 'Horários de atendimento', alt: 'Configuração de expediente no Klipper em Flutter', context: 'Configuração dos dias e horários de atendimento na interface original do aplicativo.' }
    ]
  }
};
const asset = screen => `assets/screenshots/${screen.file}`;
const allScreens = Object.values(projects).flatMap(project => project.screens.map(screen => ({ ...screen, project })));

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('[data-project-gallery]').forEach(gallery => {
  const project = projects[gallery.dataset.projectGallery];
  const image = gallery.querySelector('img');
  const link = gallery.querySelector('.project-capture');
  gallery.querySelectorAll('[data-screen-file]').forEach(button => button.addEventListener('click', () => {
    if (button.getAttribute('aria-pressed') === 'true') return;
    const screen = project.screens.find(item => item.file === button.dataset.screenFile);
    const source = asset(screen);
    image.src = source;
    image.alt = screen.alt;
    link.href = source;
    link.setAttribute('aria-label', 'Ampliar: ' + screen.alt);
    gallery.querySelectorAll('[data-screen-file]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    gallery.querySelector('[data-screen-status]').textContent = project.title + ': ' + screen.title;
    image.decode().then(() => {
      if (!reducedMotion.matches && image.getAttribute('src') === source) image.animate([{opacity:.3,transform:'scale(1.015)'},{opacity:1,transform:'scale(1)'}],{duration:320,easing:'ease-out'});
    }).catch(() => {});
  }));
});

const dialog = document.querySelector('#screen-dialog');
let activeIndex = 0;
let trigger;
const renderLightbox = () => {
  const screen = allScreens[activeIndex];
  const image = document.querySelector('#screen-dialog-image');
  image.src = asset(screen);
  image.alt = screen.alt;
  document.querySelector('#screen-dialog-title').textContent = `${screen.project.title} / ${screen.title}`;
  document.querySelector('#screen-dialog-caption').textContent = screen.context;
  dialog.querySelector('[data-screen-count]').textContent = `${activeIndex + 1} / ${allScreens.length}`;
};
document.addEventListener('click', event => {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = event.target.closest('a[href]');
  if (!link) return;
  const match = allScreens.findIndex(screen => new URL(asset(screen), document.baseURI).href === link.href);
  if (match < 0) return;
  event.preventDefault();
  trigger = link;
  activeIndex = match;
  renderLightbox();
  dialog.showModal();
});
const move = delta => { activeIndex = (activeIndex + delta + allScreens.length) % allScreens.length; renderLightbox(); };
dialog.querySelector('[data-close-screen]').addEventListener('click', () => dialog.close());
dialog.querySelector('[data-previous-screen]').addEventListener('click', () => move(-1));
dialog.querySelector('[data-next-screen]').addEventListener('click', () => move(1));
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1); }
});
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => trigger?.focus());
