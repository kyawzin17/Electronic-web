import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ThemeApp from './ThemeApp.js'
import '@wokwi/elements';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <ThemeApp />
  </StrictMode>,
)
