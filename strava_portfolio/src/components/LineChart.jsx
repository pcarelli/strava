import React from "react"

export default function LineChart(data){
    
    const [screenWidth, setScreenWidth] = React.useState(window.innerWidth)

    React.useEffect(() => {
        function watchWidth(){
            setScreenWidth(window.innerWidth)
        }

        window.addEventListener("resize", watchWidth)

        return function(){
            window.removeEventListener("resize", watchWidth)
        }
    }, [])

    const height = 536
    const width = screenWidth-81
    

    const chartData = data.data

    if(chartData.length === 0){
        return (
            <h1>Loading...</h1>
        )
    }

    const maxY = Math.max(...chartData.map(point => point.y))
    const maxX = Math.max(...chartData.map(point => point.x))

    const points = chartData.map(point => {
        const x = (point.x/maxX)*width
        let y = height- (point.y/maxY)*height
        y = parseFloat(y.toString()).toFixed(2)

        return `${x},${y}`
    }).join(" ")


    return (
        <svg width={"100%"} height={"100%"}>
            <polyline points={`0,0 0,${height}`} fill="none" stroke="#A9A9A9" strokeWidth={3}/>
            <polyline points={`0,${height} ${width},${height}`} fill="none" stroke="#A9A9A9" strokeWidth={3}/>
            <polyline points={points} fill="none" stroke="#446461" />
        </svg>
    )
}