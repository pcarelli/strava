import React from "react"
import { Outlet, Link, NavLink } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

export default function DashboardLayout(){

    return (
        <>  
            <h1>Dashboard</h1>
            <nav className="dashboard-nav">
                <NavLink></NavLink>
            </nav>
            <Outlet />
        </>
    )
}