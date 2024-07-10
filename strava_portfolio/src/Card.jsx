import React from "react"

export default function Card(props){
    console.log(props)
    const options = {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'}
    const rawStartDate = new Date(props.start_date)

    function decimalToMinuteSecondPace(decimalSpeed){
        let secs = Math.round((decimalSpeed-Math.floor(decimalSpeed))*60)
        if (secs < 10){
            secs = `0${secs}`
        } else {
            secs = secs
        }
        return `${Math.floor(decimalSpeed)}:${secs}`
    }
    
    function secondsToHourMinuteSecondTime(seconds){
        let hours = Math.floor(seconds/60/60)
        let minutes = Math.floor((seconds-(hours*60*60))/60)
        let secs = seconds-(hours*60*60)-(minutes*60)

        if (secs < 10){
            secs = `0${secs}`
        } else {
            secs = secs
        }

        if (minutes < 10){
            minutes = `0${minutes}`
        } else {
            minutes = minutes
        }

        if (hours < 10){
            hours = `0${hours}`
        } else {
            hours = hours
        }

        let formattedTime

        if(hours > 0){
            formattedTime = `${hours}:${minutes}:${secs}`
        } else {
            formattedTime = `${minutes}:${secs}`
        }

        return formattedTime
    }

    function convertSwimSpeed(speed){
        const decimalPace = 100*Math.round((1/(speed*60))*10000)/10000
        return decimalToMinuteSecondPace(decimalPace)
    }

    function convertRunSpeed(speed){
        const decimalPace = Math.round((1/(speed*60))*1609*100)/100
        return decimalToMinuteSecondPace(decimalPace)
    }

    function convertBikeSpeed(speed){
        const decimalPace = Math.round(((speed*60*60)/1609)*10)/10
        return decimalPace
    }

    let pace

    if(props.sport_type === "Swim"){
        pace = `${convertSwimSpeed(props.average_speed)} min/100m`
    } else if(props.sport_type === "Run"){
        pace = `${convertRunSpeed(props.average_speed)} /mi`
    } else if (props.sport_type === "Ride"){
        pace = `${convertBikeSpeed(props.average_speed)} mi/h`
    }


    function convertRunBikeDistance(dist){
        return Math.round((dist/1609)*100)/100
    }

    let totalDistance

    if(props.sport_type === "Swim"){
        totalDistance = `${Math.round(props.distance)}m`
    } else if(props.sport_type === "Ride" || props.sport_type === "Run"){
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
