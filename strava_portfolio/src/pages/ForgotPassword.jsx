import React from "react"
import { Link, NavLink, useActionData, useParams, useNavigate } from "react-router-dom"
import {useAuth} from '../contexts/AuthContext'

export default function ForgotPassword(){

    const emailRef = React.useRef()
    const {resetPassword} = useAuth()
    const [error, setError] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    async function handleSubmit(e){
        e.preventDefault()

        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Email sent to your inbox')
        } catch {
            setError('Failed to reset password')
        }

        setLoading(false)
         
    }

    return (
        <div className="login-container">
            <h3 className="login-title">Password Reset</h3>
            {error && <div className="error-container"><span className='error-text'>{error}</span></div>}
            {message && <div className="success-container"><span className='success-text'>{message}</span></div>}
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    ref={emailRef}
                />
                <button disabled={loading}>Reset Password</button>
            </form>
            <span className="bottom-text"><Link to="../login" className="bottom-text bold underline">Log In</Link></span>
            <span className="bottom-text">Don't have an account? <Link to="../signup" className="bottom-text bold underline">Create one</Link></span>
        </div>
    )
}