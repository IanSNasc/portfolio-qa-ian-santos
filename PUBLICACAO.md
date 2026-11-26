# Publicação e manutenção

O site está em `docs/`; o workflow usa a branch principal existente, `master`. Os projetos privados permanecem privados.

## Conferir localmente

```bash
node --test tests/*.test.mjs
node scripts/verify-site.mjs
node scripts/audit-publication.mjs
node scripts/serve.mjs
```

Abra a URL impressa. Confira desktop e celular, os seletores de capturas dentro de CondoSphere e Foco PMBA, as duas telas do Klipper, os links externos e o currículo. Na ampliação, confira os botões Anterior/Próxima, as setas do teclado, Escape e o retorno do foco. Os estudos de caso apresentam o conteúdo técnico, sem repetir as capturas.

A vitrine usa `docs/assets/showcase.js` para os metadados das seis capturas, `docs/assets/showcase.css` para a apresentação e `docs/assets/motion.js` para entradas ao rolar, profundidade com o ponteiro e indicadores de navegação. Confira a preferência de reduzir movimento, os links por teclado e o botão de voltar ao início. As imagens mantêm a proporção original. Sem JavaScript, o conteúdo, as capturas estáticas e os links dos projetos continuam disponíveis; os controles interativos dependem de JavaScript.

Os exemplos didáticos arquivados em `docs/demos/` têm seus próprios fluxos de reservas, estudos, persistência e backup. Seus testes não validam os aplicativos originais externos.

## Estudo de caso do CondoSphere

Abra `casos/condosphere/` na prévia. Os links da vitrine e da seção de qualidade levam ao mesmo estudo. Confira os cinco cenários do modelo interativo, seus estados `aria-pressed`, a navegação por teclado, a tabela expansível dos 15 resultados e o resumo em `evidencias.json`. Os caminhos usam o subdiretório do projeto no GitHub Pages.

O resumo tem 14 aprovações e uma falha da execução já registrada no commit `303c81c`. Criar ou conferir o estudo não equivale a executar novamente os testes do produto. Ao atualizar os resultados, confira também a tabela estática e a documentação em `projetos/condosphere/`.

O complemento de privacidade em `#privacidade` apresenta 45 aprovações de seis suítes no mesmo registro. O estado local da implementação e as pendências de publicação, homologação e retenção devem permanecer explícitos. O arquivo `privacidade.json` é um resumo selecionado, sem logs brutos ou código privado.

## Revisar exposição antes de publicar

Siga a [revisão técnica de exposição](PRIVACIDADE-PUBLICACAO.md). O CI bloqueia padrões reconhecidos de dados e credenciais e não imprime seus valores. A conferência visual de imagens, metadados, PDF e conteúdo sem padrões reconhecíveis continua necessária. O pacote de download deve passar pelos mesmos comandos de validação, incluindo seus relatórios adicionais.

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
