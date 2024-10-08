import React, { useEffect } from "react"
import {useAuth} from '../contexts/AuthContext'
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore"
import app from '../firebase'
import { ring } from 'ldrs'


export default function Account(){    

    const {currentUser} = useAuth()
    const [currentUserDetails, setCurrentUserDetails] = React.useState()
    const [loading, setLoading] = React.useState(true)
    const [updating, setUpdating] = React.useState(false)
    const [updateFormData, setUpdateFormData] = React.useState({})
    const [refresh, setRefresh] = React.useState(0)

    const db = getFirestore(app)

    React.useEffect(() => {
        const docRef = doc(db, 'users', currentUser.uid)
        getDoc(docRef).then(snapshot => {
            setCurrentUserDetails(snapshot.data())
            setLoading(false)
        })
    }, [refresh])

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

    function handleUpdateClick(){
        setUpdating(prev => !prev)
    }

    async function handleSubmit(e){
        e.preventDefault()
        const docRef = doc(db, 'users', currentUser.uid)
        await updateDoc(docRef, updateFormData)
        setUpdating(prev => !prev)
        setRefresh(prev => prev+1)
        setUpdateFormData({})
    }

    function handleChange(e){
        const {name, value} = e.target
        setUpdateFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const nonUpdateProfile = 
    <div className="profile-container">
        <h3>Profile</h3>
        <span onClick={handleUpdateClick} className="update-btn">Update</span>
        <div className="profile-details-container">
            <p>First Name: <strong>{currentUserDetails.firstName}</strong></p>
            <p>Last Name: <strong>{currentUserDetails.lastName}</strong></p>
            <p>Email: <strong>{currentUser.email}</strong></p>
            <p>Strava API Client ID: <strong>{currentUserDetails.clientID}</strong></p>
            <p>Strava API Client Secret: <strong>{currentUserDetails.clientSecret}</strong></p>
        </div>
    </div>

    const updateProfile = 
    <div className="profile-container">
        <h3>Profile</h3>
        <div className="profile-details-container">
            <form onSubmit={handleSubmit} className="update-form">
                    <div className="form-row">
                        <label htmlFor="firstName">First Name: </label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            defaultValue={currentUserDetails.firstName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-row">
                        <label htmlFor="lastName">Last Name: </label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            defaultValue={currentUserDetails.lastName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-row">
                        <label htmlFor="Email">Email: </label>    
                        <input
                            id="Email"
                            name="Email"
                            type="Email"
                            defaultValue={currentUser.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-row">
                        <label htmlFor="clientID">Strava API Client ID: </label>
                        <input
                            id="clientID"
                            name="clientID"
                            type="text"
                            defaultValue={currentUserDetails.clientID}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-row">
                        <label htmlFor="clientSecret">Strava API Client Secret: </label>
                        <input
                            id="clientSecret"
                            name="clientSecret"
                            type="text"
                            defaultValue={currentUserDetails.clientSecret}
                            onChange={handleChange}
                        />
                    </div>
                    <button className="update-btn">Save</button>
                </form>
        </div>
    </div>

    let displayData

    if(!updating){
        displayData = nonUpdateProfile
    } else {
        displayData = updateProfile
    }


    return (
        displayData
    )
}