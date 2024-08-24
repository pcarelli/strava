import React from 'react'
import Card from './Card.jsx'
import Header from './Header.jsx'
import FilterBar from './FilterBar.jsx'

export default function App(){

  const [stravaData, setStravaData] = React.useState([])

  React.useEffect(() => {
    fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      body: JSON.stringify({
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: import.meta.env.VITE_REFRESH_TOKEN
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(data => getActivities(data))
  }, [])

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

  const cardEls = stravaData.map(activity => {
    return (
      <Card
        key={activity.upload_id}
        {...activity}
      />
    )
  })

  return (
    <>
      <Header
        activityCount={stravaData.length}
      />
      <div className='app-container'>
        <FilterBar/>
        <div className='cards-container'>
          {cardEls}
        </div>
      </div>
    </>
    
  )
}
