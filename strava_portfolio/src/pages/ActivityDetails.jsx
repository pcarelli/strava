import React from "react"
import { Link, NavLink, useParams, useNavigate } from "react-router-dom"
import {useAuth} from '../contexts/AuthContext'
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore"
import app, { auth } from '../firebase'
import { ring } from 'ldrs'
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { convertRunSpeed } from '../conversions'

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

    const groupSize = 5
    let windowData = displayData.distance === undefined ? [] : sumSubarraySum(distanceData, groupSize)
    let chartData = []

    chartData = timeData.map((point, index) => {
        return {
            time: point, 
            dist: distanceData[index], 
            speed: speedData[index],
            rollingSpeed: distanceData[index]/(point === 0 ? 1 : point),
            windowDist: windowData[index],
            windowTimeEl: sumSubarraySumTime(timeData, groupSize)[index],
            y: windowData[index]/(windowData[index] === 0 ? 1 : sumSubarraySumTime(timeData, groupSize)[index]),
            pace: convertRunSpeed(speedData[index]),
            windowPace: convertRunSpeed(windowData[index]/(windowData[index] === 0 ? 1 : sumSubarraySumTime(timeData, groupSize)[index]))
        }
    })


    console.log("chart data", chartData)


    function sumSubarraySum(arr, num) {
        if (num > arr.length) {
          return null
        }
      
        let currentSum = 0

        const newArr = []

        for (let i = 0; i < arr.length; i++) {
            currentSum = (i - num + 1) < 0 ? 0 : (arr[i] - arr[i - num + 1])
            newArr.push(currentSum)
          }

        return newArr
      
      }

      function sumSubarraySumTime(arr, num) {
        if (num > arr.length) {
          return null
        }
      
        let currentSum = 0

        const newArr = []

        for (let i = 0; i < arr.length; i++) {
            currentSum = (i - num + 1) < 0 ? 0 : (arr[i] - arr[i - num + 1])
            newArr.push(currentSum)
        }


        return newArr
      
      }

      return (
              <div className="chart-container"> 
                  <ResponsiveContainer width="99%" height="99%">
                      <LineChart
                        width={800}
                        height={500}
                        data={chartData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                      >
                        <XAxis dataKey="dist" tick={false}/>
                        <YAxis tickFormatter={tick => convertRunSpeed(tick)}/>
                        <Tooltip formatter={value => `${convertRunSpeed(value)} min/mi`}/>
                        <Legend />
                        <Line type="monotone" dataKey="speed" stroke="#5684d8" dot={false}/>
                        <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false}/>
                      </LineChart>
                  </ResponsiveContainer>    
              </div>
          )
}