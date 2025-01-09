# Challenge FullStack

## 1. Resumo

O desafio consiste no desenvolvimento de um sistema de cadastro de produtos. A aplicação foi construída utilizando **Laravel 10** como framework backend, com **Inertia.js** para integrar Laravel com o **React** no frontend.

O objetivo principal é criar um sistema simples para cadastrar, editar, listar e excluir produtos, com funcionalidades básicas de autenticação e testes unitários.

## 2. Principais Bibliotecas Utilizadas

- **Laravel Breeze**: Um starter kit que proporciona uma rápida configuração do React com Laravel e Inertia, além de fornecer um template inicial com autenticação para o sistema utilizando o Sanctum.
  
- **PrimeReact**: Uma biblioteca de componentes React para construção de interfaces de usuário ricas e responsivas. Oferece diversos componentes como botões, tabelas, formulários e muito mais, permitindo um desenvolvimento rápido e consistente.

- **PrimeIcons**: Um conjunto de ícones vetoriais utilizados junto com PrimeReact para fornecer ícones consistentes e visualmente agradáveis na interface. É uma biblioteca leve e fácil de integrar com os componentes de PrimeReact.

## 3. Como Configurar o Projeto

Siga os passos abaixo para configurar o projeto em seu ambiente local:

1. **Clone o repositório do projeto**

```bash
git clone git@github.com:WilliamJSS/challenge-fullstack.git
```

2. **Navegue até a pasta do projeto**

```bash
cd challenge-fullstack
```

3. **Vá para a branch correspondente**

```bash
git checkout feat/william-cadastro-produtos
```

4. **Execute o script de configuração do projeto**

É necessário ter o `make` instalado, caso não tenha execute o comando `sudo apt install make`

```bash
make setup
```

***Observações**: Se o script apresentar erro em algum dos passos, abra o arquivo setup e tente executar manualmente cada comando restante que estiver no script.*

5. **Accesse o projeto em `http://localhost`**

## 4. Rotas Web

| Rota               | Autenticado | Descrição                                   |
| ------------------ | ----------- | ------------------------------------------- |
| `/login`           | Não         | Página de login                             |
| `/register`        | Não         | Página de registro                          |
| `/` ou `/products` | Não         | Página de listagem de produtos              |
| `/products/{id}`   | Não         | Página de detalhes de um produto específico |

## 4. Rotas API

| Método     | Rota                 | Autenticado | Descrição                      |
| ---------- | -------------------- | ----------- | ------------------------------ |
| **POST**   | `/api/auth/login`    | Não         | Cria um nova sessão e token    |
| **POST**   | `/api/auth/register` | Não         | Cria um novo usuário           |
| **POST**   | `/api/auth/logout`   | Sim         | Encerra a sessão do usuário    |
| **GET**    | `/api/products`      | Não         | Lista todos os produtos        |
| **POST**   | `/api/products`      | Sim         | Cria um novo produto           |
| **GET**    | `/api/products/{id}` | Não         | Acessa um produto específico   |
| **PUT**    | `/api/products/{id}` | Sim         | Atualiza um produto específico |
| **DELETE** | `/api/products/{id}` | Sim         | Exclui um produto específico   |


## 6. Testes

Para executar os testes execute o comando a seguir:

```bash
make test
```
