import React from "react"

export default function Card(props){
    console.log(props)
    const options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'}
    const rawStartDate = new Date(props.start_date)

    function decimalToMinutePace(decimalSpeed){
        let secs = Math.round((decimalSpeed-Math.floor(decimalSpeed))*60)
        if (secs < 10){
            secs = `0${secs}`
        } else {
            secs = secs
        }
        return `${Math.floor(decimalSpeed)}:${secs}`
    }
    
    function convertSwim(speed){
        const decimalPace = 100*Math.round((1/(speed*60))*10000)/10000
        return decimalToMinutePace(decimalPace)
    }

    function convertRun(speed){
        const decimalPace = Math.round((1/(speed*60))*1609*100)/100
        return decimalToMinutePace(decimalPace)
    }

    function convertBike(speed){
        const decimalPace = Math.round(((speed*60*60)/1609)*10)/10
        return decimalPace
    }

    let pace

    if(props.sport_type === "Swim"){
        pace = `${convertSwim(props.average_speed)} min/100m`
    } else if(props.sport_type === "Run"){
        pace = `${convertRun(props.average_speed)} /mi`
    } else if (props.sport_type === "Ride"){
        pace = `${convertBike(props.average_speed)} mi/h`
    }

    return (
        <div className="card">
            <h2>{props.name}</h2>
            <div className="activity-details">
                <p><span className="grey">Date:</span> {rawStartDate.toLocaleDateString("en-US", options)}</p>
                <p><span className="grey">Type:</span> {props.sport_type}</p>
                <p><span className="grey">Pace:</span> {pace}</p>
            </div>
        </div>
    )
}
