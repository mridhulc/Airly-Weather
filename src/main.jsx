import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { StateContextProvider } from './Context'
import { AuthProvider } from './Context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </AuthProvider>
  </React.StrictMode>
)
