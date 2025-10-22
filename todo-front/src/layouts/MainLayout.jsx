import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import CollectionList from '../components/sidebar/CollectionList';
import UserSettings from '../components/sidebar/UserSettings';

/**
 * @component MainLayout
 * @description Estrutura principal da aplicação autenticada, que organiza a sidebar e a área de conteúdo.
 * @param {object} props
 * @param {React.ReactNode} props.children - O conteúdo da página a ser renderizado.
 * @param {Function} props.onOpenDeleteModal - Função para notificar o Dashboard que o modal de exclusão de conta deve ser aberto.
 * @param {object} ...rest - Outras props relacionadas à gestão de coleções.
 */
export default function MainLayout({ 
  children,
  collections,
  selectedCollection,
  editingCollectionId,
  onSelectCollection,
  onDeleteCollection,
  onUpdateCollection,
  onAddNewCollection,
  onStartEditCollection,
  onOpenDeleteModal,
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Efeito para controlar o scroll da página quando a sidebar mobile está aberta.
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isSidebarOpen]);

  /**
   * Lida com a seleção de uma coleção e fecha a sidebar (em ecrãs mobile).
   * @param {number} collectionId - O ID da coleção selecionada.
   */
  const handleSelectAndCloseSidebar = (collectionId) => {
    onSelectCollection(collectionId);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-dark text-primary">
      {/* Overlay para o fundo em modo mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 w-sidebar-width bg-soft flex flex-col p-4 z-30
                    transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:relative lg:translate-x-0 lg:z-auto`}
      >
        <UserSettings onOpenDeleteModal={onOpenDeleteModal} />
        <CollectionList
          collections={collections}
          selectedCollectionId={selectedCollection?.id}
          editingCollectionId={editingCollectionId}
          onSelect={handleSelectAndCloseSidebar}
          onDelete={onDeleteCollection}
          onUpdate={onUpdateCollection}
          onAdd={onAddNewCollection}
          onStartEdit={onStartEditCollection}
        />
      </aside>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header para ecrãs mobile */}
        <header className="flex items-center justify-between p-4 border-b border-medium lg:hidden">
          <h2 className="text-xl font-bold truncate">{selectedCollection ? selectedCollection.name : "Coleções"}</h2>
          <button onClick={() => setSidebarOpen(true)} className="p-2">
            <Menu size={24} />
          </button>
        </header>

        {/* Área de renderização do conteúdo da página */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 lg:pt-20">
          {children}
        </main>
      </div>
    </div>
  );
}