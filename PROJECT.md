# Projeto de Cadastro de Produtos

## Descrição do Projeto

Este projeto consiste em uma aplicação web para cadastro de produtos, dividida em duas etapas: API (backend) e SPA (frontend). A API foi desenvolvida utilizando Laravel, enquanto a SPA foi desenvolvida utilizando Inertia.js com React.

## Tecnologias Utilizadas

### Backend

* **Laravel** : Framework PHP utilizado para construir a API.
* **Laravel Sanctum** : Utilizado para autenticação de usuários.
* **Composer** : Gerenciador de dependências para PHP.

### Frontend

* **Inertia.js** : Biblioteca que permite construir SPAs utilizando frameworks do lado do servidor.
* **React** : Biblioteca JavaScript para construção de interfaces de usuário.
* **NPM** : Gerenciador de pacotes para JavaScript.

## Configuração do Ambiente

### Requisitos

* PHP >= 7.3
* Composer
* Node.js
* NPM

### Passos para Configuração

1. **Clone o Repositório**
2. **Instale as Dependências do Backend**

   **composer** **install**
3. **Configure o Arquivo [.env](vscode-file://vscode-app/c:/Users/User/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)**
4. * Copie o arquivo [.env.example](vscode-file://vscode-app/c:/Users/User/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) para [.env](vscode-file://vscode-app/c:/Users/User/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html):

     **cp** **.env.example** **.env**
   * Gere uma nova chave para a aplicação Laravel:

     **php** **artisan** **key:generate**
   * Configure as informações do banco de dados no arquivo [.env](vscode-file://vscode-app/c:/Users/User/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html).
5. **Execute as Migrações e Seeders**

   **php** **artisan** **migrate** **--seed**
6. **Instale as Dependências do Frontend**

   **npm** **install**
7. **Compile os Assets do Frontend**

   **npm** **run** **dev**
8. **Inicie o Servidor de Desenvolvimento**

   **php** **artisan** **serve**
9. **Acesse a Aplicação no Navegador**

   * Abra o navegador e acesse `http://127.0.0.1:8000`.

## Estrutura do Projeto

### Backend

#### Modelos e Migrações

* **Modelo `Product`** : Representa a entidade de produto.
* **Migração `CreateProductsTable`** : Cria a tabela `products` no banco de dados com os campos especificados.

#### Seeders e Factories

* **Factory `ProductFactory`** : Gera dados fictícios para a entidade `Product`.
* **Seeder `ProductSeeder`** : Popula a tabela `products` com dados fictícios.

#### Controladores

* **Controlador `ProductPageController`** : Gerencia as requisições para listar e exibir detalhes dos produtos.

#### Rotas

* **Arquivo `web.php`** : Define as rotas para listar e exibir detalhes dos produtos.

### Frontend

#### Páginas

* **Página Inicial (`Index.jsx`)** : Exibe a lista de produtos cadastrados.
* **Página de Detalhes do Produto (`Show.jsx`)** : Exibe as informações completas de um produto específico.

#### Layout

* **Layout Principal (`AppLayout.jsx`)** : Define o layout principal da aplicação.

## Testes

### Configuração do Ambiente de Teste

1. **Configure o Arquivo **
2. **Execute os Testes**

   **php** **artisan** **test**

### Testes Implementados

* **Testes de Funcionalidade do `ProductController`** : Verificam as operações de listagem, exibição, criação, atualização e exclusão de produtos
