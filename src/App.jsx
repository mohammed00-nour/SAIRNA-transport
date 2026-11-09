import { Routes, Route } from 'react-router-dom'
import './App.css'
import { useThemeLight } from './stores/themeLight'
import { useEffect } from 'react'

import { ProtectedRoute } from './features/auth/components/ProtectedRoute'

//impoer for pages
import Home from './pages/Home'
import MainLayout from './layouts/MainLayout'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const themeLight = useThemeLight((state) => (state.themeLight))

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", themeLight === "dark")
    root.style.colorScheme = themeLight;
  }, [themeLight]);


  return (
    <main dir='rtl' className='bg-[var(--bg)] text-[var(--text)] min-h-screen w-full'>

      <Routes>

        <Route path='/' element={<MainLayout />} >
          <Route index element={<Home />} />
          <Route path='/profile' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} /> 
        </Route>

      </Routes>
    </main>
  )
}

export default App
