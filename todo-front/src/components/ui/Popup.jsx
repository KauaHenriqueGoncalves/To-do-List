import { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

/**
 * @component Popup
 * @description Um popup para exibir mensagens de sucesso ou erro, que pode desaparecer automaticamente.
 * @param {object} props
 * @param {string} props.message - A mensagem a ser exibida.
 * @param {'success' | 'error'} props.type - O tipo de popup, que define o estilo.
 * @param {Function} props.onClose - Função para fechar o popup.
 * @param {number} [props.duration=3000] - Duração em milissegundos para o popup de sucesso desaparecer.
 */
export default function Popup({ message, type, onClose, duration = 3000 }) {
  useEffect(() => {
    if (type === 'success' && message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [type, duration, onClose, message]);

  if (!message) return null;

  const isSuccess = type === 'success';
  const baseStyles = 'fixed top-5 right-5 z-50 flex items-center p-4 rounded-lg shadow-lg text-white max-w-sm animate-fade-in-down';
  const typeStyles = isSuccess ? 'bg-green-600' : 'bg-red-600';
  const Icon = isSuccess ? CheckCircle : XCircle;

  return (
    <div className={`${baseStyles} ${typeStyles}`}>
      <Icon size={24} className="mr-3 flex-shrink-0" />
      <p className="flex-1 text-sm font-medium">{message}</p>
      {!isSuccess && (
        <button onClick={onClose} className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors">
          <X size={20} />
        </button>
      )}
    </div>
  );
}