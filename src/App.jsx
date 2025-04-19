import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RoomPage from './pages/RoomPage'
import MenuButton from './components/MenuButton'
import ToastManager from './lib/ToastManager' 
import { AuthMenuStatus } from './constants/AuthMenuStatus'


function App() {
  const [authMenu, setAuthMenu] = useState(() => {
    const storedAuthStatus = localStorage.getItem("AuthMenuStatus"); 
    return storedAuthStatus === AuthMenuStatus.AUTHENTICATED ? AuthMenuStatus.AUTHENTICATED : AuthMenuStatus.DEFAULT; 
  });

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute -z-10 inset-0 h-full w-full bg-purple-50
          bg-[radial-gradient(circle,#73737350_1px,transparent_1px)] 
          bg-[size:10px_10px]
          [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_90%,transparent_100%)]"
      />

      { AuthMenuStatus.AUTHENTICATED === authMenu && <MenuButton />}      
      <Routes>
        <Route path='/' element={<HomePage authMenu={authMenu} setAuthMenu={setAuthMenu} />} />
        <Route path='/room/:roomId' element={<RoomPage />} />
      </Routes>
      <ToastManager />  
    </div>
  )
}

export default App
