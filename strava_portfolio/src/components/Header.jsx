import React from "react"
import { Link, NavLink } from "react-router-dom"
import {useAuth} from '../contexts/AuthContext'

export default function Header(){
    const [error, setError] = React.useState("")

    const activeStyles = {
        textDecoration: "underline",
        fontWeight: "500",
        color: "#E9D7C3"
    }

    const {currentUser, logout} = useAuth()

    async function handleLogout(){
        setError('')
    
        try {
          await logout()
          navigate('/')
        } catch {
          setError('Failed to log out')
        }
      }

    return (
        <header className="header">
            <Link to="/" className="h3">Frag|ment</Link>
            <div className="pages">
                <NavLink to={currentUser ? "dashboard" : "/"} className="link" style={({isActive}) => isActive ? activeStyles: null}>{currentUser ? "Dashboard" : "Home"}</NavLink>
                <NavLink to={currentUser ? "account" : "login"} className="link" style={({isActive}) => isActive ? activeStyles: null}>{currentUser ? "Account" : "Login"}</NavLink>
                <NavLink onClick={currentUser ? handleLogout : null} to={!currentUser ? "signup" : null} className="link" style={currentUser ? null : ({isActive}) => isActive ? activeStyles : null}>{currentUser ? "Log Out" : "Sign Up"}</NavLink>
            </div>
        </header>
    )
}