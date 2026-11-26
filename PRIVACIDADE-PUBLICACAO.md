# Revisão técnica de exposição do portfólio

Data: 25/11/2026. Escopo: arquivos atuais do portfólio, currículo PDF, seis capturas e pacote de entrega. Não é uma auditoria jurídica nem uma revisão do histórico completo do Git ou da infraestrutura dos aplicativos externos.

## O que foi ajustado

- Uma instrução de execução do JobPilot apontava para uma pasta local. A referência foi substituída por um diretório genérico.
- Dois exemplos de telefone no acervo do Klipper foram substituídos por placeholders, preservando a descrição do formato esperado. A origem desses números não foi validada; não foram tratados como prova de vazamento de pessoas reais.
- A validação do PR passou a executar `scripts/audit-publication.mjs`. As seis verificações automatizadas da própria regra passam junto dos 12 testes dos exemplos didáticos.

Essas correções estão na revisão do portfólio. Elas não reescrevem commits anteriores nem removem automaticamente conteúdo de branches antigas, cópias ou caches.

## Conteúdo intencionalmente público

Nome, cidade/estado, contato profissional, links GitHub e LinkedIn, formação e experiência profissional foram mantidos para a finalidade do portfólio e do currículo. O botão de WhatsApp usa o telefone autorizado pelo titular para contato profissional. O número integra o endereço público do link. O verificador permite somente o e-mail profissional já usado na apresentação e endereços de exemplo reservados pela regra. Ele não serve para decidir sozinho se um dado pessoal pode ser publicado.

As capturas foram revistas visualmente: CondoSphere usa a demonstração explicitamente fictícia; Foco PMBA mostra o estado inicial de estudos; Klipper mostra agenda vazia e configuração de expediente. A [origem das imagens](docs/assets/screenshots/ORIGEM.md) continua registrada. Não foram identificados dados de moradores ou clientes reais nos elementos observados.

## Arquivos binários e metadados

Nas seis capturas verificadas não foram encontrados campos EXIF, GPS, comentário ou XMP. No PDF de uma página não foram encontrados documentos embutidos, ação JavaScript, números formatados de CPF/CNPJ, e-mail adicional ou caminho local nos campos examinados.

Essas verificações são pontuais. Cada nova captura, PDF ou anexo precisa de revisão de conteúdo e metadados; o script textual não faz OCR nem interpreta todos os formatos binários.

## Verificação automatizada

```bash
node --test tests/*.test.mjs
node scripts/verify-site.mjs
node scripts/audit-publication.mjs
```

O último comando inspeciona os arquivos textuais do repositório e sinaliza padrões reconhecíveis de credenciais, chaves privadas, JWTs, documentos e telefones formatados, e-mails fora da política, caminhos locais e URLs com credenciais. Bloqueia arquivos de ambiente, chaves e relatórios brutos. Não imprime os valores encontrados: apenas arquivo, linha e regra.

A ausência de correspondências não comprova ausência de dados pessoais: nomes, endereços livres, números sem formatação, texto dentro de imagens e valores em formatos não reconhecidos exigem inspeção específica.

## Site e serviços externos

Nos arquivos próprios do site atual não foi identificado formulário que envie dados a um servidor, chamadas `fetch` ou bibliotecas de analytics/rastreamento. Os exemplos arquivados têm formulários com armazenamento local do navegador. Isso não significa que GitHub Pages ou os destinos externos não registrem acessos; seus tratamentos não foram auditados aqui.

O estudo de caso descreve cuidados técnicos documentados no CondoSphere. Publicação da implementação de privacidade, homologação autenticada, retenção e conformidade jurídica integral continuam fora do que este material comprova. Referência normativa: arts. 6º e 46 da [LGPD](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm).
