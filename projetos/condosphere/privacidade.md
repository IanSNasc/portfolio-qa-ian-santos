# CondoSphere — Cuidados com dados pessoais

Este recorte complementa o [estudo de documentos](feedback-documentos.md) e está apresentado na [página do projeto](../../docs/casos/condosphere/#privacidade). O autor informou que questões de privacidade e prevenção de exposição fizeram parte da evolução do produto.

## Medidas documentadas

- Restringir pedidos, respostas e arquivos ao titular e aos responsáveis autorizados.
- Gerar relatórios com campos permitidos e vínculos do próprio titular, sem campos internos e dados de terceiros.
- Distinguir rascunho de arquivo efetivamente entregue; exigir revisão da entrega.
- Autorizar o download e verificar integridade antes de disponibilizar o arquivo.
- Não anunciar uma análise de exclusão como se a exclusão já tivesse ocorrido.

Essas medidas são descritas na documentação privada de atendimento de privacidade e exercitadas nas suítes relacionadas. A implementação é local; sua publicação e homologação com login real no ambiente hospedado não foram confirmadas. A política de retenção dos dados de origem não está definida, e a exclusão irreversível permanece bloqueada conforme o estado documentado.

## Evidência registrada

Commit `303c81c5f47663455868b71defe7a3d44f019dcc`, execução local de 25/11/2026. Seis arquivos relacionados a LGPD têm **45 testes, 45 aprovados e zero falhas** no relatório já existente:

| Arquivo | Aprovados / total |
|---|---|
| lgpd-delivery-service.test.ts | 3 / 3 |
| lgpd-fulfillment-database.test.ts | 13 / 13 |
| lgpd-handler.test.ts | 5 / 5 |
| lgpd-intake-database.test.ts | 12 / 12 |
| lgpd-panels.test.tsx | 8 / 8 |
| lgpd-service.test.ts | 4 / 4 |

As suítes usam Vitest, serviços controlados, jsdom e PGlite local com fixtures e claims de teste. O [resumo público estruturado](../../docs/casos/condosphere/privacidade.json) preserva contagens, versão e limites sem copiar código privado ou logs.

Não houve nova execução do produto para escrever este material. Esses arquivos pertencem à execução global de 837 testes, que teve 47 falhas em outros recortes. A aprovação local não certifica conformidade integral com a LGPD nem operação em produção.

## Referência normativa

Os princípios de necessidade, segurança e prevenção e a proteção desde a concepção constam dos arts. 6º e 46 da [LGPD, no texto oficial](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm). A avaliação jurídica de bases legais, retenção, procedimentos e direitos não é substituída por estes testes técnicos.
