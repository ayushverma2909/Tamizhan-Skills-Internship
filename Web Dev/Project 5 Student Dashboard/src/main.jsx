import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StudentProvider } from './components/StudentContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StudentProvider>
      <App />
    </StudentProvider>
  </StrictMode>,
)
