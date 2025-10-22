import { useState, useRef, useEffect } from 'react';
import CollectionItem from './CollectionItem';
import Button from '../ui/Button';
import { Check, X } from 'lucide-react';

/**
 * @component CollectionList
 * @description Renderiza a lista de coleções e gerencia a UI para adicionar novas
 * coleções com um estilo visual consistente ao da edição.
 * @param {object} props - Propriedades para gerir as coleções.
 */
export default function CollectionList({ 
  onAdd, 
  onSelect, 
  collections, 
  selectedCollectionId, 
  editingCollectionId, 
  onDelete, 
  onUpdate, 
  onStartEdit 
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const addInputRef = useRef(null);

  // Foca no input assim que ele é renderizado.
  useEffect(() => {
    if (isAdding) {
      addInputRef.current?.focus();
    }
  }, [isAdding]);

  const handleShowInput = () => setIsAdding(true);
  
  const handleCancelAdd = () => {
    setIsAdding(false);
    setNewCollectionName("");
  };

  const handleConfirmAdd = () => {
    if (newCollectionName.trim()) {
      onAdd(newCollectionName.trim());
    }
    handleCancelAdd();
  };

  /** Manipula os eventos de teclado para o input de nova coleção. */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleConfirmAdd();
    if (e.key === 'Escape') handleCancelAdd();
  };

  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-lg font-bold px-4 mb-2">My Collections</h2>
      <nav className="flex-1 space-y-1 overflow-y-auto px-2">
        {collections?.map((collection) => (
          <CollectionItem
            key={collection.id}
            collection={collection}
            isSelected={collection.id === selectedCollectionId}
            isEditing={collection.id === editingCollectionId}
            onClick={() => onSelect(collection.id)}
            onDelete={() => onDelete(collection.id)}
            onUpdate={onUpdate}
            onStartEdit={() => onStartEdit(collection.id)}
          />
        ))}
        
        {/* Campo de input para adicionar nova coleção, com estilo idêntico ao de edição */}
        {isAdding && (
          <div className="flex items-center h-12 px-3 rounded-lg bg-dark">
            <input
              ref={addInputRef}
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleConfirmAdd} 
              placeholder="Nome da coleção..."
              className="w-full h-full bg-transparent text-primary border-none focus:outline-none focus:ring-0"
            />
            <div className="flex items-center">
              <button onClick={handleConfirmAdd} className="text-secondary hover:text-primary ml-2 transition-colors">
                <Check size={20} />
              </button>
              <button onClick={handleCancelAdd} className="text-secondary hover:text-primary ml-1 transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>
        )}
      </nav>
      
      {/* Botão para iniciar o modo de adição */}
      {!isAdding && (
        <div className="mt-auto p-2">
          <Button onClick={handleShowInput} className="w-full">
            + Nova Coleção
          </Button>
        </div>
      )}
    </div>
  );
}