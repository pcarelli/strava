import React from "react"

export default function Card(props){
    console.log(props)
    const options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'}
    const rawStartDate = new Date(props.start_date)

    return (
        <div className="card">
            <h2>{props.name} - {rawStartDate.toLocaleDateString("en-US", options)}</h2>
        </div>
    )
}
