import React from 'react'
import "./Navbar.css"
import {assets} from "../../assets/assets.js"
const Navbar = () => {
  return (
    <div className="navbar">
      <span>
      <h2 className="logo">Jevils Ka?</h2>
      <p>Admin Panel</p>
      </span>
      <img src={assets.profile_image} alt="profile" className="profile" />

    </div>
  )
}

export default Navbar