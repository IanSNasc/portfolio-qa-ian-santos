# Estudo técnico — Erro de consulta não significa lista vazia

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

Na execução global de 25/11/2026, esse arquivo teve uma falha na expectativa dos argumentos da consulta do cadastro; os demais testes do arquivo passaram. O resultado global teve outras falhas. A presença da suíte não equivale a validação completa ou homologação autenticada.

## Aprendizado

Modelar estados de consulta e contratos de erro faz parte da implementação. Um resultado coerente precisa ser conferido no dado retornado e na mensagem que a interface comunica ao usuário.
