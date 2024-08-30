import React from "react"
import { Link, NavLink } from "react-router-dom"

export default function Header(){
    const activeStyles = {
        textDecoration: "underline",
        fontWeight: "500",
        color: "#E9D7C3"
    }

    return (
        <header className="header">
            <Link to="/" className="h3">Frag|ment</Link>
            <div className="pages">
                <NavLink to="/" className="link" style={({isActive}) => isActive ? activeStyles: null}>Home</NavLink>
                <NavLink to="login" className="link" style={({isActive}) => isActive ? activeStyles: null}>Login</NavLink>
            </div>
        </header>
    )
}