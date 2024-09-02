import React from "react"
import { Link, NavLink, useParams } from "react-router-dom"

export default function Login(){
    const [loginFormData, setLoginFormData] = React.useState({email: "", password: ""})

    function handleSubmit(e){
        e.preventDefault()
        console.log(loginFormData)
    }

    function handleChange(e){
        const {name, value} = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="login-container">
            <h3 className="login-title">Login</h3>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email"
                    value={loginFormData.email}
                />
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    value={loginFormData.password}
                />
                <button>Log in</button>
            </form>
            <span className="bottom-text">Don't have an account? <Link to="../signup" className="bold underline">Create one</Link></span>
        </div>
    )
}