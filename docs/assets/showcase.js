const projects = {
  condosphere: {
    title: 'CondoSphere', category: 'GESTÃO CONDOMINIAL', summary: 'Gestão condominial · React + TypeScript',
    url: 'https://condosphere.netlify.app/demo/gestao', link: 'Abrir demonstração ↗',
    provenance: 'Captura da demonstração pública · 25/11/2026',
    screens: [
      { file: 'condosphere-visao-geral.jpg', title: 'Visão geral', alt: 'Visão geral da demonstração pública do CondoSphere', context: 'Demonstração pública com unidades, moradores, comunicados e atalhos de gestão.' },
      { file: 'condosphere-reservas.jpg', title: 'Reservas', alt: 'Tela de reservas na demonstração pública do CondoSphere', context: 'Fluxo de reservas da demonstração pública, com dados fictícios e alterações locais à página.' }
    ]
  },
  pmba: {
    title: 'Foco PMBA', category: 'APLICATIVO DE ESTUDOS', summary: 'Estudos e prática · React + PWA',
    url: 'https://pm-sp-questoes.web.app/', link: 'Abrir aplicação ↗',
    provenance: 'Captura da aplicação publicada · 25/11/2026',
    screens: [
      { file: 'pmba-painel.jpg', title: 'Painel de estudos', alt: 'Painel original do aplicativo Foco PMBA', context: 'Ponto de partida para organizar os estudos, acompanhar o progresso e acessar a prática.' },
      { file: 'pmba-sprint.jpg', title: 'Prática por matéria', alt: 'Seleção de matéria para praticar no Foco PMBA', context: 'Seleção de disciplinas na página de prática do aplicativo publicado no Firebase Hosting.' }
    ]
  },
  klipper: {
    title: 'Klipper', category: 'AGENDAMENTO / WEB E MOBILE', summary: 'Agendamento para barbearias · Flutter + Flask',
    url: 'https://github.com/IanSNasc/projeto-extensao-2-klipper', link: 'Ver repositório ↗',
    provenance: 'Capturas originais do aplicativo Flutter · Acervo do projeto',
    screens: [
      { file: 'klipper-dashboard.jpeg', title: 'Painel mobile', alt: 'Painel original do Klipper em Flutter', context: 'Painel de agendamentos do aplicativo Flutter, preservado no repositório do projeto de extensão.' },
      { file: 'klipper-horarios.jpeg', title: 'Horários de atendimento', alt: 'Configuração de expediente no Klipper em Flutter', context: 'Configuração dos dias e horários de atendimento na interface original do aplicativo.' }
    ]
  }
};
const asset = screen => `assets/screenshots/${screen.file}`;
const allScreens = Object.values(projects).flatMap(project => project.screens.map(screen => ({ ...screen, project })));

document.querySelectorAll('[data-showcase]').forEach(showcase => {
  let selectedProject = 'condosphere';
  let selectedScreen = 0;
  const render = () => {
    const project = projects[selectedProject];
    const screen = project.screens[selectedScreen];
    const image = showcase.querySelector('[data-screen-image]');
    image.src = asset(screen);
    image.alt = screen.alt;
    image.width = selectedProject === 'klipper' ? 720 : 1280;
    image.height = selectedProject === 'klipper' ? 1600 : 720;
    showcase.dataset.mobile = String(selectedProject === 'klipper');
    const link = showcase.querySelector('[data-screen-link]');
    link.href = asset(screen);
    link.setAttribute('aria-label', `Ampliar: ${screen.alt}`);
    const textFields = {
      'screen-name': `${project.title} / ${screen.title}`,
      'screen-summary': project.summary,
      'project-title': project.title,
      'project-category': project.category,
      'screen-context': screen.context,
      'screen-provenance': project.provenance
    };
    for (const [name, value] of Object.entries(textFields)) {
      const element = showcase.querySelector(`[data-${name}]`);
      if (element) element.textContent = value;
    }
    const projectLink = showcase.querySelector('[data-project-link]');
    projectLink.href = project.url;
    projectLink.textContent = project.link;
    showcase.querySelectorAll('[data-project]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.project === selectedProject)));
    showcase.querySelectorAll('[data-screen-index]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.screenIndex) === selectedScreen)));
    const status = showcase.querySelector('[data-gallery-status]');
    if (status) status.textContent = `${project.title}: ${screen.title}. ${selectedScreen + 1} de ${project.screens.length} telas.`;
  };
  const thumbnails = showcase.querySelector('[data-screen-thumbs]');
  const renderThumbnails = () => {
    if (!thumbnails) return;
    thumbnails.replaceChildren(...projects[selectedProject].screens.map((screen, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.screenIndex = index;
      button.setAttribute('aria-label', `Mostrar ${screen.title}`);
      const image = document.createElement('img');
      image.src = asset(screen);
      image.alt = '';
      image.loading = 'lazy';
      const label = document.createElement('span');
      label.textContent = screen.title;
      button.append(image, label);
      button.addEventListener('click', () => { selectedScreen = index; render(); });
      return button;
    }));
  };
  showcase.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
    selectedProject = button.dataset.project;
    selectedScreen = 0;
    renderThumbnails();
    render();
  }));
  renderThumbnails();
  render();
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
