/**
 * @file api.js
 * @description Camada de serviço para todas as chamadas à API do backend.
 */

// A URL base aponta para o proxy que configuramos no vite.config.js.
const BASE_URL = '/api';

/**
 * Monta os headers de autenticação para as requisições.
 * Pega o 'user-id' criptografado do localStorage.
 * @returns {HeadersInit}
 */
function getAuthHeaders() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.id) {
    throw new Error('Usuário não autenticado.');
  }
  return {
    'Content-Type': 'application/json',
    'user-id': user.id, // Header customizado esperado pelo seu backend.
  };
}

/**
 * Função helper para processar as respostas das chamadas fetch.
 * @param {Response} response - A resposta da API.
 */
async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: `Erro HTTP: ${response.status}` }));
    throw new Error(errorData.message || 'Ocorreu um erro na requisição.');
  }
  // Retorna null para respostas sem conteúdo (ex: 204 No Content em DELETE).
  return response.status === 204 ? null : response.json();
}

// --- AUTH ENDPOINTS ---
export const apiLogin = (name, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, password }),
  }).then(handleResponse);
};

export const apiSignup = (name, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, password }),
  }).then(handleResponse);
};

// --- COLLECTION ENDPOINTS ---
export const getCollections = () => {
  return fetch(`${BASE_URL}/collection`, { headers: getAuthHeaders() }).then(handleResponse);
};

export const createCollection = (name) => {
  return fetch(`${BASE_URL}/collection`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ name }),
  }).then(handleResponse);
};

export const updateCollection = (idCollection, name) => {
  return fetch(`${BASE_URL}/collection/${idCollection}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ name }),
  }).then(handleResponse);
};

export const deleteCollection = (idCollection) => {
  return fetch(`${BASE_URL}/collection/${idCollection}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  }).then(handleResponse);
};

// --- ITEM ENDPOINTS ---
export const getItemsByCollection = (idCollection) => {
  return fetch(`${BASE_URL}/collection/${idCollection}/item`, {
    headers: getAuthHeaders(),
  }).then(handleResponse);
};

export const createItem = (idCollection, name) => {
  return fetch(`${BASE_URL}/collection/${idCollection}/item`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ name, check: false }),
  }).then(handleResponse);
};

export const updateItem = (idCollection, idItem, itemData) => {
  return fetch(`${BASE_URL}/collection/${idCollection}/item/${idItem}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ name: itemData.name, check: itemData.check }),
  }).then(handleResponse);
};

export const deleteItem = (idCollection, idItem) => {
  return fetch(`${BASE_URL}/collection/${idCollection}/item/${idItem}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  }).then(handleResponse);
};