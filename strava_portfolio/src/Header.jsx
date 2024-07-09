import React from "react"

export default function Header(props){
    return (
        <header className="header">
            <h1>Strava Activities</h1>
            <h3>Last {props.activityCount} activities</h3>
        </header>
    )
}