import React, { useState,useContext } from 'react'
import { assets } from "../../assets/assets.js"
import {StoreContext} from "../../context/StroreContext"
import axios from "axios";
import "./LoginPopup.css"
const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login")
    const {url,setToken}=useContext(StoreContext)
    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    })
    const onChangeHandler=(e)=>{
const {name,value}=e.target;
setData(data=>({...data,[name]:value}))
    }

    const onLogin=async (e)=>{
        e.preventDefault();
        let newUrl=url;
        if(currState==="Login"){
            newUrl+="/api/user/login"
        }
        else{
            newUrl+="/api/user/register" 
        }
    const response=await axios.post(newUrl,data)
console.log(response.data);
if(response.data.success){
  setToken(response.data.token)
  localStorage.setItem("token",response.data.token);
  setShowLogin(false)
}
else{
    alert(response.data.message)
}
    }
    return (
        <div className="login-popup">
            <form className="login-popup-container" onSubmit={onLogin}>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => { setShowLogin(false) }} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> :
                        <input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder="Your Name" id="" required />
                    }
                    <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder="Your Email" id="" required />
                    <input type="password" name="password" onChange={onChangeHandler} value={data.password} placeholder="Password" id="" required />
                </div>
                <button type="submit">
                    {
                        currState === "Sign Up" ? "Create account" : "Login"
                    }
                </button>
                <div className="login-popup-condition">
    <input type="checkbox" name="terms" id="terms" />
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