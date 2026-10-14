# To-Do List

Aplicação full-stack para gerenciamento de listas de tarefas com autenticação de usuários, coleções personalizadas e interface moderna.

## Tecnologias

**Backend:**
- Java + Spring Boot
- PostgreSQL / H2
- Docker

**Frontend:**
- React 19 + Vite
- Tailwind CSS
- React Router DOM

## Funcionalidades

- Sistema de autenticação (registro e login)
- Criar e organizar coleções de tarefas
- Adicionar, editar e marcar tarefas como concluídas
- Excluir coleções e tarefas
- Estatísticas de conclusão

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [Docker](https://www.docker.com/) e Docker Compose

## 🛠️ Como Executar

### 1. Clone o repositório
```bash
git clone https://gitlab.com/KauaHenriqueGoncalves/todo_list.git
cd todo_list
```

### 2. Inicie o Backend
```bash
cd todo-api
docker-compose up -d --build
```
✅ API rodando em: `http://localhost:8080`

### 3. Inicie o Frontend
```bash
cd ../todo-front
npm install
echo "VITE_API_URL=http://localhost:8080" > .env
npm run dev
```
✅ App rodando em: `http://localhost:5173`

## Estrutura do Projeto
```
📦 todo-list/
├── todo-api/      # Backend (Spring Boot + PostgreSQL)
└── todo-front/    # Frontend (React + Tailwind)
```
