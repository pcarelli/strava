import React from "react"
import { Outlet, Link, NavLink } from "react-router-dom"

export default function DashboardLayout(){

    const activeStyles = {
        textDecoration: "underline",
        fontWeight: "600",
        color: "#446461"
    }

    return (
        <>  
            <h1>Dashboard</h1>
            <nav className="dashboard-nav">
                <NavLink className="dash-link" to="/dashboard/strava-data" style={({isActive}) => isActive ? activeStyles: null}>Strava Data</NavLink>
                <NavLink className="dash-link" to="/dashboard/fragments" style={({isActive}) => isActive ? activeStyles: null}>Fragments</NavLink>
            </nav>
            <Outlet />
        </>
    )
}