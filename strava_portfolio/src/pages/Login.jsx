import React from "react"
import { Link, NavLink, useActionData, useParams, useNavigate } from "react-router-dom"
import {useAuth} from '../contexts/AuthContext'

export default function Login(){

    const emailRef = React.useRef()
    const passwordRef = React.useRef()
    const {login} = useAuth()
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/dashboard')
        } catch {
            setError('Failed to sign')
        }

        setLoading(false)
         
    }

    return (
        <div className="login-container">
            <h3 className="login-title">Welcome back!</h3>
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
                <button disabled={loading}>Log In</button>
            </form>
            <span className="bottom-text">Don't have an account? <Link to="../signup" className="bold underline">Create one</Link></span>
        </div>
    )
}