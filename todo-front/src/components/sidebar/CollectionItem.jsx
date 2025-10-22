import { useState, useRef, useEffect } from 'react';
import { MoreVertical, Check, X } from 'lucide-react';

/** Hook customizado para detetar cliques fora de um elemento. */
const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
};

/**
 * @component CollectionItem
 * @description Renderiza um único item da lista de coleções, com modos de exibição
 * e edição visualmente consistentes.
 * @param {object} props
 * @param {object} props.collection - O objeto da coleção a ser exibido.
 * @param {boolean} props.isSelected - Se a coleção está atualmente selecionada.
 * @param {boolean} props.isEditing - Se a coleção está em modo de edição.
 * @param {Function} props.onClick - Função para selecionar a coleção.
 * @param {Function} props.onDelete - Função para apagar a coleção.
 * @param {Function} props.onUpdate - Função para atualizar o nome da coleção.
 * @param {Function} props.onStartEdit - Função para entrar no modo de edição.
 */
export default function CollectionItem({ collection, isSelected, isEditing, onClick, onDelete, onUpdate, onStartEdit }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState(collection.name);
  const menuRef = useRef(null);
  const inputRef = useRef(null);
  useOnClickOutside(menuRef, () => setMenuOpen(false));

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);
  
  useEffect(() => {
      setName(collection.name);
  }, [collection.name]);

  const handleUpdate = () => {
    if (name.trim() && name.trim() !== collection.name) {
      onUpdate(collection.id, name.trim());
    } else {
      setName(collection.name); 
      onUpdate(collection.id, collection.name); // Chama para sair do modo de edição
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleUpdate();
    if (e.key === 'Escape') {
      setName(collection.name);
      onUpdate(collection.id, collection.name);
    }
  };

  // --- MODO DE EDIÇÃO ---
  if (isEditing) {
    return (
      <div className="flex items-center h-12 px-3 rounded-lg bg-dark">
        <input
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleUpdate}
          className="w-full h-full bg-transparent text-primary border-none focus:outline-none focus:ring-0"
        />
        <div className="flex items-center">
          <button onClick={handleUpdate} className="text-secondary hover:text-primary ml-2 transition-colors">
            <Check size={20} />
          </button>
          <button onClick={() => { setName(collection.name); onUpdate(collection.id, collection.name); }} className="text-secondary hover:text-primary ml-1 transition-colors">
            <X size={20} />
          </button>
        </div>
      </div>
    );
  }

  // --- MODO DE EXIBIÇÃO ---
  return (
    <div className="relative group">
      <a href="#" onClick={(e) => { e.preventDefault(); onClick(); }}
        className={`flex justify-between items-center h-12 px-3 rounded-lg cursor-pointer transition-colors w-full ${isSelected ? 'bg-dark text-primary font-semibold' : 'text-secondary hover:bg-dark hover:text-primary'}`}
      >
        <span className="truncate">{collection.name}</span>
        <button onClick={(e) => { e.stopPropagation(); setMenuOpen(true); }} className="opacity-0 group-hover:opacity-100 text-secondary hover:text-primary transition-opacity">
          <MoreVertical size={20} />
        </button>
      </a>

      {isMenuOpen && (
        <div ref={menuRef} className="absolute right-0 top-full mt-1 w-32 bg-dark rounded-lg shadow-lg z-10 border border-medium">
          <button onClick={() => { onStartEdit(); setMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-primary hover:bg-soft">Editar</button>
          <button onClick={() => { onDelete(); setMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-accent hover:bg-soft">Apagar</button>
        </div>
      )}
    </div>
  );
}