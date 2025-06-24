import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SplashCursor from './components/Cursor'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SplashCursor/>
       <App />

   
  </StrictMode>,
)
