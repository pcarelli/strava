import React from 'react'
import Card from './Card.jsx'
import Header from './Header.jsx'

export default function App(){
  const refreshToken = "de52dbc3be57eebc75cb5d4a31829d4b365e19cd"
  const accessToken = "b005b4d7529df7def8751de106f370e7dd2467ed"
  const clientId = "94243"
  const clientSecret = "813838c6d34960ef53e23a5eb88b6c03b49883ce"

  const [stravaData, setStravaData] = React.useState([])

  React.useEffect(function() {
    fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      body: JSON.stringify({
        client_id: clientId,
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

  return (
    <>
      <Header
        activityCount={stravaData.length}
      />
      <div className='app-container'>
        <div className='filterBar'>
          <button className='chiclet chiclet-swim'>Swim</button>
          <button className='chiclet chiclet-bike'>Bike</button>
          <button className='chiclet chiclet-run'>Run</button>
        </div>
        <div className='cards-container'>
          {stravaData.map(activity => {
            return (
              <Card
                key={activity.upload_id}
                {...activity}
              />
            )
          })}
        </div>
      </div>
    </>
    
  )
}
