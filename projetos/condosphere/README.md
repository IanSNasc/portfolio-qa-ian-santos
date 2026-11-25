# CondoSphere — Desenvolvimento de um SaaS condominial

**Papel:** projeto pessoal desenvolvido com apoio de IA. **Foco:** desenvolvimento e qualidade dos fluxos. **Código:** privado. **Referência:** commit `303c81c5f47663455868b71defe7a3d44f019dcc`.

## Problema

A rotina de um condomínio envolve moradores, gestão e portaria, com responsabilidades e vínculos diferentes. Solicitar uma reserva, aprová-la e conferir a agenda não são a mesma permissão. O sistema precisa refletir essas diferenças e manter os dados separados por condomínio.

## Solução e implementação

- Interface React com TypeScript e experiência PWA.
- Hooks TanStack Query e services para consultas, mutações e contratos de resultado.
- Supabase Auth, Edge Functions e PostgreSQL com políticas RLS.
- Unidades, moradores, portaria, reservas e comunicados; outros módulos constam no inventário técnico.
- Vitest para regressão de regras, componentes e consultas; Playwright para cenários de navegador.

O currículo anterior descreve desenvolvimento independente com apoio de IA, critérios de qualidade, testes funcionais/unitários e preparação de dados para reproduzir cenários. Não se presume autoria manual de cada linha nem domínio autônomo de todas as tecnologias.

## Decisão técnica demonstrável

[Falha na consulta não é ausência de documentos](feedback-documentos.md): separar carga, vazio confirmado, falha e atualização parcial evita informar que dados existentes desapareceram.

## Testes e estado atual

Em 25/11/2026, a execução local de `vitest run --maxWorkers=2`, no commit acima, terminou com **837 testes, 790 aprovados e 47 falhas**, em 101 arquivos de teste (nove com falhas). Código de saída 1.

Há divergências entre expectativas de regressão e comportamentos de contextos, formulários, consultas e handlers. Esta revisão não concluiu que cada falha represente defeito de produção, nem as atribuiu genericamente ao ambiente. É necessário reproduzir e classificar antes de alterar testes ou implementação.

O relatório antigo de 419 testes/84 cenários smoke não é uma nova execução confirmada. Não foram executados testes remotos, Playwright completo, deploy ou operações financeiras nesta atualização.

## Limites do piloto

O relatório registra preparação de SMTP, cadastro do condomínio e homologação em aparelhos reais como pendências. O financeiro está em sandbox. O conjunto não é apresentado como homologado para operação financeira real.

## Demonstração pública

[`docs/demos/condosphere/`](../../docs/demos/condosphere/) é uma simulação nova e independente de reservas, com dados fictícios, três perfis e persistência local. Não usa credenciais, API ou banco privado. Os botões de perfil não demonstram segurança de backend, RLS ou concorrência real no banco.
