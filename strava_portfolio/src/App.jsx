import React from 'react'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Layout from './components/Layout.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function App(){

  const [stravaData, setStravaData] = React.useState([])

  // React.useEffect(() => {
  //   fetch("https://www.strava.com/oauth/token", {
  //     mode: "no-cors",
  //     method: "POST",
  //     body: JSON.stringify({
  //       client_id: import.meta.env.VITE_CLIENT_ID,
  //       client_secret: import.meta.env.VITE_CLIENT_SECRET,
  //       grant_type: "refresh_token",
  //       refresh_token: import.meta.env.VITE_REFRESH_TOKEN
  //     }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8"
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(data => getActivities(data))
  // }, [])

  // function getActivities(data){
  //   fetch("https://www.strava.com/api/v3/athlete/activities?per_page=200", {
  //     method: "GET",
  //     headers: {
  //       "Authorization": `Bearer ${data.access_token}`
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(data => setStravaData(data))
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
