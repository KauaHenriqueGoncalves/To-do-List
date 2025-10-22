
/**
 * @component TodoList
 * @description Exibe a lista de itens de uma coleção e o painel de estatísticas,
 * com uma coluna de estatísticas mais estreita.
 */
import { useState } from 'react';
import TodoItem from './TodoItem';
import Button from '../ui/Button';

export default function TodoList({ 
  items = [], 
  onAddItem, 
  onUpdateItem, 
  onToggleItem, 
  onDeleteItem 
}) {
  const [editingId, setEditingId] = useState(null);
  const [itemBeforeEdit, setItemBeforeEdit] = useState(null);

  const handleStartEdit = (id) => {
    const itemToEdit = items.find(item => item.id === id);
    if (itemToEdit) {
      setItemBeforeEdit({ ...itemToEdit });
      setEditingId(id);
    }
  };

  const handleAddNewItemClick = () => {
    const isAlreadyEditing = items.some(item => item.id === editingId) || editingId === 'new-item';
    if (isAlreadyEditing) return;

    const newItem = { id: 'new-item', name: '', check: false };
    setItemBeforeEdit(newItem);
    setEditingId(newItem.id);
  };

  const handleConfirmEdit = (id, newName) => {
    if (id === 'new-item') {
      if (newName.trim()) {
        onAddItem(newName);
      }
    } else {
      if (itemBeforeEdit && itemBeforeEdit.name !== newName && newName.trim()) {
        onUpdateItem(id, newName);
      }
    }
    setEditingId(null);
    setItemBeforeEdit(null);
  };
  
  const handleCancelEdit = () => {
    setEditingId(null);
    setItemBeforeEdit(null);
  };
  
  const totalItems = items.length;
  const doneItems = items.filter((item) => item.check).length;
  const todoItems = totalItems - doneItems;
  const percentDone = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;

  return (
    // --- CORREÇÃO APLICADA AQUI ---
    // A grade foi alterada de 'lg:grid-cols-3' para 'lg:grid-cols-4'.
    // A lista de tarefas agora ocupa 3 colunas ('lg:col-span-3') em vez de 2.
    // Isso deixa a coluna de estatísticas com apenas 1/4 da largura em telas grandes.
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Coluna da lista de itens */}
      <div className="lg:col-span-3">
        <div className="space-y-3 max-h-[65vh] overflow-y-auto pr-2">
          {items.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              isEditing={item.id === editingId}
              onToggleItem={onToggleItem}
              onDeleteItem={onDeleteItem}
              onStartEdit={handleStartEdit}
              onConfirmEdit={handleConfirmEdit}
              onCancelEdit={handleCancelEdit}
            />
          ))}
          {editingId === 'new-item' && (
             <TodoItem
              item={itemBeforeEdit}
              isEditing={true}
              onConfirmEdit={handleConfirmEdit}
              onCancelEdit={handleCancelEdit}
            />
          )}
        </div>
        <div className="mt-3">
          <Button variant="secondary" onClick={handleAddNewItemClick} className="w-full !font-normal !text-secondary hover:!text-primary">
            New Item +
          </Button>
        </div>
      </div>
      {/* Coluna de estatísticas */}
      <div className="bg-soft p-6 rounded-xl self-start">
        <h3 className="text-lg font-bold mb-4">Estatísticas</h3>
        <div className="grid grid-cols-3 gap-4 text-center mb-6">
          <div><div className="text-3xl font-bold text-primary">{todoItems}</div><div className="text-sm text-secondary">To Do</div></div>
          <div><div className="text-3xl font-bold text-primary">{doneItems}</div><div className="text-sm text-secondary">Done</div></div>
          <div><div className="text-3xl font-bold text-primary">{percentDone}%</div><div className="text-sm text-secondary">Done</div></div>
        </div>
        <div className="text-center text-xl font-bold text-secondary"><span className="text-primary">{doneItems}</span>/{totalItems}</div>
      </div>
    </div>
  );
}