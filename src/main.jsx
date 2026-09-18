import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { AuthProvider } from './components/context/AuthContext.jsx'
import { GamarGoProvider } from './context/GamarGoContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <GamarGoProvider>
        <App />
      </GamarGoProvider>
    </AuthProvider>
  </StrictMode>
)
