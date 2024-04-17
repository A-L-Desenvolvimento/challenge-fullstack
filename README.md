# Desafio: Cadastro de Produtos

**Atenção, Dev!**

Antes de "meter a mão na massa", leia com atenção todas as instruções abaixo.


## Primeira Etapa - API (backend)
1 - Configuração Inicial:

- Clone o repositório Git fornecido.
- Instale todas as dependências do projeto usando o Composer.
- Crie um arquivo .env apropriado com base no arquivo .env.example fornecido e gere uma nova chave para a aplicação Laravel.

2 - Modelo e Migração:

- Crie um modelo e uma migração para uma entidade Product com os seguintes campos: id, name, description, price, quantity, active.
- Execute a migração para criar a tabela correspondente no banco de dados.

3 - Seeders e Factories:

- Crie um seeder e uma factory para popular a tabela products com dados fictícios.
- Execute o seeder para adicionar dados à tabela.

4 - Rotas e Controladores:

- Crie rotas RESTful para manipular recursos de produtos.
- Crie um controlador ProductController com métodos para listar todos os produtos, exibir um único produto, criar um novo produto, atualizar um produto existente e excluir um produto.

5 - Autenticação e Autorização:

- Implemente autenticação de usuário.
- Restrinja o acesso às rotas de criação, atualização e exclusão de produtos apenas para usuários autenticados.
- Apenas usuários autenticados devem poder acessar as páginas de criação, edição e exclusão de produtos.

6 - Testes Unitários:

- Escreva testes unitários para pelo menos um método em seu controlador ProductController.
- Use o PHPUnit para escrever e executar os testes.

O retorno da consulta a API deve ser realizado em formato JSON e seguindo a estrutura abaixo:

```
{
    id: 1,
    name: 'Playstation 5',
    description: 'Reproduza jogos do PS5 e do PS4 em Blu-ray Disc. Você também pode baixar jogos do PS5 e do PS4 digitais a partir da PlayStation Store.'
    price: 3550, 
    quantity: 100
    active: true    
},
```

___
## Segunda Etapa - SPA (frontend)

Para consumir os dados da API, você deverá criar uma SPA em ReactJS, pode ser isolado ou utilizando o Inertia no Laravel.
Esta SPA deverá conter: 
- Uma página para exibir todos os produtos cadastrados.
- Uma página para exibir detalhes de um produto específico.
- As páginas devem ser acessíveis através de rotas definidas na primeira etapa.

Na **primeira rota**, cada linha da tabela deverá conter uma coluna "Ações".
Dentro desta coluna, deverá haver um botão com um link para a **página de detalhes do produto**, onde serão exibidos todos os dados daquele produto.

___
## **O que vamos avaliar:**

- Desempenho;
- Manutenibilidade;
- Organização e clareza do código;
- Conhecimento ferramental;
- Aplicação de boas práticas.

___
## **Para finalizar...**
Se liga nessas informações importantes para o início e conclusão do desafio:

- Crie um **fork** e desenvolva a sua solução nele.
- Crie um **PROJECT.md** com a explicação de como devemos executar o projeto e o máximo de detalhes possível sobre o que foi feito e como foi feito (bibliotecas utilizadas, o porquê de utilizá-las, etc).
- Após concluir todas as tarefas, faça um **pull request**.
- Envie um E-mail para "**alexander@aldesenvolvimento.com.br**" com o link do seu **pull request** e com o assunto "**Challenge Accepted**".

Caso tenha alguma dívida, entre em contato conosco também através do E-mail "**alexander@aldesenvolvimento.com.br**".
___
### **Bom... Por enquanto é só isso tudo.**

Um excelente desafio! o/
#### **VAMBORA PRA CIMA!**
