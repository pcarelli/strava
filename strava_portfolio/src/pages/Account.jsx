import React, { useEffect } from "react"
import {useAuth} from '../contexts/AuthContext'
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"
import app from '../firebase'

export default function Account(){

    const {currentUser} = useAuth()
    const [currentUserDetails, setCurrentUserDetails] = React.useState()
    const [loading, setLoading] = React.useState(true)

    const db = getFirestore(app)

    React.useEffect(() => {
        const docRef = doc(db, 'users', currentUser.uid)
        getDoc(docRef).then(snapshot => {
            setCurrentUserDetails(snapshot.data())
            setLoading(false)
        })
    }, [])

    if(loading){
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <div className="profile-container">
            <h3>Profile</h3>
            <span className="update-btn">Update</span>
            <div className="profile-details-container">
                <p>First Name: <strong>{currentUserDetails.firstName}</strong></p>
                <p>Last Name: <strong>{currentUserDetails.lastName}</strong></p>
                <p>Email: <strong>{currentUser.email}</strong></p>
                <p>Strava API Client ID: <strong>{currentUserDetails.clientID}</strong></p>
                <p>Strava API Client Secret: <strong>{currentUserDetails.clientSecret}</strong></p>
            </div>
        </div>
    )
}