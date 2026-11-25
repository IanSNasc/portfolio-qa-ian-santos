# Portal de eventos culturais — Projeto acadêmico

Projeto de Extensão I citado nos currículos anteriores como “Novo Palco Ilê Aió”. O repositório público é [`IanSNasc/meu-projeto-flask`](https://github.com/IanSNasc/meu-projeto-flask).

## Objetivo e implementação observada

Publicação de eventos e recebimento de inscrições, com interface web e API em Python/Flask.

- `src/models/evento.py` define eventos com título, descrição e data.
- `src/models/inscricao.py` define os dados da inscrição.
- `src/routes/evento_api.py` contém leitura pública de eventos e operações administrativas.
- `src/routes/inscricao_api.py` contém recebimento público e consulta administrativa de inscrições.
- A configuração utiliza SQLAlchemy e conexão MySQL via PyMySQL.

## O que foi conferido

Leitura estática dos arquivos de configuração, modelos e rotas em 25/11/2026. Não houve execução da aplicação, criação de banco, envio de inscrições ou teste de implantação. A existência dos endpoints não é apresentada como comprovação de funcionamento completo ou segurança de produção.

O projeto complementa os casos principais com experiência acadêmica em rotas HTTP, persistência relacional e integração entre interface e backend. Não se presume que seja o mesmo sistema de barbearia em Java descrito nos currículos mais antigos.
