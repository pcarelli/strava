import React from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"

export default function Home(){
    return (
    <div className="content">
        <div className="section">
            <div className="cta-container-left">
                <h1 className="cta-main-text">Take control of your run training.</h1>
                <h3 className="cta-sub-text">Segment your runs to better understand your working intervals and predict your next race pace.</h3>
                <Link className="button signup-btn" to="/signup">Sign up</Link>
            </div>
            <div className="cta-container-right">

            </div>
        </div>
    </div>
    )
}