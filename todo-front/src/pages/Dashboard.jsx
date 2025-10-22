import { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import TodoList from "../components/todo/TodoList";
import Modal from "../components/ui/Modal";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * @page Dashboard
 * @description A página principal para usuários autenticados. Atua como o componente "cérebro" da aplicação,
 * gerenciando todo o estado de dados (coleções e itens) e a exibição de modais, orquestrando a
 * interação com a API.
 */
export default function Dashboard() {
  const { logout, deleteUser } = useAuth();
  const navigate = useNavigate();
  
  // Estados para controlar os modais de confirmação
  const [isDeleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);
  const [isDeleteCollectionModalOpen, setDeleteCollectionModalOpen] = useState(false);
  const [collectionToDeleteId, setCollectionToDeleteId] = useState(null);

  // Estados de dados da aplicação
  const [collections, setCollections] = useState([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [editingCollectionId, setEditingCollectionId] = useState(null);
  const [items, setItems] = useState([]);

  // --- Funções de busca de dados (API Calls) ---
  const fetchCollections = async () => {
    const token = localStorage.getItem('user-token');
    try {
      const response = await fetch(`${API_URL}/collection`, { headers: { 'user-id': token } });
      const data = await response.json();
      setCollections(data);
      if (data.length > 0 && !selectedCollectionId) {
        setSelectedCollectionId(data[0].id);
      }
    } catch (error) {
      console.error("Erro ao buscar coleções:", error);
    }
  };
  
  const fetchItems = async (collectionId) => {
    if (!collectionId) {
        setItems([]);
        return;
    };
    const token = localStorage.getItem('user-token');
    try {
        const response = await fetch(`${API_URL}/collection/${collectionId}/item`, { headers: { 'user-id': token } });
        const data = await response.json();
        setItems(data);
    } catch (error) {
        console.error("Erro ao buscar itens:", error);
        setItems([]);
    }
  };

  // --- Efeitos para carregar dados ---
  useEffect(() => {
    const token = localStorage.getItem('user-token');
    if (token) {
      fetchCollections();
    }
  }, []);
  
  useEffect(() => {
    if (selectedCollectionId) {
        fetchItems(selectedCollectionId);
    }
  }, [selectedCollectionId]);

  // --- Funções de manipulação de Itens ---
  const handleAddItem = async (newItemName) => {
    const token = localStorage.getItem('user-token');
    try {
      await fetch(`${API_URL}/collection/${selectedCollectionId}/item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'user-id': token },
        body: JSON.stringify({ name: newItemName, check: false }),
      });
      fetchItems(selectedCollectionId);
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
    }
  };

  const handleUpdateItem = async (itemId, newName) => {
    const token = localStorage.getItem('user-token');
    const item = items.find(i => i.id === itemId);
    try {
      await fetch(`${API_URL}/collection/${selectedCollectionId}/item/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'user-id': token },
        body: JSON.stringify({ name: newName, check: item.check }),
      });
      fetchItems(selectedCollectionId);
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
    }
  };
  
  const handleToggleItem = async (itemId) => {
    const token = localStorage.getItem('user-token');
    const item = items.find(i => i.id === itemId);
    try {
      await fetch(`${API_URL}/collection/${selectedCollectionId}/item/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'user-id': token },
        body: JSON.stringify({ name: item.name, check: !item.check }),
      });
      fetchItems(selectedCollectionId);
    } catch (error) {
      console.error("Erro ao alternar item:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    const token = localStorage.getItem('user-token');
    try {
      await fetch(`${API_URL}/collection/${selectedCollectionId}/item/${itemId}`, {
        method: 'DELETE',
        headers: { 'user-id': token },
      });
      fetchItems(selectedCollectionId);
    } catch (error) {
      console.error("Erro ao apagar item:", error);
    }
  };
  
  // --- Funções de manipulação de Coleções ---
  const handleAddNewCollection = async (collectionName) => {
    const token = localStorage.getItem('user-token');
    try {
      await fetch(`${API_URL}/collection`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'user-id': token },
        body: JSON.stringify({ name: collectionName }),
      });
      await fetchCollections();
    } catch (error) {
      console.error("Erro ao adicionar coleção:", error);
    }
  };
  
  const handleStartEditCollection = (collectionId) => {
    setEditingCollectionId(collectionId);
  };
  
  const handleUpdateCollection = async (collectionId, newName) => {
     const token = localStorage.getItem('user-token');
     try {
       await fetch(`${API_URL}/collection/${collectionId}`, {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json', 'user-id': token },
         body: JSON.stringify({ name: newName }),
       });
       setEditingCollectionId(null);
       fetchCollections();
     } catch (error) {
       console.error("Erro ao atualizar coleção:", error);
    }
  };

  const handleDeleteCollection = (collectionId) => {
    setCollectionToDeleteId(collectionId);
    setDeleteCollectionModalOpen(true);
  };
  
  const confirmDeleteCollection = async () => {
    if (!collectionToDeleteId) return;

    const token = localStorage.getItem('user-token');
    try {
      await fetch(`${API_URL}/collection/${collectionToDeleteId}`, {
        method: 'DELETE',
        headers: { 'user-id': token },
      });

      const newCollections = collections.filter(c => c.id !== collectionToDeleteId);
      setCollections(newCollections);
      
      if (selectedCollectionId === collectionToDeleteId) {
        setSelectedCollectionId(newCollections[0]?.id || null);
      }
    } catch (error) {
      console.error("Erro ao apagar coleção:", error);
    } finally {
      setDeleteCollectionModalOpen(false);
      setCollectionToDeleteId(null);
    }
  };

  // --- Funções de manipulação de Conta ---
  const handleDeleteAccount = async () => {
    const result = await deleteUser();
    if (result.success) {
      setDeleteAccountModalOpen(false);
      logout();
      navigate('/login', { replace: true });
    } else {
      console.error("Falha ao apagar a conta");
      setDeleteAccountModalOpen(false);
    }
  };

  const selectedCollection = collections.find(c => c.id === selectedCollectionId);

  return (
    <>
      <MainLayout
        collections={collections}
        selectedCollection={selectedCollection}
        editingCollectionId={editingCollectionId}
        onSelectCollection={setSelectedCollectionId}
        onDeleteCollection={handleDeleteCollection}
        onUpdateCollection={handleUpdateCollection}
        onAddNewCollection={handleAddNewCollection}
        onStartEditCollection={handleStartEditCollection}
        onOpenDeleteModal={() => setDeleteAccountModalOpen(true)}
      >
        {collections.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center bg-soft p-8 rounded-xl max-w-md">
              <PlusCircle className="mx-auto h-8 w-8 text-secondary mb-4"/>
              <h2 className="text-xl font-bold text-primary mb-2">
                Nenhuma coleção encontrada
              </h2>
              <p className="text-secondary">
                Você ainda não tem nenhuma coleção. Adicione uma agora mesmo para começar a organizar suas tarefas.
              </p>
            </div>
          </div>
        ) : selectedCollection ? (
          <>
            <header className="hidden lg:flex justify-between items-center mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold">{selectedCollection.name}</h1>
            </header>
            <TodoList 
              items={items} 
              onAddItem={handleAddItem}
              onUpdateItem={handleUpdateItem}
              onToggleItem={handleToggleItem}
              onDeleteItem={handleDeleteItem}
            />
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-secondary text-lg">Selecione uma coleção para começar.</p>
          </div>
        )}
      </MainLayout>

      <Modal
        isOpen={isDeleteAccountModalOpen}
        onClose={() => setDeleteAccountModalOpen(false)}
        onConfirm={handleDeleteAccount}
        title="Apagar Conta Permanentemente"
        cancelText="Manter minha conta"
        confirmText="Sim, apagar conta"
      >
        <p>Essa ação não poderá ser desfeita.</p>
        <p className="font-bold mt-2">Você tem certeza de que deseja apagar a sua conta e todas as suas coleções?</p>
      </Modal>

      <Modal
        isOpen={isDeleteCollectionModalOpen}
        onClose={() => setDeleteCollectionModalOpen(false)}
        onConfirm={confirmDeleteCollection}
        title="Apagar Coleção"
        cancelText="Cancelar"
        confirmText="Sim, apagar"
      >
        <p>Você tem certeza de que deseja apagar esta coleção e todos os itens contidos nela?</p>
        <p className="font-bold mt-2">Essa ação não poderá ser desfeita.</p>
      </Modal>
    </>
  );
}