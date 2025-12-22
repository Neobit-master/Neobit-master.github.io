import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './routes/App';
import './styles/main.scss';

const container = document.getElementById('app');
if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
