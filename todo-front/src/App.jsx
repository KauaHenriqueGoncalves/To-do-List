import { RouterProvider } from 'react-router-dom';
import router from './routes';

/**
 * @component App
 * @description Componente raiz da aplicação. Sua única função é fornecer o roteador
 * configurado para o `RouterProvider`, que irá gerenciar toda a navegação do site
 * com base nas rotas definidas.
 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;