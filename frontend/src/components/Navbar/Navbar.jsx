import React, { useState, useContext } from 'react';
import "./Navbar.css";
import { assets } from "../../assets/assets.js";
import { Link } from "react-router-dom"
import { StoreContext } from "../../context/StroreContext"

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("menu")
    const { getTotalCartAmmount } = useContext(StoreContext);
    return (
        <div className="navbar">
            <Link to="/"><h2 className="logo">Jevlis ka?</h2></Link>
            {/* <img src={assets.logo} alt="" className="logo" /> */}
            <ul className="navbar-menu">
                <Link to="/" onClick={() => setMenu("home")} className={menu == "home" ? "active" : ""}>Home</Link>
                <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu == "menu" ? "active" : ""}>Menu</a>
                <a href="#app-download" onClick={() => setMenu("mobile-app")} className={menu == "mobile-app" ? "active" : ""}>Mobile App</a>
                <a href="#footer" onClick={() => setMenu("contact-us")} className={menu == "contact-us" ? "active" : ""}>Contact us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmmount() === 0 ? "" : "dot"}></div>
                </div>
                <button onClick={() => setShowLogin(true)}>Sign in</button>
            </div>
        </div>
    )
}

export default Navbar