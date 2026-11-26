const scenarios = {
  loading: {
    title: 'Carregando', response: 'A consulta ainda não terminou.', meaning: 'Quantidade desconhecida.', communication: 'Informar o carregamento.',
    detail: 'A interface não informa zero nem classifica os documentos como não enviados enquanto aguarda a consulta.'
  },
  empty: {
    title: 'Vazio confirmado', response: 'A consulta terminou com sucesso, sem documentos.', meaning: 'Ausência confirmada.', communication: 'Mostrar zero e orientar o envio.',
    detail: 'O estado vazio depende de uma resposta válida. Aqui a ausência pode ser comunicada sem confundir o usuário.'
  },
  failure: {
    title: 'Falha inicial', response: 'A consulta falhou antes de obter um resultado.', meaning: 'A situação continua desconhecida.', communication: 'Avisar a falha e oferecer nova tentativa.',
    detail: 'A indisponibilidade não vira uma lista vazia. A mensagem deve permitir recuperar a consulta sem afirmar que os documentos desapareceram.'
  },
  refresh: {
    title: 'Falha na atualização', response: 'Havia dados conhecidos; a atualização falhou.', meaning: 'Resultado anterior preservado, com aviso.', communication: 'Manter os dados e o formulário em edição.',
    detail: 'Arquivo selecionado, tipo e instituição permanecem em edição. O envio fica indisponível nesse cenário até a recuperação da consulta.'
  },
  account: {
    title: 'Troca de conta', response: 'O usuário ativo mudou durante o fluxo.', meaning: 'O contexto anterior deixa de valer.', communication: 'Descartar rascunho e dados da conta anterior.',
    detail: 'Preservar a edição vale dentro do mesmo contexto. Ao trocar de conta, os dados anteriores e suas respostas atrasadas não devem reaparecer.'
  }
};
const output = document.querySelector('#state-output');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('[data-scenario]').forEach(button => button.addEventListener('click', () => {
  if (button.getAttribute('aria-pressed') === 'true') return;
  const scenario = scenarios[button.dataset.scenario];
  document.querySelectorAll('[data-scenario]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  output.dataset.state = button.dataset.scenario;
  for (const name of ['response', 'meaning', 'communication', 'detail']) output.querySelector(`[data-${name}]`).textContent = scenario[name];
  document.querySelector('#scenario-status').textContent = `${scenario.title}. ${scenario.meaning} ${scenario.communication}`;
  if (!reducedMotion.matches) output.animate([{opacity:.45,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:230,easing:'ease-out'});
}));
const header = document.querySelector('.site-header');
let frame = 0;
window.addEventListener('scroll', () => {
  if (frame) return;
  frame = requestAnimationFrame(() => { header.classList.toggle('is-scrolled', window.scrollY > 20); frame = 0; });
}, {passive:true});
