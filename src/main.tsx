import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ThemeApp from './ThemeApp.js'
import 'katex/dist/katex.min.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react'; // React / Vite analytics

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Toaster position="top-center" reverseOrder={false} />
      <Analytics />
      <ThemeApp />
    </GoogleOAuthProvider>
  </StrictMode>,
)
