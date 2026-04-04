import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import router from './routes/index.tsx';
import { store } from './store/index.ts';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
        {/* <BrowserRouter>
          <App />
        </BrowserRouter> */}
      </Provider>
    </StrictMode>,
  );
} else {
  console.error('El contenedor de destino «root» no aparece en el DOM.');
}
