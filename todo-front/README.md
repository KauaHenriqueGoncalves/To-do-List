# To-Do List - Aplicação Front-End

Este é o front-end da aplicação To-Do List, desenvolvida com React e Vite. A interface é estilizada com Tailwind CSS e utiliza a biblioteca de ícones Lucide React para uma aparência moderna e limpa.

## Funcionalidades

  - **Autenticação de Usuário:** Sistema completo de login e registo de contas.
  - **Gestão de Sessão:** A sessão do usuário é persistida no `localStorage`, permitindo que o usuário continue logado após fechar o navegador.
  - **Gestão de Coleções:**
      - Criar, renomear e apagar coleções de tarefas.
      - Alerta de confirmação para evitar a exclusão acidental de coleções.
  - **Gestão de Tarefas (To-Do Items):**
      - Adicionar, editar e apagar tarefas dentro de uma coleção.
      - Marcar tarefas como concluídas.
  - **Feedback Visual:** A aplicação fornece feedback claro para o usuário através de popups de sucesso e erro para todas as ações importantes.
  - **Gestão de Conta:** Menu de usuário com opções para fazer logout e apagar a conta (com modal de confirmação).
  - **Design Responsivo:** A interface se adapta a diferentes tamanhos de ecrã, com uma `sidebar` que se oculta em dispositivos móveis.

## Tecnologias Utilizadas

  - **React 19:** Biblioteca principal para a construção da interface de usuário.
  - **Vite:** Ferramenta de build extremamente rápida para desenvolvimento front-end.
  - **React Router DOM:** Para a gestão de rotas da aplicação (navegação entre páginas).
  - **Tailwind CSS:** Framework CSS utility-first para uma estilização rápida e consistente.
  - **Lucide React:** Biblioteca de ícones SVG, leve e personalizável.

## Estrutura de Pastas

O projeto está organizado com uma estrutura clara e escalável, separando as responsabilidades em diferentes diretórios.

```
/src
|
├── /assets         # Imagens estáticas e SVGs.
|
├── /components     # Componentes reutilizáveis da UI.
|   ├── /sidebar    # Componentes específicos da barra lateral (lista de coleções, etc.).
|   ├── /todo       # Componentes para a lista de tarefas (TodoList, TodoItem).
|   └── /ui         # Componentes genéricos de UI (Button, Input, Modal, Popup).
|
├── /hooks          # Hooks customizados (ex: useAuth para a lógica de autenticação).
|
├── /layouts        # Componentes de layout da estrutura da página (ex: MainLayout).
|
├── /pages          # Componentes que representam as páginas da aplicação (Login, Register, Dashboard).
|
├── /routes         # Configuração do roteamento da aplicação.
|
├── App.jsx         # Componente raiz que monta o roteador.
└── main.jsx        # Ponto de entrada da aplicação React.
```

## Componentes Principais

### Componentes de UI (`/components/ui`)

  - **`Button.jsx`**: Botão genérico com variantes (`primary`, `secondary`, `danger`).
  - **`Input.jsx`**: Campo de input estilizado, com funcionalidade de toggle para visibilidade de senha.
  - **`Modal.jsx`**: Janela de confirmação genérica, usada para ações destrutivas como apagar contas ou coleções.
  - **`Popup.jsx`**: Notificação flutuante para feedback de sucesso ou erro, que desaparece automaticamente.

### Componentes da Sidebar (`/components/sidebar`)

  - **`UserSettings.jsx`**: Card que exibe as informações do usuário e o menu de ações (logout, apagar conta).
  - **`CollectionList.jsx`**: Renderiza a lista de coleções e controla a UI para adicionar uma nova coleção.
  - **`CollectionItem.jsx`**: Representa uma única coleção na lista, com modos de exibição, edição e um menu de opções.

### Componentes de Tarefas (`/components/todo`)

  - **`TodoList.jsx`**: Organiza a exibição da lista de `TodoItem` e o painel de estatísticas.
  - **`TodoItem.jsx`**: Representa uma única tarefa, com checkbox, texto, e opções de editar/apagar que aparecem no hover.

## Dependências Externas

As principais dependências do projeto estão listadas no arquivo `package.json`:

  - **`react`**: Biblioteca principal.
  - **`react-dom`**: Para a renderização no DOM.
  - **`react-router-dom`**: Para o roteamento.
  - **`lucide-react`**: Para os ícones.
  - **`tailwindcss`**: Para a estilização.

## Setup e Instalação

Antes de iniciar, certifique-se de que tem o [Node.js](https://nodejs.org/) (versão 18 ou superior) e o [Docker](https://www.docker.com/) instalados.

### 1\. Back-End

A aplicação front-end precisa que o back-end esteja a ser executado para funcionar.

1.  Navegue até a pasta do back-end (`/todo-api`).
2.  Execute o Docker Compose para construir e iniciar os contentores da API e do banco de dados:
    ```bash
    docker-compose up -d --build
    ```
    A API estará disponível em `http://localhost:8080`.

### 2\. Front-End

1.  **Clone o repositório** (se ainda não o fez).

2.  **Navegue até a pasta do front-end**:

    ```bash
    cd todo-front
    ```

3.  **Instale as dependências** do projeto:

    ```bash
    npm install
    ```

4.  **Configure as Variáveis de Ambiente**:
    Crie um arquivo chamado `.env` na raiz da pasta `todo-front` e adicione a seguinte linha. Este arquivo informa ao front-end onde encontrar a API.

    ```
    VITE_API_URL=http://localhost:8080
    ```

## Como Rodar o Projeto

Com o back-end já a ser executado via Docker, inicie o servidor de desenvolvimento do front-end:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (ou em outra porta, se esta estiver em uso).