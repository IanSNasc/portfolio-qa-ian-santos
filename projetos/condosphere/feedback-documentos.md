# Estudo técnico — Erro de consulta não significa lista vazia

[Abrir o estudo navegável no site](../../docs/casos/condosphere/) · [Resumo público dos resultados](../../docs/casos/condosphere/evidencias.json)

## Papel no projeto

Ian criou o CondoSphere do zero e conduziu a evolução progressiva do produto, com apoio de IA. Esse trabalho envolveu ajustes em anexos de documentos, notificações, funções e telas. O estudo abaixo aprofunda um dos temas documentados; não presume autoria manual de cada linha nem atribui a Ian a execução de testes realizada durante a revisão do portfólio.

## Contexto e impacto

No painel do profissional do CondoSphere, consultar documentos pode falhar independentemente do cadastro principal ou das categorias. Apresentar zero nessa situação confunde indisponibilidade com ausência e pode levar a reenvios desnecessários.

## Critérios de comportamento

1. Enquanto a consulta não termina, a quantidade permanece desconhecida.
2. Uma consulta bem-sucedida e vazia pode mostrar zero.
3. Uma falha inicial precisa de mensagem específica e nova tentativa.
4. Uma falha de atualização preserva o último resultado e sinaliza a falha.
5. Arquivo, tipo de documento e instituição em edição são preservados na recuperação.
6. Trocar de conta descarta rascunho e dados anteriores, inclusive respostas atrasadas.

## Evidência

A suíte privada `tests/regression/professional-selfservice-feedback.test.tsx`, inspecionada no commit `303c81c`, contém testes de hooks e componentes com serviços simulados para esses estados.

O registro local de 25/11/2026 contém **15 testes nesse arquivo: 14 aprovados e uma falha**. Os cenários aprovados abrangem vazio confirmado, recuperação independente de listas, preservação do formulário, descarte de rascunho na troca de usuário e rejeição de respostas atrasadas da conta anterior. A tabela do estudo e o resumo JSON trazem os 15 resultados, com rótulos editoriais resumidos.

A falha ocorreu no teste de carga inicial: a expectativa pedia um argumento de usuário, mas a chamada observada não tinha argumentos. A causa não foi classificada nesta revisão; conferir contrato do serviço e intenção do teste é necessário antes de alterar a expectativa ou a implementação.

O resultado global teve 790 aprovações e 47 falhas em 837 testes. A presença da suíte e suas 14 aprovações não equivalem a validação completa ou homologação autenticada. O estudo reaproveita a execução registrada; não houve nova execução ou correção do produto para criar esta página.

## Referências de implementação

- `src/hooks/useProfissional.ts`: `useMeuCadastro`, `useProfissionalDashboard`, `useMinhasCategorias` e `useMeusDocumentos` conectam identidade, consultas e indicadores do painel.
- `ProfissionalDashboardPage` e `ProfissionalDocumentosPage`: componentes exercitados pela suíte, com mensagens, recuperação e preservação da edição.
- `tests/regression/professional-selfservice-feedback.test.tsx`: cenários de hooks e componentes com serviços simulados.

O conteúdo público resume os comportamentos e resultados. Não inclui o código privado, o relatório bruto ou dados operacionais. O modelo interativo do site é uma explicação didática, sem conexão com o aplicativo.

## Aprendizado

Modelar estados de consulta e contratos de erro faz parte da implementação. Um resultado coerente precisa ser conferido no dado retornado e na mensagem que a interface comunica ao usuário.
