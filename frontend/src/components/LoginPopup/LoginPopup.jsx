import React, { useState } from 'react'
import { assets } from "../../assets/assets.js"
import "./LoginPopup.css"
const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login")
    return (
        <div className="login-popup">
            <form className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => { setShowLogin(false) }} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> :
                        <input type="text" name="" placeholder="Your Name" id="" required />
                    }
                    <input type="email" name="" placeholder="Your Email" id="" required />
                    <input type="password" name="" placeholder="Password" id="" required />
                </div>
                <button>
                    {
                        currState === "Sign Up" ? "Create account" : "Login"
                    }
                </button>
                <div className="login-popup-condition">
                    <input type="checkbox" name="" id="" required />
                    <p>By Continuing, I agree to terms of use & privacy policy.</p>
                </div>
                {
                    currState === "Login" ?
                        <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p> :
                        <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login</span></p>

                }
            </form>
        </div>
    )
}

export default LoginPopup