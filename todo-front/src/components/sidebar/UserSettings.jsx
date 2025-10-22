import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Settings, Edit, Lock, LogOut, Trash2 } from 'lucide-react';

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
 * @component UserSettings
 * @description Exibe as informações do usuário e um menu de ações como Logout e Apagar Conta.
 * @param {object} props
 * @param {Function} props.onOpenDeleteModal - Função para informar ao Dashboard que o modal de exclusão de conta deve ser aberto.
 */
export default function UserSettings({ onOpenDeleteModal }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  useOnClickOutside(menuRef, () => setMenuOpen(false));

  /**
   * Executa o logout e redireciona para a página de login.
   */
  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate('/login', { replace: true });
  };

  /**
   * Fecha o menu de configurações e chama a função para abrir o modal de confirmação de exclusão.
   */
  const handleOpenDeleteModal = () => {
    setMenuOpen(false);
    onOpenDeleteModal();
  };

  return (
    <div className="relative mb-6" ref={menuRef}>
      <div className="bg-dark p-3 rounded-lg flex items-center justify-between">
        <div className="flex items-center min-w-0">
          <div className="w-10 h-10 bg-accent rounded-full mr-3 flex-shrink-0 flex items-center justify-center font-bold text-xl">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <span className="font-semibold text-lg truncate">{user?.name || 'Usuário'}</span>
        </div>
        <button onClick={() => setMenuOpen(prev => !prev)} className="p-2 rounded-md hover:bg-medium transition-colors">
          <Settings size={20} className="text-secondary" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full mt-2 w-full bg-dark rounded-lg shadow-lg z-20 border border-medium py-2">
          {/* Botões desabilitados com tooltip, pois a funcionalidade não está implementada no back-end. */}
          <button disabled title="Funcionalidade indisponível" className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-500 cursor-not-allowed">
            <Edit size={16} className="mr-3" /> Editar Nome
          </button>
          <button disabled title="Funcionalidade indisponível" className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-500 cursor-not-allowed">
            <Lock size={16} className="mr-3" /> Trocar Senha
          </button>
          <hr className="border-medium my-1" />
          <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-accent hover:bg-soft transition-colors">
            <LogOut size={16} className="mr-3" /> Sair (Logout)
          </button>
          <button onClick={handleOpenDeleteModal} className="w-full text-left flex items-center px-4 py-2 text-sm text-accent hover:bg-soft transition-colors">
            <Trash2 size={16} className="mr-3" /> Apagar Conta
          </button>
        </div>
      )}
    </div>
  );
}