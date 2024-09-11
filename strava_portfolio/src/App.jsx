import React from 'react'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Activities from './pages/Activities.jsx'
import ActivityDetails from './pages/ActivityDetails.jsx'
import Home from './pages/Home.jsx'
import Account from './pages/Account.jsx'
import Fragments from './pages/Fragments.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import Layout from './components/Layout.jsx'
import DashboardLayout from './components/DashboardLayout.jsx'
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
                <Route path='dashboard' element={<DashboardLayout />}>
                  <Route path='activities' element={<Activities />} />
                  <Route path ="activities/:id" element={<ActivityDetails />}/>
                  <Route path='fragments' element={<Fragments />} />
                </Route>
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
