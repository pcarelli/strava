import React from "react"
import { Link, NavLink, useParams, useNavigate } from "react-router-dom"
import {useAuth} from '../contexts/AuthContext'
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore"
import app, { auth } from '../firebase'
import { ring } from 'ldrs'

export default function Dashboard(){
  const [stravaData, setStravaData] = React.useState([])
  const [error, setError] = React.useState("")
  const {currentUser, logout} = useAuth()
  const [currentUserDetails, setCurrentUserDetails] = React.useState({})
  const [details, setDetails] = React.useState({})
  const [refresh, setRefresh] = React.useState(0)
  const [loading, setLoading] = React.useState(true)
  const [updateTokens, setUpdateTokens] = React.useState({})
  const navigate = useNavigate()

  async function handleLogout(){
    setError('')

    try {
      await logout()
      navigate('/')
    } catch {
      setError('Failed to log out')
    }
  }

  const db = getFirestore(app)

  React.useEffect(() => {
    const docRef = doc(db, 'users', currentUser.uid)
    getDoc(docRef)
    .then(snapshot => snapshot.data())
    .then(data => {
      setCurrentUserDetails(data)
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
        if(currentUserDetails.accessTokenExpireDate <= (Date.now())/1000){
          fetch("https://www.strava.com/oauth/token", {
            method: "POST",
            body: JSON.stringify({
              client_id: currentUserDetails.clientID,
              client_secret: currentUserDetails.clientSecret,
              grant_type: "refresh_token",
              code: currentUserDetails.refreshToken
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
        } else {
          //fetch strava activities
          // getActivities()
        }
      }
    }

    
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


  function getActivities(){
    fetch("https://www.strava.com/api/v3/athlete/activities?per_page=200", {
      method: "GET",
        headers: {
          "Authorization": `Bearer ${currentUserDetails.accessToken}`
        }
      })
    .then(res => res.json())
    .then(data => setStravaData(data))
  }

  const displayData = stravaData
  console.log(displayData)

  const displayLink = currentUserDetails.accessToken.length ? <button className="dashboard-button" disabled>Authorized</button> : <Link id="auth-link" to={`https://www.strava.com/oauth/authorize?client_id=${currentUserDetails.clientID}&redirect_uri=http://localhost:5173/dashboard&response_type=code&scope=activity:read_all`}>Authorize</Link>
    return (
        <>
            <h1>Dashboard</h1>
            <div className="link-container">
              {displayLink}
              <button className="dashboard-button" onClick={getActivities}>Get Strava Activities</button>
              <button className="dashboard-button"onClick={handleLogout}>Log Out</button>
            </div>
        </>
    )
}