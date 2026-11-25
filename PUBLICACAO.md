# Publicação e manutenção

O site está em `docs/`; o workflow usa a branch principal existente, `master`. Os projetos privados permanecem privados.

## Conferir localmente

```bash
node --test tests/*.test.mjs
node scripts/verify-site.mjs
node scripts/serve.mjs
```

Abra a URL impressa. Confira mobile, teclado, estudos, reservas, estudos, persistência e backup.

## Configuração inicial

1. No repositório, abra **Settings → Pages**.
2. Em **Build and deployment → Source**, selecione **GitHub Actions**.
3. Depois de integrar em `master`, acompanhe **Portfolio Pages**.
4. Considere publicado somente após o job de deployment concluir e retornar a URL. Abra a URL e confira currículo e demos.

URL esperada com o nome atual: `https://iansnasc.github.io/portfolio-qa-ian-santos/`. Este documento não confirma sua disponibilidade.

Referência: [workflows personalizados do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Manutenção

- O workflow publica somente `docs/`, não o repositório inteiro.
- Não inserir configurações privadas, tokens, bases de clientes ou relatórios internos no site.
- Atualizar `evidencias/` quando uma nova execução alterar afirmações sobre validação.
- O currículo consolida as versões fornecidas pelo autor; conferir vínculo profissional, formação e idiomas ao atualizar.
- O README de perfil antigo usa `WildDuck-exe`, enquanto o login conectado é `IanSNasc`. `PERFIL-GITHUB.md` corrige os links. Um README especial de perfil requer repositório público com o nome do login atual; não houve criação/renomeação nesta revisão.
