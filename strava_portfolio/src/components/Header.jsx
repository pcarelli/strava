import React from "react"
import { Link, NavLink } from "react-router-dom"

export default function Header(props){
    return (
        <header className="header">
            <Link to="/" className="h3">Frag|ment</Link>
            <div className="pages">
                <NavLink to="/" className="link">Home</NavLink>
                <NavLink to="login" className="link">Login</NavLink>
            </div>
        </header>
    )
}