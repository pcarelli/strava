import React from "react"
import { Link, NavLink, useActionData, useParams } from "react-router-dom"
import {useAuth} from '../contexts/AuthContext'

export default function Signup(){

    const emailRef = React.useRef()
    const passwordRef = React.useRef()
    const password2Ref = React.useRef()
    const {signup} = useAuth()
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    async function handleSubmit(e){
        e.preventDefault()

        if(passwordRef.current.value !== password2Ref.current.value){
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
        } catch {
            setError('Failed to create an account')
        }

        setLoading(false)
         
    }

    return (
        <div className="login-container">
            <h3 className="login-title">Create an account</h3>
            {error && <div className="error-container"><span className='error-text'>{error}</span></div>}
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    ref={emailRef}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    ref={passwordRef}
                />
                <input
                    name="password2"
                    type="password"
                    placeholder="Confirm password"
                    ref={password2Ref}
                />
                <button disabled={loading}>Sign Up</button>
            </form>
            <span className="bottom-text">Already have an account? <Link to="../login" className="bold underline">Login</Link></span>
        </div>
    )
}