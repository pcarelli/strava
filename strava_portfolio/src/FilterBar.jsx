import React from "react"

export default function FilterBar(props){
    return (
        <div className='filterBar'>
          <button className='chiclet chiclet-swim'>Swim</button>
          <button className='chiclet chiclet-bike'>Ride</button>
          <button className='chiclet chiclet-run'>Run</button>
        </div>
    )
}
