import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'

// ! ->  Assertion not null -> ayuda para que ts no piense que va a ser null y se quite el error
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
