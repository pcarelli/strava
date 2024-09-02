import React from 'react'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Layout from './components/Layout.jsx'
import { BrowserRouter, Routes, Route, } from "react-router-dom"
import { AuthProvider } from './contexts/AuthContext.jsx'
import AuthRequired from './components/AuthRequired.jsx'

export default function App(){
  return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Layout />}>

              <Route element={<AuthRequired />}>
                <Route path='dashboard' element={<Dashboard />} />
              </Route>

              <Route path='login' element={<Login />} />
              <Route path='signup' element={<Signup />} />
              
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  )
}
