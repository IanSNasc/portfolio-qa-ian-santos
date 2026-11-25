# Foco PMBA — Produto pessoal de organização de estudos

**Projeto:** aplicação pessoal. **Origem:** repositório privado `pm_sp`. **Referência:** commit `089f5e150c85a3abc05267e300e2e1aa96527ebe`.

## Problema e solução

Concentrar sessões, prática de questões, erros e revisões em um fluxo que possa ser retomado no próprio dispositivo. A navegação principal é dedicada à PMBA; o acervo de concursos anteriores fica separado.

## Implementação observada

- React/JavaScript com Vite e PWA.
- Ciclo de 28 sessões, registro parcial e minutos estudados.
- Questões com filtros, retomada, favoritos, histórico e proteção contra respostas duplicadas.
- Revisões por calendário local, redações e registro de preparação física.
- Backup JSON com validação e migração de campos anteriores.
- Dados no namespace `pmba_estudos_v1`, sem publicação de progresso em ranking ou sincronização obrigatória com Firebase.
- Workflow de teste/build e Firebase Hosting com verificação de versão; a configuração não comprova um deploy concluído.

## Validação executada

Em 25/11/2026, `node --test tests/*.test.js` passou nos **17 testes**, sem falhas ou ignorados. Incluem domínio, integridade do banco, filtros, progresso parcial, backup e verificador de release com HTTP simulado.

Não houve homologação completa no navegador/aparelho, modo offline ou deploy nesta rodada. Os testes de release testam a função de verificação; não confirmam o site publicado.

## Conteúdo e limites

O README de origem descreve 688 questões autorais e de acervo selecionado, sem apresentar o banco como integral ou autenticado como prova oficial. O app não garante classificação, correção de redação ou aderência ao próximo edital. Datas reportadas em briefing pessoal não são datas oficiais verificadas.

## Demonstração do portfólio

[`docs/demos/pmba/`](../../docs/demos/pmba/) foi criada separadamente para registro de estudo, resposta, revisão e backup. Usa três questões didáticas novas e `ian_portfolio_pmba_v1`; não copia o banco privado nem altera dados do app original.
