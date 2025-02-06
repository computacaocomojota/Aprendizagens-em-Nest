# Criando uma API Restful
O objetivo inicial deste projeto foi desenvolver uma API Restful com um CRUD básico para gerenciar o funcionamento de uma loja.

## Conhecimentos aprendidos:
- Entendi o gerenciamento de arquivos no Nest.js.
- Aprendi sobre Modules, Controllers, Providers e Pipes.
- Compreendi o princípio da Injeção de Dependência, baseado no D do SOLID (Dependency Inversion Principle – DIP).
- Realizei transformações, validações síncronas e assíncronas.
- Compreendi a importância da criação de DTOs e Entidades.
- Implementei operações de Create, Read, Update e Delete (CRUD).

# Persistindo dados com TypeORM e PostgreSQL
Anteriormente, os dados eram armazenados apenas em memória durante a execução do sistema. Para garantir a persistência das informações, passamos a utilizar um banco de dados PostgreSQL, mapeando nossas entidades com o TypeORM.

## Conhecimentos aprendidos:

- Utilizei o Docker para inicializar contêineres do PostgreSQL e do pgAdmin.
- Entendi a importância de um arquivo .env para gerenciar variáveis de ambiente, garantindo a segurança de informações sensíveis.
- Compreendi o conceito e o funcionamento de um DataSource.
- Aprendi sobre padrões de acesso a dados, como Active Record e Repository Pattern.
- Explorei o conceito de ORM e utilizei o TypeORM para mapear as entidades do projeto.
- Reconheci a importância das colunas created_at, updated_at e deleted_at para rastrear a evolução dos registros.
- Melhorei a estrutura do projeto, separando responsabilidades dos controllers para os services.
- Estudei os diferentes tipos de relacionamentos no banco de dados e como mapeá-los no TypeORM.
- Aprendi sobre cascading e sua importância para garantir que ações, como exclusões na tabela pai, sejam refletidas na tabela filha, evitando dados órfãos no banco.
