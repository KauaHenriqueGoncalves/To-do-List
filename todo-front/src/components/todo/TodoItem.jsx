
/**
 * @component TodoItem
 * @description Renderiza um único item da lista de tarefas, com altura fixa e estilo de checkbox corrigido para o estado hover.
 */
import { useEffect, useRef, useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import Button from '../ui/Button';

export default function TodoItem({ 
  item, 
  isEditing, 
  onToggleItem,
  onDeleteItem,
  onStartEdit,
  onConfirmEdit,
  onCancelEdit,
}) {
  const [currentName, setCurrentName] = useState(item.name);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      setCurrentName(item.name);
      inputRef.current?.focus();
    }
  }, [isEditing, item.name]);

  const handleConfirm = () => {
    onConfirmEdit(item.id, currentName);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleConfirm();
    if (e.key === 'Escape') onCancelEdit();
  };
  
  if (isEditing) {
    return (
      <div className="flex items-center justify-between gap-4 p-4 bg-soft rounded-lg h-[50px]">
        <input
          ref={inputRef}
          type="text"
          value={currentName}
          onChange={(e) => setCurrentName(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 w-full bg-transparent text-primary border-none focus:outline-none focus:ring-0"
          placeholder="Digite o nome da tarefa..."
        />
        <div className="flex items-center space-x-2">
          <Button onClick={handleConfirm} className="!py-1 !px-3 !text-sm">
            {item.id === 'new-item' ? 'Add' : 'Save'}
          </Button>
          <Button onClick={onCancelEdit} variant="secondary" className="!py-1 !px-3 !text-sm">
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex items-center justify-between p-4 bg-soft rounded-lg transition-colors hover:bg-medium h-[50px]">
      <div className="flex items-center flex-1 min-w-0">
        <input
          type="checkbox"
          checked={item.check}
          onChange={() => onToggleItem(item.id)}
          className="h-5 w-5 rounded border-medium bg-dark text-accent focus:ring-accent focus:ring-offset-soft"
        />
        <span className={`ml-4 flex-1 truncate ${item.check ? 'line-through text-secondary' : 'text-primary'}`}>
          {item.name}
        </span>
      </div>
      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onStartEdit(item.id)} className="text-secondary hover:text-primary">
          <Edit size={18}/>
        </button>
        <button onClick={() => onDeleteItem(item.id)} className="text-secondary hover:text-primary">
          <Trash2 size={18}/>
        </button>
      </div>
    </div>
  );
}