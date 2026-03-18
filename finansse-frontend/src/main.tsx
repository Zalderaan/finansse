import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// debug
const origRemoveItem = localStorage.removeItem.bind(localStorage);
localStorage.removeItem = (key: string) => {
  if (key === 'auth-storage') {
    console.warn('[AUTH DEBUG] localStorage.removeItem(auth-storage)');
    console.trace('[AUTH DEBUG] removeItem stack');
  }
  return origRemoveItem(key);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
