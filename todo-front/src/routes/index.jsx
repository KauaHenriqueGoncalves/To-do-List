import { createBrowserRouter } from 'react-router-dom';
import routes from './routes.jsx';

/**
 * @file src/routes/index.jsx
 * @description Ponto de entrada da configuração de roteamento.
 * Cria a instância do roteador usando a definição de rotas e a exporta
 * para ser usada pelo componente <App />.
 */
const router = createBrowserRouter(routes);

export default router;