import React from "react"

export default function LineChart(data, height, width){

    const [isHover, setIsHover] = React.useState(false)
    const [xCoord, setXCoord] = React.useState(0)
    const [yCoord, setYCord] = React.useState(0)

    const chartData = data.data

    if(chartData.length === 0){
        return (
            <h1>Loading...</h1>
        )
    }

    const chartHeight = data.height
    const chartWidth = data.width

    const maxY = Math.max(...chartData.map(point => point.y))
    const maxX = Math.max(...chartData.map(point => point.x))

    const points = chartData.map(point => {
        const x = (point.x/maxX)*chartWidth
        let y = chartHeight - (point.y/maxY)*chartHeight
        y = parseFloat(y.toString()).toFixed(2)

        return `${x},${y}`
    }).join(" ")


    function mouseEnter(){
        setIsHover(true)
    }

    function mouseExit(){
        setIsHover(false)
    }

    function getCoords(evt){
        var e = evt.target
        var dim = e.getBoundingClientRect()
        var x = evt.clientX - dim.left
        var y = evt.clientY - dim.top

        setXCoord(x)
    }

    const tooltip = (

        <div className="tooltip">
            {`x: ${xCoord} y: ${yCoord}`}
        </div>
    )


    return (
    <>
        {isHover && tooltip}
        <svg width={"100%"} height={"100%"} onMouseEnter={mouseEnter} onMouseLeave={mouseExit} onMouseMove={getCoords}>
            <polyline points={`0,0 0,${chartHeight}`} fill="none" stroke="#A9A9A9" strokeWidth={3}/>
            <polyline points={`0,${chartHeight} ${chartWidth},${chartHeight}`} fill="none" stroke="#A9A9A9" strokeWidth={3}/>
            <polyline points={points} fill="none" stroke="#446461"/>
        </svg>
    </>
    )
}