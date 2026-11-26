# Ian Santos — Desenvolvimento de software & qualidade

Estudante de Engenharia de Software. Desenvolvo aplicações web com apoio de IA e trato revisão, testes e documentação como parte da implementação.

Meu foco profissional é **desenvolvimento de software, com destaque para qualidade**. Este repositório reúne apresentação web, estudos de caso, exemplos interativos e documentação de testes.

## Projetos em destaque

| Projeto | Problema e contribuição | Tecnologias | Estado apresentado |
|---|---|---|---|
| [CondoSphere](projetos/condosphere/README.md) | Projeto pessoal de gestão condominial: interface, regras por perfil, isolamento e validação de fluxos | React, TypeScript, Supabase, PostgreSQL, Vitest, Playwright | Preparação para piloto; financeiro em sandbox; testes atuais com pendências |
| [Foco PMBA](projetos/foco-pmba/README.md) | Organizar sessões, prática, erros, revisões e progresso de estudos | React, JavaScript, Vite, PWA, Node Test | Aplicação pessoal; 17 testes locais aprovados em 25/11/2026 |
| [Klipper](projetos/klipper/README.md) | Projeto de extensão de agendamento para barbearias; desenvolvimento e análise da integração | Python, Flask, Flutter, APIs REST | Diagnóstico histórico com problemas e melhorias documentados |

O código de CondoSphere e Foco PMBA permanece privado. A vitrine usa capturas das interfaces originais e links para a demonstração pública do CondoSphere e a aplicação Foco PMBA já publicada. Não redistribui bancos, configurações ou credenciais dos projetos.

Também há um [projeto acadêmico de eventos culturais](projetos/eventos-culturais/README.md), com Python/Flask, SQLAlchemy e MySQL, cujo código público foi inspecionado. Ele complementa os três casos principais.

## Apresentação web e demonstrações

O site está em [docs/](docs/). Usa HTML, CSS e módulos JavaScript sem framework, dependências externas ou compilação.

- **CondoSphere:** capturas e acesso à [demonstração pública do próprio projeto](https://condosphere.netlify.app/demo/gestao), com moradores, unidades, comunicados, portaria e reservas fictícios.
- **Foco PMBA:** capturas e acesso à [aplicação original publicada](https://pm-sp-questoes.web.app/), com painel, prática por matéria, aulas e revisão.
- **Klipper:** capturas originais do app Flutter, provenientes das imagens já existentes no repositório.
- **Currículo:** [versão web](docs/cv/index.html) e [PDF em português](docs/cv/Ian-Santos-Desenvolvimento.pdf), voltados a desenvolvimento.

A [origem das capturas](docs/assets/screenshots/ORIGEM.md) é documentada. Os exemplos independentes anteriores em `docs/demos/` permanecem como material didático; deixaram de ser a apresentação principal dos aplicativos. Os 12 testes desses exemplos não validam as aplicações externas.

A abertura permite alternar entre os três projetos. A seção **Telas** reúne seis capturas com miniaturas, contexto e links para as aplicações ou o repositório. Clique para ampliar; use os botões ou as setas do teclado para navegar e Escape para fechar. A apresentação mantém as proporções das interfaces web e mobile.

Para conferir localmente, com Node instalado:

```bash
node scripts/serve.mjs
```

Abra o endereço impresso. Para validar:

```bash
node --test tests/*.test.mjs
node scripts/verify-site.mjs
```

A publicação no GitHub Pages está preparada em [.github/workflows/pages.yml](.github/workflows/pages.yml). Consulte [PUBLICACAO.md](PUBLICACAO.md) para a configuração inicial e a verificação. A presença dos arquivos não significa que o site já esteja publicado.

## Desenvolvimento assistido por IA

O uso de IA faz parte do desenvolvimento dos projetos e da preparação deste portfólio. A apresentação diferencia apoio à implementação, decisões de produto, revisão e validação. Não atribui autonomia ou domínio de uma ferramenta apenas porque ela aparece nas dependências.

O contexto de desenvolvimento contém uso do Codex e documentação de skills do Antigravity. A relação completa das ferramentas e a divisão de trabalho por etapa dependem de confirmação do autor; não há métricas de produtividade atribuídas a IA. A apresentação prioriza trabalhos recentes que o autor consiga demonstrar e explicar.

## Qualidade e resultados verificáveis

O [registro de validação de 25/11/2026](evidencias/validacoes-2026-11-25.md) informa versão, comando, resultado e limites. Foco PMBA passou em **17/17 testes** locais. CondoSphere terminou com **790 aprovados e 47 falhas**, em **837 testes**; não é apresentado como aprovação completa ou homologação de produção.

O estudo [erro de consulta versus ausência de documentos](projetos/condosphere/feedback-documentos.md) explica uma decisão da interface e sua regressão automatizada. Dependências simuladas, testes de navegador, políticas de banco e homologação com usuários têm escopos diferentes.

Os antigos totais de “89+ casos escritos”, “28+ bugs” e “taxa média de defeitos” foram retirados do resumo: o acervo mistura cenários planejados, executados e gaps, sem uma base única que permita agregá-los com precisão.

## Acervo de estudos de QA

Os documentos de maio de 2026 foram preservados como registros históricos. Seus números são resultados declarados nos estudos e não foram todos reexecutados nesta revisão.

| Estudo | Material disponível |
|---|---|
| [BarberOS](projetos/barber-os/) | Exploração funcional, quatro bugs documentados e plano de regressão |
| [Detailer App](projetos/detailer-app/) | Casos, bugs, recomendações e relatório histórico |
| [Klipper](projetos/klipper/) | Arquitetura, diagnóstico de integração, plano e melhorias |
| [JobPilot](projetos/jobpilot/) | Arquitetura proposta, plano e riscos; funcionalidades descritas não são todas implementadas |

Também mantenho um [projeto inicial de automação com CodeceptJS](https://github.com/IanSNasc/qa-primeiros-testes-automatizados), com cenários de login em plataforma de estudo.

## Formação e experiência

- Engenharia de Software — Universidade Pitágoras Unopar Anhanguera, 2024–2027, em andamento; conclusão prevista para julho de 2027.
- Auxiliar de Informática no Atacadão desde abril de 2024, com suporte a usuários, configuração de software, servidores Linux e rotinas de documentação, conforme os currículos fornecidos.
- Trilha QA Starter & QA API — QAzando, certificação por módulo concluído.
- Inglês intermediário, conforme autodeclaração no currículo anterior.

## Contato

- [GitHub / IanSNasc](https://github.com/IanSNasc)
- [LinkedIn](https://www.linkedin.com/in/ian-santos-qa)
- [ian.s4ntos@gmail.com](mailto:ian.s4ntos@gmail.com)

## Estrutura

```text
docs/                  Site, currículo e demos independentes
projetos/              Estudos técnicos e acervo de QA
evidencias/            Validações com versão, escopo e limites
templates/             Modelos de documentação de QA
automacoes/            Ferramentas existentes de geração de documentos
scripts/               Servidor local e verificação do site
tests/                 Regras das novas demonstrações
```

Projetos de terceiros permanecem identificados como estudo. Não há autorização genérica para redistribuir seus códigos, marcas ou dados.

