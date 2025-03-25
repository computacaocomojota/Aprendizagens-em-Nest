# API de Gerenciamento de Templates de Prompts com Integração com Google Gemini

### Status: em desenvolvimento

## Descrição

Este projeto consiste em uma API desenvolvida em **Nest.js** para o gerenciamento de templates de prompts com integração com a **API do Google Gemini**. A API permite que os usuários criem, gerenciem e consultem templates de prompts para otimizar a interação com modelos de Inteligência Artificial.

A API foi projetada para ser escalável, eficiente e de fácil manutenção. Ela também conta com recursos de testes automatizados e documentação para facilitar o uso e a integração com outros sistemas.

## Tecnologias Utilizadas

- **Nest.js**: Framework utilizado para criar a API de forma modular, escalável e com foco em boas práticas de desenvolvimento.
  
- **TypeORM**: ORM utilizado para facilitar a manipulação do banco de dados PostgreSQL de maneira eficiente e integrada com o Nest.js.
  
- **Docker**: Utilizado para criar containers de banco de dados PostgreSQL e pgAdmin, garantindo um ambiente de desenvolvimento isolado e consistente.
  
- **API do Google Gemini**: A integração com a API do Google Gemini permite automação e otimização no uso de templates de IA, trazendo poderosas funcionalidades de geração e processamento de prompts.
  
- **Jest**: Framework de testes utilizado para garantir a qualidade do código com testes unitários e de integração.
  
- **Supertest**: Utilizado em conjunto com o Jest para realizar testes de integração na API, simulando requisições HTTP para garantir que os endpoints estejam funcionando corretamente.
  
- **Swagger**: Ferramenta utilizada para gerar e documentar a API automaticamente, permitindo que os desenvolvedores explorem os endpoints e as funcionalidades da API de forma intuitiva.

## Estrutura do Projeto

A estrutura do projeto segue boas práticas de desenvolvimento, com separação clara de responsabilidades e organização modular. A seguir, uma breve descrição dos diretórios e arquivos principais:

- **src/**: Contém o código-fonte da aplicação.
  - **modules/**: Módulos organizados de acordo com as funcionalidades.
  - **config/**: Arquivos de configuração da aplicação.

- **test/**: Contém os arquivos de teste, incluindo testes unitários e de integração.

- **dockerfile/**: Arquivo responsável pela configuração do ambiente Docker, incluindo a definição da imagem e dos comandos necessários para criar o container do banco de dados PostgreSQL e pgAdmin.
- **docker-compose.yml**: Arquivo de configuração utilizado para orquestrar os containers Docker, definindo serviços como o banco de dados PostgreSQL e o pgAdmin.

## Como Rodar o Projeto

1. Clone este repositório:

    ```bash
    git clone https://github.com/username/gemini.git
    cd gemini
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Inicie os containers Docker:

    ```bash
    docker-compose up
    ```

4. Inicie a API:

    ```bash
    npm run start
    ```
5. Para iniciar a API em desenvolvimento:

   ```bash
   npm run start:dev

- A API estará disponível em `http://localhost:3000`.
- O pgAdmin estará disponível em `http://localhost:8080:80`.

## Testes

Os testes unitários e de integração são realizados com **Jest** e **Supertest**. Para rodar os testes, execute:

```bash
npm run test
```

## Documentação da API
A documentação da API está disponível em Swagger. Após iniciar a aplicação, acesse http://localhost:3000/api para explorar os endpoints da API de forma interativa.

## Integração Contínua com GitHub Actions
Para garantir a execução automática dos testes sempre que alterações são feitas no repositório, este projeto utiliza GitHub Actions. A configuração do workflow está presente no diretório .github/workflows/ci.yml.

Esse workflow é executado sempre que há um push ou pull request para o repositório, realizando os seguintes passos:

Instalação das dependências.
Execução dos testes unitários e de integração com Jest.
Relatório dos resultados dos testes.
Como Funciona:
O arquivo ci.yml define o ambiente e os comandos para rodar os testes.
O GitHub Actions dispara automaticamente quando há novas alterações no repositório.
O processo garante que os testes sejam executados em diferentes ambientes (por exemplo, Node.js) para garantir a consistência e a qualidade do código.

## Contribuições
Contribuições são bem-vindas! Para contribuir, siga os seguintes passos:

- Faça um fork deste repositório.
- Crie uma nova branch (git checkout -b feature/nova-feature).
- Faça as alterações desejadas e adicione testes para elas.
- Submeta um pull request com uma descrição clara das modificações.
