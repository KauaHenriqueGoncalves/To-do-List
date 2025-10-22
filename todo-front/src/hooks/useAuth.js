
// import { useState, useEffect } from 'react';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// export function useAuth() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('user-token');
//     const savedUser = localStorage.getItem('user-data');
    
//     if (token && savedUser) {
//       setIsAuthenticated(true);
//       setUser(JSON.parse(savedUser));
//     }
//     setLoading(false);
//   }, []);

//   const login = async (username, password) => {
//     try {
//       const response = await fetch(`${API_URL}/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: username, password }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({ message: 'Usuário ou senha não encontrado' }));
//         return { success: false, message: errorData.message };
//       }

//       const data = await response.json();
//       const userData = { name: data.name, id: data.id };
//       localStorage.setItem('user-token', data.id);
//       localStorage.setItem('user-data', JSON.stringify(userData));
      
//       setUser(userData);
//       setIsAuthenticated(true);
//       return { success: true };

//     } catch (error) {
//       console.error("Erro de Rede ou CORS:", error);
//       return { success: false, message: 'Não foi possível conectar ao servidor.' };
//     }
//   };
  
//   const signup = async (username, password) => {
//     try {
//       const response = await fetch(`${API_URL}/signup`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: username, password }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         if (errorData.message?.includes("already exists")) {
//             return { success: false, message: 'Usuário já está em uso.' };
//         }
//         return { success: false, message: 'Não foi possível criar a conta.' };
//       }
      
//       return { success: true };

//     } catch (error) {
//       console.error("Erro de Rede ou CORS:", error);
//       return { success: false, message: 'Não foi possível conectar ao servidor.' };
//     }
//   };

//   const updateUser = async (name, password) => {
//     const token = localStorage.getItem('user-token');
//     // Se não houver alteração, não faz a chamada
//     if (!name && !password) return;

//     // Constrói o corpo da requisição apenas com os dados que serão alterados
//     const body = {};
//     if (name) body.name = name;
//     if (password) body.password = password;

//     try {
//       const response = await fetch(`${API_URL}/user`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'user-id': token
//         },
//         body: JSON.stringify(body),
//       });

//       if (!response.ok) throw new Error("Falha ao atualizar usuário");

//       // Se o nome foi alterado, atualiza o estado local e o localStorage
//       if (name) {
//         const updatedUser = { ...user, name };
//         setUser(updatedUser);
//         localStorage.setItem('user-data', JSON.stringify(updatedUser));
//       }
//       return { success: true };
//     } catch (error) {
//       console.error("Erro ao atualizar usuário:", error);
//       return { success: false, message: error.message };
//     }
//   };

//   const deleteUser = async () => {
//     const token = localStorage.getItem('user-token');
//     try {
//       const response = await fetch(`${API_URL}/user`, {
//         method: 'DELETE',
//         headers: { 'user-id': token },
//       });

//       if (!response.ok) throw new Error("Falha ao deletar usuário");
      
//       return { success: true };
//     } catch (error) {
//       console.error("Erro ao deletar usuário:", error);
//       return { success: false, message: error.message };
//     }
//   };
  
//   const logout = () => {
//     localStorage.removeItem('user-token');
//     localStorage.removeItem('user-data');
//     setIsAuthenticated(false);
//     setUser(null);
//   };

//   return { isAuthenticated, loading, user, login, logout, signup, updateUser, deleteUser };
// }

import { useState, useEffect } from 'react';

// Acessa a variável de ambiente para a URL da API, com um fallback para localhost.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

/**
 * @hook useAuth
 * @description Hook customizado para gerenciar todo o ciclo de vida da autenticação do usuário,
 * incluindo estado, persistência de sessão e comunicação com a API.
 * @returns {object} Um objeto contendo o estado da autenticação e as funções para interagir com a API.
 * - `isAuthenticated {boolean}`: Verdadeiro se o usuário estiver logado.
 * - `loading {boolean}`: Verdadeiro enquanto a sessão inicial está a ser verificada no localStorage.
 * - `user {object|null}`: Dados do usuário autenticado (id, name).
 * - `login {Function}`: Função para autenticar um usuário via API.
 * - `logout {Function}`: Função para deslogar o usuário, limpando a sessão.
 * - `signup {Function}`: Função para registar um novo usuário via API.
 * - `deleteUser {Function}`: Função para apagar a conta do usuário via API.
 */
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Efeito executado na inicialização para verificar se já existe uma sessão no localStorage.
  useEffect(() => {
    const token = localStorage.getItem('user-token');
    const savedUser = localStorage.getItem('user-data');
    
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  /**
   * Envia as credenciais para a API para autenticar um usuário.
   * @param {string} username - O nome de usuário.
   * @param {string} password - A senha.
   * @returns {Promise<object>} Um objeto com `{ success: boolean, message?: string }`.
   */
  const login = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Usuário ou senha não encontrado' }));
        return { success: false, message: errorData.message };
      }

      const data = await response.json();
      const userData = { name: data.name, id: data.id };
      localStorage.setItem('user-token', data.id);
      localStorage.setItem('user-data', JSON.stringify(userData));
      
      setUser(userData);
      setIsAuthenticated(true);
      return { success: true };

    } catch (error) {
      console.error("Erro de Rede ou CORS:", error);
      return { success: false, message: 'Não foi possível conectar ao servidor.' };
    }
  };
  
  /**
   * Envia os dados de um novo usuário para a API para registo.
   * @param {string} username - O nome de usuário desejado.
   * @param {string} password - A senha desejada.
   * @returns {Promise<object>} Um objeto com `{ success: boolean, message?: string }`.
   */
  const signup = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (errorData.message?.includes("already exists")) {
            return { success: false, message: 'Usuário já está em uso.' };
        }
        return { success: false, message: 'Não foi possível criar a conta.' };
      }
      
      return { success: true };

    } catch (error) {
      console.error("Erro de Rede ou CORS no registo:", error);
      return { success: false, message: 'Não foi possível conectar ao servidor.' };
    }
  };

  /**
   * Envia uma requisição para apagar a conta do usuário autenticado.
   * @returns {Promise<object>} Um objeto com `{ success: boolean, message?: string }`.
   */
  const deleteUser = async () => {
    const token = localStorage.getItem('user-token');
    try {
      const response = await fetch(`${API_URL}/user`, {
        method: 'DELETE',
        headers: { 'user-id': token },
      });

      if (!response.ok) throw new Error("Falha ao apagar usuário");
      
      return { success: true };
    } catch (error) {
      console.error("Erro ao apagar usuário:", error);
      return { success: false, message: error.message };
    }
  };
  
  /**
   * Realiza o logout do usuário, limpando o localStorage e o estado da aplicação.
   */
  const logout = () => {
    localStorage.removeItem('user-token');
    localStorage.removeItem('user-data');
    setIsAuthenticated(false);
    setUser(null);
  };

  // As funções de login, signup, etc., não são mais retornadas, pois não são usadas diretamente
  return { isAuthenticated, loading, user, login, logout, signup, deleteUser };
}