import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Authuser } from './context/authcontext.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Authuser>
    <App />
    <ToastContainer 
        position="top-right"
        autoClose={3000}
        limit={3}
        stacked
        draggable
        pauseOnHover
        theme="colored"
    />
    </Authuser>
    </BrowserRouter>
  </StrictMode>
)
