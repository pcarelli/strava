import React from "react"
import { Link, NavLink, useParams, useNavigate } from "react-router-dom"
import {useAuth} from '../contexts/AuthContext'
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore"
import app, { auth } from '../firebase'
import { ring } from 'ldrs'
import { MdOpenInNew } from "react-icons/md"

export default function Activities(){
  const [stravaData, setStravaData] = React.useState([])
  const {currentUser} = useAuth()
  const [currentUserDetails, setCurrentUserDetails] = React.useState({})
  const [refresh, setRefresh] = React.useState(0)
  const [loading, setLoading] = React.useState(true)
  const navigate = useNavigate()

  const db = getFirestore(app)

  React.useEffect(() => {
    const docRef = doc(db, 'users', currentUser.uid)
    getDoc(docRef)
    .then(snapshot => snapshot.data())
    .then(data => {
      setCurrentUserDetails(data)
      setStravaData(data.activities)
      setLoading(false)
    })
  }, [refresh])

  React.useEffect(() => {
    //check if currentUserDetails has data
    if(Object.keys(currentUserDetails).length){
      //user needs to authorize
      if(!currentUserDetails.accessToken.length){
        if(!currentUserDetails.clientID.length || !currentUserDetails.clientSecret.length){
          return (
            <div className="error-container"><span className='error-text'>Please input your Client Secret and Client ID in your profile.</span></div>
          )
        } else {
          let authCode = ''
          if(window.location.href !== window.location.href.split("&").toString()){
            authCode = window.location.href.split("&").filter(row => row.includes('code')).toString().split("=")[1]
          }
          if(authCode.length && Object.keys(currentUserDetails).length){
            fetch("https://www.strava.com/oauth/token", {
              method: "POST",
              body: JSON.stringify({
                client_id: currentUserDetails.clientID,
                client_secret: currentUserDetails.clientSecret,
                grant_type: "authorization_code",
                code: authCode
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
            })
            .then(res => res.json())
            .then(async data => {
              const tokens = {
                accessToken: data.access_token, 
                accessTokenExpireDate: data.expires_at, 
                refreshToken: data.refresh_token
              }
  
              const docRef = doc(db, 'users', currentUser.uid)
              await updateDoc(docRef, tokens)
              setRefresh(prev => prev+1)
            })
          }
        }
      } else {
        //user has authorized before, check token expire status
        //if expired, get a new token and push to db
        if(currentUserDetails.accessTokenExpireDate <= (Date.now())/1000){
          fetch("https://www.strava.com/oauth/token", {
            method: "POST",
            body: JSON.stringify({
              client_id: currentUserDetails.clientID,
              client_secret: currentUserDetails.clientSecret,
              grant_type: "refresh_token",
              refresh_token: currentUserDetails.refreshToken
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          .then(res => res.json())
          .then(async data => {
            const tokens = {
              accessToken: data.access_token, 
              accessTokenExpireDate: data.expires_at
            }

            const docRef = doc(db, 'users', currentUser.uid)
            await updateDoc(docRef, tokens)
            setRefresh(prev => prev+1)
          })
        } else {}
      }
    }

    //fix this for new users
  }, [Object.keys(currentUserDetails).length])


  if(loading){
    ring.register()
    return (
        <div className="ldr">
            <l-ring
                size="40"
                stroke="4"
                bg-opacity="0"
                speed="2" 
                color="black" 
            ></l-ring>
        </div>
    )
  }

  async function getActivities({pageNum = 1, result = [], after=0}){
    //check timestamp of most recent activity in db, fetch activities after that date and push to db
    setLoading(true)
    const url = "https://www.strava.com/api/v3/athlete/activities?per_page=200"
    const docRef = doc(db, 'users', currentUser.uid)
    const res = await getDoc(docRef)
    let activities = res.data().activities
    let maxDate = 0
    if (activities === undefined || activities.length === 0){
      activities = []
    } else {
      maxDate = Math.max.apply(null, activities.map(e => {
        return  new Date(e.start_date)
      }))
    }

    if(maxDate === 0){
      fetch(`${url}&page=${pageNum}&after=${after}`, {
        method: "GET",
          headers: {
            "Authorization": `Bearer ${currentUserDetails.accessToken}`
          }
        })
      .then(res => res.json())
      .then(data => {
        if (data.length !== 0){
          result = [...result, ...data]
          pageNum++
          return getActivities({pageNum, result})
        }
        result = result.filter(activity => activity.type==="Run")
        const pushObj = {activities: result}
        updateDoc(docRef, pushObj) 
        setRefresh(prev => prev+1)
        setLoading(false)
      })
    } else {
      fetch(`${url}&page=${pageNum}&after=${maxDate/1000}`, {
        method: "GET",
          headers: {
            "Authorization": `Bearer ${currentUserDetails.accessToken}`
          }
        })
      .then(res => res.json())
      .then(data => {
        if (data.length !== 0){
          result = [...result, ...data]
          pageNum++
          return getActivities({pageNum, result})
        }
        result = result.filter(activity => activity.type==="Run")
        const pushRes = [...activities, ...result]
        const pushObj = {activities: pushRes}
        updateDoc(docRef, pushObj)
        setRefresh(prev => prev+1)
        setLoading(false)
      })
    }
    
  }

  function dateConvert(stringDate){
    const date = new Date(stringDate)
    const options = {
        weekday:"short", 
        month:"numeric", 
        day:"numeric", 
        hour:"numeric", 
        minute:"numeric",
        timeZone: "America/New_York"
    }
        return date.toLocaleDateString("en-us", options)
  }

  let displayData = stravaData
  
  console.log(displayData)
  
  const displayActivities = displayData.map(act => {
    return (
      <div className="activity-card">
        <div className="top-row">
          <div></div>
          <h3 className="no-margin">{act.name}</h3>
          <MdOpenInNew className="open"/>
        </div>
        <div className="activity-details">
          <span>{act.id}</span>
          <span>{dateConvert(act.start_date)}</span>
        </div>
      </div>
    )
  })

  const displayLink = currentUserDetails.accessToken.length ? <button className="dashboard-button" disabled>Authorized</button> : <Link id="auth-link" to={`https://www.strava.com/oauth/authorize?client_id=${currentUserDetails.clientID}&redirect_uri=http://localhost:5173/dashboard&response_type=code&scope=activity:read_all`}>Authorize</Link>
  
  return (
    <>
      <div className="link-container">
        {displayLink}
        <button className="dashboard-button" onClick={getActivities}>Get Strava Activities</button>
      </div>
      <div className="activities-container">
        {displayActivities}
      </div>
    </>
  )
}