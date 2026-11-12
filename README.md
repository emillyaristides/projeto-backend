
# Digital Store API

API desenvolvida como projeto de conclusão do módulo de Backend da Digital College.

## Tecnologias utilizadas

- Node.js
- Express
- Sequelize
- MySQL
- JWT (autenticação)
- Swagger (documentação da API)

## Funcionalidades

- Cadastro, consulta, atualização e exclusão de usuários.
- Autenticação de usuários com JWT.
- Cadastro e gerenciamento de categorias.
- Cadastro e gerenciamento de produtos.
- Gerenciamento de imagens dos produtos.
- Gerenciamento de opções dos produtos.
- Associação entre produtos e categorias.

## Instalação

1. Clone este repositório.
2. Entre na pasta do projeto.
3. Instale as dependências:

```bash
npm install
```

4. Configure a conexão com o banco de dados MySQL nos arquivos da pasta src/config.
5. Configure o banco de dados MySQL.


## Banco de dados

O projeto utiliza MySQL como sistema de gerenciamento de banco de dados e Sequelize como ORM.

Crie um banco de dados chamado `projeto_backend` no MySQL antes de executar a aplicação.

As configurações de conexão estão nos arquivos da pasta `src/config`.

## Executar o projeto

Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run dev
```

Para iniciar o servidor em modo normal:

```bash
npm start
```

O servidor será iniciado em:

http://localhost:3000


## Documentação

A documentação da API está disponível através do Swagger:

http://localhost:3000/api-docs
