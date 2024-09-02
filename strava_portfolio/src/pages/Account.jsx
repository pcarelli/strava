import React from "react"
import {useAuth} from '../contexts/AuthContext'

export default function Account(){

    const {currentUser, logout} = useAuth()

    return (
        <h3>{`Email: ${currentUser.email}`}</h3>
    )
}