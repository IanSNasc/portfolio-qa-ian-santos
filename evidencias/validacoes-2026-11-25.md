# Registro de validação — 25/11/2026

Resultados executados localmente durante a atualização do portfólio. Não são percentuais de cobertura nem certificação de produção. Referência: America/Sao_Paulo.

## Foco PMBA

- **Commit:** `089f5e150c85a3abc05267e300e2e1aa96527ebe`.
- **Comando:** `node --test tests/*.test.js`.
- **Resultado:** 17 testes, 17 aprovados, zero falhas/ignorados; saída 0.
- **Escopo:** domínio, banco, filtros, treino, backup e função de verificação de release.
- **Limite:** respostas HTTP de release simuladas. Sem confirmação de produção, homologação offline/aparelho ou deploy.

## CondoSphere

- **Commit:** `303c81c5f47663455868b71defe7a3d44f019dcc`, igual ao HEAD local e remoto inspecionado.
- **Comando:** `node node_modules/vitest/vitest.mjs run --maxWorkers=2 --reporter=json --outputFile=<relatorio-local>`.
- **Resultado:** 837 testes, 790 aprovados, 47 falhas, zero pendentes; saída 1.
- **Arquivos:** 101 arquivos, nove com falhas. Suítes internas do Vitest não são contadas como arquivos.
- **Escopo:** include de `vitest.config.ts` em `src`, `tests/core` e `tests/regression`, com jsdom e dependências simuladas/localizadas.
- **Limite:** causas ainda precisam de classificação. Sem correção do produto, produção, Playwright completo ou deploy.

O relatório bruto com caminhos locais e detalhes internos ficou fora do repositório público. Este resumo não inclui configurações ou dados de produção.

## Portfólio e demonstrações

A suíte em [`tests/demo-model.test.mjs`](../tests/demo-model.test.mjs) confere transições de reservas, perfis, conflitos, respostas únicas, minutos e backup. [`scripts/verify-site.mjs`](../scripts/verify-site.mjs) verifica arquivos e destinos locais.

Resultado local: **12/12 testes passaram**, saída 0, sem ignorados. O verificador passou com 26 referências locais e presença do PDF; `git diff --check` não apontou problemas.

Conferência em navegador: apresentação em 1280 e 390 px; ausência de rolagem horizontal nos pontos conferidos; abertura/fechamento de estudo com Escape e devolução do foco; criação, aprovação, consulta e persistência de reserva; registro de estudo, resposta e revisão de erro; exportação, reinício e restauração do backup; rejeição de backup incompatível preservando dados; recarga com progresso mantido. Nenhum erro foi registrado no console consultado. O currículo foi renderizado e conferido em uma página.

As demos não equivalem à homologação dos produtos originais.

## Acervo histórico

BarberOS, Detailer App, Klipper e JobPilot foram preservados como históricos. As pastas antigas de evidências têm apenas `.gitkeep` e não representam capturas de execução. Planos e gaps não são somados como testes executados nesta revisão.


## Revisão da apresentação visual

A vitrine passou a usar seis capturas reais de CondoSphere, Foco PMBA e Klipper. CondoSphere e Foco PMBA foram abertos em seus endereços publicados para observar as telas; não houve login, criação de reserva ou envio de respostas. O registro anterior de 17 testes continua vinculado ao commit inspecionado, sem certificar toda a versão publicada atual.

A nova vitrine passou no verificador com 28 referências locais. As galerias carregaram as imagens originais; layout conferido em desktop e 390 px, sem rolagem horizontal no ponto observado. A consulta ao console da prévia não registrou erros.

## Estudo de caso do CondoSphere

Foi criada uma página em `docs/casos/condosphere/`, ligada à vitrine e à seção de qualidade. Ela apresenta o papel confirmado pelo autor — criação do projeto do zero e evolução progressiva, com apoio de IA e ajustes em documentos, notificações, funções e telas — e aprofunda os estados de consulta no painel do profissional.

A revisão do relatório local já existente identificou **15 testes em `professional-selfservice-feedback.test.tsx`: 14 aprovados e uma falha**. A falha é a expectativa de argumento da consulta do cadastro. O resumo JSON público e a tabela da página preservam esses resultados, com nomes editoriais resumidos. Não houve nova execução da suíte do produto nem alteração no código do CondoSphere para elaborar o estudo.

Validação do portfólio: sintaxe JavaScript e verificador aprovados, com **47 referências locais**; os 12 testes dos exemplos arquivados continuam aprovados. No navegador, foram conferidos desktop e larguras de 390 e 320 px, cinco cenários do modelo de estados, seleção pelo teclado, 15 linhas de evidências (14 aprovadas e uma falha), abertura dos detalhes e navegação da vitrine para o caso. Sem rolagem lateral ou erros de console observados. O modelo é didático e não executa o aplicativo original.

## Complemento de privacidade e revisão de exposição

O relatório local já registrado contém **45 aprovações em seis suítes relacionadas a LGPD**, sem falhas nesses arquivos. A documentação e os testes inspecionados descrevem serviços e painéis com dependências controladas e banco PGlite local com dados e claims de teste. A implementação é documentada como local, sem confirmação de publicação ou homologação autenticada. A exclusão irreversível permanece bloqueada enquanto a política de retenção não estiver definida. Não houve nova execução nem alteração do produto para elaborar este complemento.

No material do portfólio, uma referência a pasta local e dois exemplos de telefone foram substituídos por placeholders. Foram conferidos conteúdo e metadados de seis imagens e do currículo PDF; o escopo e os limites estão em `PRIVACIDADE-PUBLICACAO.md`. Uma regra automatizada de publicação, com seis testes próprios, foi adicionada ao CI. Os resultados dos testes do portfólio passam a ser **18/18: 12 dos exemplos arquivados e seis da regra de publicação**. Esses testes não certificam o CondoSphere ou conformidade jurídica integral.
