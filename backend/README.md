# Projeto: **challenge-fullstack**

Este é um projeto **full-stack** utilizando **Laravel** no backend e **React** no frontend. O ambiente de desenvolvimento é configurado com **Docker Sail**, que facilita a criação de um ambiente isolado e consistente para todos os desenvolvedores.

## Configuração do Ambiente

### 1. Clone o Repositório


Para Executar o Projeto basta seguir os seguintes passos:

1. Clone o repositório do projeto para sua máquina:

``` 
    git clone https://github.com/usuario/nome-do-projeto.git 
```
    
e em seguida: 

```
    cd nome-do-projeto
```

2. Crie uma Cópia do arquivo ```.env.example```
    
    2.1. Renomeie o arquivo para ```.env```

    2.2. Eu ja deixei o arquivo de exemplo preenchido conforme o necessário para fazer as conexões.

    Caso haja algum problema com a utilização das portas padroes do laravel, você pode sempre editar conforme necessario no seu arquivo ```.env``` e caso seja necessario no arquivo ```docker-compose.yml```

3. Na pasta raiz do repositorio execute o seguinte comando:

```
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php84-composer:latest \
    composer install --ignore-platform-reqs
```
Esse comando vai instalar as nossas dependencias do php e baixar a Imagem do Sail para executar o projeto

4. Uma vez que o comando anterior ja foi executado
vamos executar o seguinte comando para iniciar o Sail

```
./vendor/bin/sail up -d
```

Agora temos o projeto executando, mas ainda faltam alguns passos.

5. Execute para criar a chave da aplicação 

```
./vendor/bin/sail artisan key:generate
```

6. Então execute as Migrations para criar a estrutura do banco de dados

```
./vendor/bin/sail artisan migrate 
```

e em seguida executar as seeders para popular o banco 
```
./vendor/bin/sail artisan db:seed  
```

Pronto, com isso você tem a  api da aplicação pronta e rodando conforme planejado.

## Tecnologias Utilizadas

- **Docker**
- **Laravel 11**
- **PHP**
