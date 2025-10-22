import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from '../routes/ProtectedRoute';

/**
 * @file src/routes/routes.jsx
 * @description Define a estrutura de rotas da aplicação. Mapeia cada URL a um componente
 * específico e aplica a lógica de proteção de rotas quando necessário.
 */
const routes = [
  // Rotas públicas, acessíveis a todos os usuários.
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  
  // Rota protegida para o dashboard.
  {
    path: '/dashboard',
    element: (
      // O componente Dashboard só será renderizado se o `ProtectedRoute` permitir,
      // ou seja, se o usuário estiver autenticado.
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },

  // Rota raiz, que redireciona para o login por padrão.
  {
    path: '/',
    element: <Login />,
  },
];

export default routes;