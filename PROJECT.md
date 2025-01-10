# Challenge Fullstack

## Visão Geral

Este projeto é um aplicativo de gerenciamento de produtos desenvolvido como um desafio. Ele consiste em uma API backend construída com Laravel 11 e uma SPA frontend implementada com React 19. Abaixo está uma explicação detalhada das tecnologias utilizadas, funcionalidades implementadas e instruções para configurar e executar o projeto.

# Backend - API Laravel

## Tecnologias e Ferramentas:

Laravel 11: Framework para construção da API RESTful.

Laravel Sanctum: Para autenticação de usuários e gerenciamento de tokens. O Sanctum permite a emissão de tokens de API para autenticar solicitações, facilitando a proteção de rotas.

Laravel Purity: Para implementação de funcionalidades avançadas de filtragem, ordenação e paginação.

PHPUnit: Utilizado para escrever e executar testes unitários.

## Funcionalidades:

### Operações CRUD: Implementação completa para gerenciamento de produtos, incluindo os seguintes campos:

id: Identificador único

name: Nome do produto

description: Descrição detalhada do produto

price: Preço em formato decimal

quantity: Quantidade de itens disponíveis

active: Booleano para indicar se o produto está ativo ou inativo

### Autenticação:

Funcionalidade de registro e login de usuários.

Acesso às rotas de criação, atualização e exclusão restrito a usuários autenticados usando Sanctum.

### Filtros Avançados:

Ordenação por nome, preço e quantidade e filtragem de produtos com base em status podendo ser ativos(1) ou inativos(0).

Suporte à paginação.

### Testes Unitários:

Testes abrangentes escritos para todas as operações CRUD no ProductController.

Testes localizados no diretório tests/Unit.

## Destaques da Estrutura de Pastas:

Rotas: Definidas em routes/api.php.

Model: app/Http/Models/Product.php.

Resource: Para tratamento e para transformação de models e collections em JSON está em app/Http/Resources/ProductResource.php.

Request: Para validação e centralização de regras está em app/Http/Requests/.

Controllers: Toda a lógica do CRUD está em app/Http/Controllers/Api/ProductController.php e a lógica de autenticação em app/Http/Controllers/Api/AuthController.php.

Testes: Testes unitários estão em tests/Unit.

# Frontend - SPA React

## Tecnologias e Ferramentas:

React 19: Biblioteca principal para construção da Single Page Application.

React Router DOM: Para navegação e gerenciamento de rotas.

Context API: Usada para gerenciamento global de estado, incluindo autenticação e estado da aplicação.

Axios: Para realizar requisições HTTP à API Laravel.

Bootstrap: Para construção de uma interface responsiva.

React-Paginate: Para implementação de paginação.

## Funcionalidades:

### Autenticação:

Autenticação baseada em token integrada com o Laravel Sanctum.

Funcionalidade de login e registro de usuários.

### Operações CRUD:

Listar produtos com paginação e filtros.

Criar, editar e excluir produtos.

Visualizar informações detalhadas sobre um produto específico.

### Gerenciamento Global de Estado:

Contexto centralizado para autenticação.

Rotas privadas para proteger páginas autenticadas usando o
PrivateRoute do React Router DOM.

### Paginação, ordenação e Filtragem:

Paginação utilizando o react-paginate.

Filtragem por status do produto (ativo/inativo).

Ordenação em colunas como "nome", "preço", "quantidade".

### Gerenciamento de Requisições HTTP:

Interceptores do Axios para gerenciar tokens e manipular
requisições/respostas HTTP.

## Destaques da Estrutura de Pastas:

Views: Organizadas por funcionalidade (ex.: formProduct, products,
showProduct, etc).

Contexts: Contexto de autenticação localizado em
src/contexts/contextprovider.jsx.

Rotas: Definidas em src/router.jsx.

## Instruções de Configuração:

### Pré-requisitos:

PHP >= 8.2

Node.js >= 18

Composer >= 2.0

Banco de dados MySQL

### Configuração do Backend:

1. Clone o repositório e navegue até o diretório do backend.

```bash
cd backend
```

2. Instale as dependências:

```bash
composer install
```

3. Configure o arquivo .env

4. Defina as credenciais do banco de dados.

```
DB_CONNECTION=mysql
DB_HOST=""
DB_PORT=""
DB_DATABASE=""
DB_USERNAME=root
DB_PASSWORD=
```

5. Execute as migrações e seeders:

```bash
php artisan migrate

php artisan db:seed
```

6. Gere a chave da aplicação:

```bash
php artisan key:generate
```

7. Inicie o servidor de desenvolvimento:

```bash
php artisan serve
```

### Configuração do Frontend:

1. Navegue até o diretório do frontend.

```bash
  cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

### Testes:

1. Para executar os testes unitários do backend:

```bash
php artisan test
```

**Certifique-se de que todos os testes em tests/Unit passem com sucesso.**

## Notas Adicionais:

Os tokens de autenticação são armazenados no local storage do navegador.

Todas as respostas da API seguem uma estrutura JSON consistente para facilitar a integração.

Ordenação, filtragem e paginação melhoram a usabilidade e escalabilidade da listagem de produtos.

## Considerações finais:

Esse projeto foi desenvolvido com o objetivo de demonstrar habilidades em desenvolvimento fullstack.
