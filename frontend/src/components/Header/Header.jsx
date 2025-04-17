import React from "react";
import "./Header.css";

const Header = () => {
    return (
        <section className="hero">
          <div className="hero-content">
            <div className="text-section">
              <h1>
                Craving? <br />
                <span className="highlight">Order your favorite food</span> in minutes
              </h1>
              <p>
                Get delicious meals delivered fast from your local restaurants. Fresh, hot, and right at your doorstep.
              </p>
              <button className="order-btn">Order Now</button>
            </div>
          </div>
        </section>
      );
};

export default Header;
