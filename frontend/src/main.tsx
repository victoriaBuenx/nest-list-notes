import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './global.css';
import { ToastProvider } from "@heroui/react";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider />
    <App />
  </StrictMode>,
)
