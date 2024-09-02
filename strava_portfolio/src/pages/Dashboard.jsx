import React from "react"
import { Link, NavLink, useParams, useNavigate } from "react-router-dom"
import {useAuth} from '../contexts/AuthContext'

export default function Dashboard(){
    const [stravaData, setStravaData] = React.useState([])
    const [error, setError] = React.useState("")
    const {currentUser, logout} = useAuth()
    const navigate = useNavigate()

    const clientID = "94243"
    const clientSecret = "813838c6d34960ef53e23a5eb88b6c03b49883ce"
    const refreshToken = "0884d1b71a828ff826ceed04cb4aceef23aae9f8"

    async function handleLogout(){
      setError('')

      try {
        await logout()
        Navigate('/login')
      } catch {
        setError('Failed to log out')
      }
    }

    function getAccessToken(){
        fetch("https://www.strava.com/oauth/token", {
            method: "POST",
            body: JSON.stringify({
              client_id: clientID,
              client_secret: clientSecret,
              grant_type: "refresh_token",
              refresh_token: refreshToken
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
            .then(res => res.json())
            .then(data => getActivities(data))
    }

    function getActivities(data){
        fetch("https://www.strava.com/api/v3/athlete/activities?per_page=200", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${data.access_token}`
          }
        })
          .then(res => res.json())
          .then(data => setStravaData(data))
      }

    const displayData = stravaData
    console.log(displayData)



    return (
        <>
            <h3>{`Email: ${currentUser.email}`}</h3>
            <Link to={`https://www.strava.com/oauth/authorize?client_id=${clientID}&redirect_uri=http://localhost:5173/&response_type=code&scope=read_all&activities=real_all`}>Authorize</Link>
            <button onClick={getAccessToken}>Get Strava data</button>
            <button onClick={handleLogout}>Log Out</button>
        </>
    )
}