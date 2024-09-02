import React from 'react'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Home from './pages/Home.jsx'
import Account from './pages/Account.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
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
                <Route path='account' element={<Account />} />
              </Route>

              <Route index element={<Home />} />
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<Signup />} />
              <Route path='forgot-password' element={<ForgotPassword />} />

            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  )
}
