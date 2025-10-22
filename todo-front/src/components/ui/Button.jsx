/**
 * @component Button
 * @description Um componente de botão genérico com variantes de estilo.
 * @param {object} props - Propriedades do componente.
 * @param {React.ReactNode} props.children - O conteúdo do botão (texto, ícone, etc.).
 * @param {Function} props.onClick - Função a ser executada no clique.
 * @param {string} props.variant - Variante de estilo ('primary', 'secondary', 'danger', 'text').
 * @param {string} props.type - O tipo do botão HTML ('button', 'submit').
 * @param {string} props.className - Classes CSS adicionais para customização.
 */
export default function Button({ children, onClick, variant = 'primary', type = 'button', className = '' }) {
  // Estilos base, aplicados a todas as variantes.
  const baseStyles = "px-4 py-3 rounded-lg font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark focus:ring-accent";
  
  // Mapeamento de variantes para classes do Tailwind.
  const variants = {
    primary: "bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/20",
    secondary: "bg-medium text-secondary hover:bg-opacity-80",
    danger: "bg-red-600 text-white hover:bg-red-700",
    text: "text-primary hover:bg-soft px-3 py-1",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}