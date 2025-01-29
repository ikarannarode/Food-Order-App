import React from 'react'
import "./Footer.css"
import { assets } from "../../assets/assets.js"
const Footer = () => {
    return (
        <div className="footer" id="footer">
            <div className="footer-content">
                <div className="footer-content-left">
                    <h2 className="logo">Jevlis ka?</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere repellendus alias dolor, earum eius maiores commodi ipsam laborum modi iste autem doloribus ipsa similique non veritatis dicta at? Minus, exercitationem.</p>
                    <div className="footer-social-icon">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy& Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+12-3254-4343</li>
                        <li>contact@jevliska.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">Copyright 2024 &copy; JevlisKa?.com - All Right Reserved.</p>
        </div>
    )
}

export default Footer