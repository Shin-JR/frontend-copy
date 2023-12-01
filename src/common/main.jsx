import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import Routing from './Routing'
import AuthProvider from '../components/auth/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Routing/>
    </AuthProvider>
  </React.StrictMode>,
)
