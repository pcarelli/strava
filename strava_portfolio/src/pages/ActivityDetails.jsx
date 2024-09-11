import React from "react"
import { Link, NavLink, useParams, useNavigate } from "react-router-dom"
import {useAuth} from '../contexts/AuthContext'
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore"
import app, { auth } from '../firebase'
import { ring } from 'ldrs'

export default function ActivityDetails(){
    const [stravaData, setStravaData] = React.useState([])
    const {currentUser} = useAuth()
    const [currentUserDetails, setCurrentUserDetails] = React.useState({})
    const [refresh, setRefresh] = React.useState(0)
    const [loading, setLoading] = React.useState(true)

    const db = getFirestore(app)
    const params = useParams()

    // Load current user data
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
        setLoading(true)
        if(Object.keys(currentUserDetails).length){
            fetch(`https://www.strava.com/api/v3/activities/${params.id}/streams?keys=time,distance&key_by_type=true`, {
                method: "GET",
                  headers: {
                    "Authorization": `Bearer ${currentUserDetails.accessToken}`
                  }
                })
              .then(res => res.json())
              .then(data => {
                
              })
        }

    }, [refresh])


    // Return spinner if loading
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



    return (
        <h1>Chart</h1>
    )
}