import { X } from 'lucide-react';
import Button from './Button';

/**
 * @component Modal
 * @description Um componente de modal genérico e reutilizável para confirmações ou alertas.
 * @param {object} props
 * @param {boolean} props.isOpen - Controla a visibilidade do modal.
 * @param {Function} props.onClose - Função para fechar o modal.
 * @param {Function} props.onConfirm - Função a ser executada ao confirmar.
 * @param {string} props.title - O título do modal.
 * @param {React.ReactNode} props.children - O conteúdo/mensagem do modal.
 * @param {string} [props.confirmText='Sim, tenho certeza'] - Texto para o botão de confirmação.
 * @param {string} [props.cancelText='Cancelar'] - Texto para o botão de cancelamento.
 */
export default function Modal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  children,
  confirmText = 'Sim, tenho certeza',
  cancelText = 'Cancelar' 
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-soft p-6 rounded-xl shadow-lg w-full max-w-md border border-medium animate-fade-in-down"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-primary">{title}</h2>
          <button onClick={onClose} className="p-1 rounded-full text-secondary hover:text-primary hover:bg-medium">
            <X size={24} />
          </button>
        </div>

        <div className="text-secondary mb-6">
          {children}
        </div>
        
        <div className="flex justify-center gap-4">
          <Button variant="secondary" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}