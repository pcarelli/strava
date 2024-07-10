import React from "react"

export default function FilterBar(props){
    return (
        <div className='filterBar'>
          <button className='chiclet chiclet-swim' onClick={props.onClick}>Swim</button>
          <button className='chiclet chiclet-bike' onClick={props.onClick}>Ride</button>
          <button className='chiclet chiclet-run' onClick={props.onClick}>Run</button>
        </div>
    )
}
