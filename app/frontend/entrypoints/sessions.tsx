import React from 'react'
import ReactDOM from 'react-dom/client'
import '@app/global.scss'
import SessionApp from '@app/sessions/app'

ReactDOM.createRoot(document.body).render(
  <React.StrictMode>
    <SessionApp />
  </React.StrictMode>
)
