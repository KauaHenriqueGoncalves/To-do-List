# To-Do List API

API RESTful para gerenciamento de listas de tarefas, desenvolvida com Java e Spring Boot. A aplicação utiliza H2 para testes e PostgreSQL para produção, com toda a infraestrutura containerizada via Docker.

## Tecnologias

- **Java** com **Spring Boot**
- **H2 Database** (ambiente de desenvolvimento/testes)
- **PostgreSQL** (ambiente de produção)
- **Docker** para containerização

## Funcionalidades

### Autenticação e Segurança
- Sistema completo de cadastro e autenticação de usuários
- Proteção de dados sensíveis com criptografia (XOR)
- Autorização baseada em propriedade: apenas o proprietário pode acessar e modificar seus próprios dados

### Gerenciamento de Coleções
- ✅ Criar novas coleções
- 📖 Listar coleções do usuário
- ✏️ Atualizar coleções existentes
- 🗑️ Excluir coleções

### Gerenciamento de Itens
- ✅ Adicionar itens às coleções
- 📖 Visualizar itens
- ✏️ Editar itens existentes
- 🗑️ Remover itens

## Segurança

A API implementa controle de acesso rigoroso, garantindo que:
- Cada usuário acessa apenas seus próprios recursos
- Proteção contra acesso não autorizado, mesmo com conhecimento dos IDs
- Validação de propriedade em todas as operações CRUD

## Docker

A aplicação está completamente containerizada com dois containers:
1. **Container da API** (Spring Boot)
2. **Container do Banco de Dados** (PostgreSQL)

## Pré-requisitos

- Docker e Docker Compose instalados

## Como Executar
```bash
# Clone o repositório
git clone https://gitlab.com/KauaHenriqueGoncalves/todo_list.git

# Direcione ao diretorio da api
cd ./todo-api

# Execute com Docker Compose
docker-compose up -d
```

A API estará disponível em `http://localhost:8080`

## ️ Perfis de Desenvolvimento

A aplicação possui dois perfis configuráveis para diferentes ambientes:

### Configuração

Navegue até o arquivo de configuração:
```
./todo-api/src/main/resources/application.properties
```

### Perfis Disponíveis

Altere a propriedade `spring.profiles.active` conforme o ambiente desejado:

| Perfil | Descrição | Banco de Dados |
|--------|-----------|----------------|
| `test` | Ambiente de desenvolvimento e testes | H2 (em memória) |
| `prod` | Ambiente de produção | PostgreSQL |

### Exemplo de Uso
```properties
# Para ambiente de testes
spring profiles active=test

# Para ambiente de produção
"spring profiles active=prod
```

### Dica

- Use o perfil `test` durante o desenvolvimento para facilitar testes rápidos sem necessidade de configurar o PostgreSQL
- O perfil `prod` deve ser utilizado apenas em ambiente de produção com Docker