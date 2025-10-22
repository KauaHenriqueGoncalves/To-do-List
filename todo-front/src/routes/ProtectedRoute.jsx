import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * @component ProtectedRoute
 * @description Um componente de alta ordem (HOC) que protege uma rota.
 * Se o usuário não estiver autenticado, ele redireciona para a página de login.
 * Caso contrário, renderiza os componentes filhos.
 * @param {object} props
 * @param {React.ReactNode} props.children - O componente/página a ser renderizado se o usuário estiver autenticado.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // Enquanto a autenticação está a ser verificada, exibe uma tela de carregamento.
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-dark text-primary">Carregando...</div>;
  }

  // Se a verificação terminou e o usuário não está autenticado, redireciona para o login.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se o usuário está autenticado, renderiza o conteúdo da rota protegida.
  return children;
}