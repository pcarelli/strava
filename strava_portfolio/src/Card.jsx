import React from "react"
import {secondsToHourMinuteSecondTime, convertSwimSpeed, convertRunSpeed, convertBikeSpeed, convertRunBikeDistance} from "./conversions"

export default function Card(props){
    const options = {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'}
    const rawStartDate = new Date(props.start_date)

    let pace, totalDistance

    switch(props.sport_type){
        case "Swim":
            pace = `${convertSwimSpeed(props.average_speed)} min/100m`
            totalDistance = `${Math.round(props.distance)}m`
            break
        case "Run":
            pace = `${convertRunSpeed(props.average_speed)} /mi`
            totalDistance = `${convertRunBikeDistance(props.distance)} mi`
            break
        case "Ride":
            pace = `${convertBikeSpeed(props.average_speed)} mi/h`
            totalDistance = `${convertRunBikeDistance(props.distance)} mi`
    }

    return (
        <div className="card">
            <h2>{props.name}</h2>
            <div className="activity-details">
                <p><span className="grey">Date:</span> {rawStartDate.toLocaleDateString("en-US", options)}</p>
                <p><span className="grey">Type:</span> {props.sport_type}</p>
                <p><span className="grey">Elapsed Time:</span> {secondsToHourMinuteSecondTime(props.elapsed_time)}</p>
                <p><span className="grey">Moving Time:</span> {secondsToHourMinuteSecondTime(props.moving_time)}</p>
                <p><span className="grey">Distance:</span> {totalDistance}</p>
                <p><span className="grey">Pace:</span> {pace}</p>
            </div>
        </div>
    )
}
