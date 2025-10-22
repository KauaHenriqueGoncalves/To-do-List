/**
 * @component Input
 * @description Um componente de input estilizado com funcionalidade de toggle para senhas.
 * @param {object} props - Propriedades do componente.
 * @param {string} props.id - ID do input, para acessibilidade.
 * @param {string} props.type - Tipo do input ('text', 'password', etc.).
 * @param {string} props.value - O valor controlado do input.
 * @param {Function} props.onChange - Função para atualizar o valor.
 * @param {string} props.placeholder - Texto de placeholder do input.
 */
import { useState } from 'react';

// Ícones de olho para o toggle de senha
const EyeIcon = ({ ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
);
const EyeOffIcon = ({ ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
);

export default function Input({ id, type = "text", value, onChange, placeholder }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = type === "password";
  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <div className="relative">
      <input
        id={id}
        type={isPasswordField ? (isPasswordVisible ? "text" : "password") : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-medium text-primary placeholder-secondary"
      />
      {/* Botão de toggle que só aparece para inputs do tipo 'password' */}
      {isPasswordField && (
        <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex items-center pr-4 text-secondary hover:text-primary">
          {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      )}
    </div>
  );
}