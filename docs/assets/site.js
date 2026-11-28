const caseContent = {
  pmba: "<h2 id=\"case-title\">Foco PMBA — decisões e testes</h2><h3>Implementação</h3><p>React, JavaScript, Vite e PWA. O estudo técnico registra validação de respostas, filtros, progresso e backups.</p><h3>Execução registrada</h3><p>No commit <code>089f5e1</code>, 17 testes passaram na execução local de 25/11/2026. O conjunto confere regras de respostas, backup, restauração e preservação do progresso.</p><h3>Limites</h3><p>O resultado está vinculado ao commit inspecionado. Não certifica toda a versão publicada, o funcionamento em aparelho real ou a validade editorial dos materiais de concurso.</p>",
  klipper: "<h2 id=\"case-title\">Klipper — desenvolvimento e integração</h2><h3>Projeto de extensão</h3><p>Python/Flask, Flutter e APIs REST para agendamento e gestão de barbearias. As telas apresentadas são as capturas originais preservadas no repositório do projeto.</p><h3>Investigação documentada</h3><p>O diagnóstico histórico registra problemas de integração, usabilidade e regras de negócio. Esse material documenta a análise realizada; não certifica que todas as correções tenham sido implantadas.</p>",
  evidencias: `<h2 id="case-title">Validações com versão e escopo.</h2><div class="evidence-callout"><strong>Foco PMBA · 17/17 testes passaram</strong><p>Execução local em 25/11/2026. Commit <code>089f5e150c85a3abc05267e300e2e1aa96527ebe</code>. Comando: <code>node --test tests/*.test.js</code>. Nenhum teste ignorado.</p></div><h3>O que esses testes verificam</h3><ul><li>Aritmética do diagnóstico histórico e validação de respostas.</li><li>Backup, restauração, migração de campos e preservação do progresso.</li><li>Filtros, rodízio de questões, resposta única e encerramento parcial.</li><li>Datas locais e integridade do banco.</li><li>Verificador de release com respostas HTTP simuladas.</li></ul><h3>O que não foi medido nessa execução</h3><p>Teste em aparelho real, funcionamento offline no navegador, cobertura percentual, entrega efetiva de produção ou aderência integral ao edital.</p><h3>CondoSphere · 27/11/2026</h3><p>Os 15 cenários de documentos passaram na execução local. O Vitest aprovou 856 de 856 testes e o Playwright aprovou 124 de 124 em perfis de desktop e celular.</p><p><a href="casos/condosphere/#evidencias">Comparar os resultados de 25 e 27/11</a></p>`
};
const dialog = document.querySelector('#case-dialog');
const content = document.querySelector('#case-content');
let lastTrigger;
document.querySelectorAll('[data-case]').forEach(button => button.addEventListener('click', () => {
  lastTrigger = button;
  content.innerHTML = caseContent[button.dataset.case];
  dialog.showModal();
  dialog.scrollTop = 0;
}));
document.querySelector('#close-case').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => lastTrigger?.focus());
