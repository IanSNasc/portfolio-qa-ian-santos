# CondoSphere — Desenvolvimento de um SaaS condominial

**Papel:** criação do projeto do zero e evolução progressiva do produto, com apoio de IA. O trabalho envolveu ajustes em anexos de documentos, notificações, funções e telas. **Foco:** desenvolvimento e qualidade dos fluxos. **Código:** privado. **Referência técnica:** commit `303c81c5f47663455868b71defe7a3d44f019dcc`.

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

O [estudo de caso navegável](../../docs/casos/condosphere/) apresenta contexto, papel no projeto, um modelo interativo dos estados e a evolução dos 15 cenários de documentos entre 25 e 27 de novembro. O diagrama é didático; não é uma captura nem uma execução do aplicativo. O conteúdo público não redistribui código privado.

## Testes e estado atual

Em 27/11/2026, a base `303c81c` com correções locais passou em **856/856 testes do Vitest** (106 arquivos) e **124/124 testes do Playwright** em perfis de desktop e celular. No painel do profissional, passaram os **15/15 cenários** de documentos, incluindo a carga inicial do cadastro.

O [registro anterior, de 25/11](../../evidencias/validacoes-2026-11-25.md), documenta 790 aprovações em 837 testes do Vitest e 14 em 15 no recorte de documentos. As execuções têm conjuntos de testes de tamanhos diferentes.

## Limites do piloto

O relatório registra preparação de SMTP, cadastro do condomínio e homologação em aparelhos reais como pendências. O financeiro está em sandbox. O conjunto não é apresentado como homologado para operação financeira real.

## Demonstração pública

[`docs/demos/condosphere/`](../../docs/demos/condosphere/) é uma simulação nova e independente de reservas, com dados fictícios, três perfis e persistência local. Não usa credenciais, API ou banco privado. Os botões de perfil não demonstram segurança de backend, RLS ou concorrência real no banco.


## Interface original na vitrine

O portfólio agora mostra capturas da demonstração pública do próprio CondoSphere e abre essa interface original. Os dados da demonstração são fictícios. [Abrir projeto](https://condosphere.netlify.app/demo/gestao). As capturas têm origem e data registradas em `docs/assets/screenshots/ORIGEM.md`. Os exemplos independentes descritos acima foram preservados como material didático, sem ocupar a apresentação principal.
