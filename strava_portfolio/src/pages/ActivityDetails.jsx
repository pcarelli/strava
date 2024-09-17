import React from "react"
import { Link, NavLink, useParams, useNavigate } from "react-router-dom"
import {useAuth} from '../contexts/AuthContext'
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore"
import app, { auth } from '../firebase'
import { ring } from 'ldrs'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { convertRunSpeed } from '../conversions'
import LineChart from "../components/LineChart"

export default function ActivityDetails(){
    const [activityData, setActivityData] = React.useState([])
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
            fetch(`https://www.strava.com/api/v3/activities/${params.id}/streams?keys=time,distance,velocity_smooth&key_by_type=true`, {
                method: "GET",
                  headers: {
                    "Authorization": `Bearer ${currentUserDetails.accessToken}`
                  }
                })
              .then(res => res.json())
              .then(data => {
                setActivityData(data)
                setLoading(false)
              })
        }

    }, [currentUserDetails])


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

    const startDate = new Date(currentUserDetails.activities[params.id].start_date).getTime()

    let displayData = activityData
    let distanceData = displayData.distance === undefined ? [] : displayData.distance.data
    let timeData = displayData.time === undefined ? [] : displayData.time.data
    let speedData = displayData.time === undefined ? [] : displayData.velocity_smooth.data
    let chartData = []
    chartData.push(timeData, distanceData, speedData)

    chartData = timeData.map((point, index) => {
        return {time: point, distance: distanceData[index], speed: speedData[index], pace: convertRunSpeed(speedData[index])}
    })

    console.log("chart data", chartData)

    

    return (
        <div className="chart-container"> 
            <svg width={"100%"} height={"100%"}>
                <polyline points="0,0 0,500" fill="none" stroke="black" />
                <polyline points="0,500 500,500" fill="none" stroke="black" />
                <polyline points="0,500 10,300 20,250 30,270 40,260 50,275" fill="none" stroke="black" />
            </svg>
        </div>
    )
}