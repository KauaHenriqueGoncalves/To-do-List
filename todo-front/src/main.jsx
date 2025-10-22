import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

/**
 * @file src/main.jsx
 * @description Ponto de entrada da aplicação. Este arquivo é responsável por
 * renderizar o componente raiz <App /> no elemento com ID 'root' do DOM.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode é uma ferramenta do React que ajuda a identificar potenciais problemas na aplicação
  // durante o desenvolvimento, como efeitos colaterais inesperados.
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);