// Time conversion functions

export function secondsToHourMinuteSecondTime(seconds){
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


// Speed conversion functions

export function decimalToMinuteSecondPace(decimalSpeed){
    let secs = Math.floor((decimalSpeed-Math.floor(decimalSpeed))*60)
    if (secs < 10){
        secs = `0${secs}`
    } else {
        secs = secs
    }
    return `${Math.floor(decimalSpeed)}:${secs}`
}

export function convertSwimSpeed(speed){
    const decimalPace = 100*Math.round((1/(speed*60))*10000)/10000
    return decimalToMinuteSecondPace(decimalPace)
}

export function convertRunSpeed(speed){
    const decimalPace = 1/((speed*2.237)/60)
    return decimalToMinuteSecondPace(decimalPace)
}

export function convertBikeSpeed(speed){
    const decimalPace = Math.round(((speed*60*60)/1609)*10)/10
    return decimalPace
}


// Distance conversion functions

export function convertRunBikeDistance(dist){
    return Math.round((dist/1609)*100)/100
}
