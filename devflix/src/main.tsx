import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('El elemento raíz no se encontró.');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
