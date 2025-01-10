# Product API

Este projeto é uma API de produto construída com PHP e Laravel. Inclui recursos para listar, criar, atualizar e excluir produtos, com autenticação e validação.

## Requisitos

- PHP
- Composer
- NPM
- MySql

## Bibliotecas
- Passport
  - Para a autenticação, foi utilizado o Laravel Passport, que fornece uma API completa para autenticação de usuários.
  - Documentação: [Laravel Passport](https://laravel.com/docs/8.x/passport)

## Frontend
- O SPA que consome essa API está disponível dentro da pasta [challenge-frontend](./challenge-frontend) dentro deste repositório, na pasta `challenge-frontend` tem um README com as instruções de instalação e execução.

## Instalação via Docker
- Para rodar a aplicação com Docker via Laravel Sail, utilize o seguinte comando:
```sh
  #instalar as dependencias
  composer install
  
  # montar o container
  ./vendor/bin/sail up -d --build
```

Após a execução do comando, a aplicação estará disponível em [http://localhost:8000](http://localhost:8000).
Será necessário rodar as migrations e os seeders para criar as tabelas e popular o banco de dados e configurar o Passport.
```sh
php artisan passport:install
```
**Nota:** Use o Client ID e o Client Secret gerados para configurar as variaveis de ambiente no arquivo `.env`.
```sh
PASSPORT_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PASSPORT_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```



## Instalação manual
 
1. Clone o repositorio:

2. Instale as dependencias PHP:
    ```sh
    composer install
    ```

3. Instale as dependencias JavaScript:
    ```sh
    npm install
    ```

4. Copie o arquivo `.env` e configure as variaveis de ambiente:
    ```sh
    cp .env.example .env
    ```

5. Gerar a chave da aplicação:
    ```sh
    php artisan key:generate
    ```

6. Gerar as chaves de acesso do Passport:
    ```sh
    php artisan passport:install
    ```
   **Nota:** Use o Client ID e o Client Secret gerados para configurar as variaveis de ambiente no arquivo `.env`.
    ```sh
    PASSPORT_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    PASSPORT_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    ```
   
7. Inicie o servidor:
    ```sh
    php artisan serve
    ```

8. Migrar o banco de dados:
    ```sh
    php artisan migrate
    ```
9. Rode os Seeders:
    ```sh
    php artisan db:seed
    ```

## Rodando os testes
Para rodar os testes, utilize o seguinte comando:
```sh
php artisan test
```

** Qualquer dúvida, entre em contato pelo e-mail **juninhomb2009@gmail.com**.
