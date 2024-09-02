import React from "react"
import { Link, NavLink } from "react-router-dom"
import {useAuth} from '../contexts/AuthContext'

export default function Header(){
    const activeStyles = {
        textDecoration: "underline",
        fontWeight: "500",
        color: "#E9D7C3"
    }

    const {currentUser} = useAuth()

    return (
        <header className="header">
            <Link to="/" className="h3">Frag|ment</Link>
            <div className="pages">
                <NavLink to={currentUser ? "dashboard" : "/"} className="link" style={({isActive}) => isActive ? activeStyles: null}>Home</NavLink>
                <NavLink to={currentUser ? "account" : "login"} className="link" style={({isActive}) => isActive ? activeStyles: null}>{currentUser ? "Account" : "Login"}</NavLink>
            </div>
        </header>
    )
}