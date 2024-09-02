import React from 'react'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import Layout from './components/Layout.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from './contexts/AuthContext.jsx'

export default function App(){
  return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<Signup />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  )
}
