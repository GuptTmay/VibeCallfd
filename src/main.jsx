import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { UserProvider } from './lib/UserProvider.jsx'
import { RoomIdProvider } from './lib/RoomIdProvider.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider> 
      <RoomIdProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RoomIdProvider>
    </UserProvider>
  </StrictMode>
)