import React from "react";
import "../styles/landingpage.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landing_page">
      <div className="landing-page">
        <div className="container">
          <div className="header-area">
            <div className="logo">
              Admin <b>Website</b>
            </div>
            <ul className="links">
              <li>Home</li>
              <li>About Us</li>
              <li>Work</li>
              <li>Info</li>
              <Link to="/login">
                <li>Login</li>
              </Link>
              <Link to="/signup">
                <li>Signup</li>
              </Link>
            </ul>
          </div>
          <div className="info">
            <h1>Our Values</h1>
            <p>
              Our dedicated emerging technologies "Centers of Excellence" enable
              us to harness the latest technology for delivering business
              capability to our clients.
            </p>
            <a href="http://surl.li/cscfp">
              {" "}
              <button>Reach Us </button>
            </a>
          </div>
          {/* <div className="image">
        <img src="https://i.postimg.cc/65QxYYzh/001234.png" alt='' />
      </div> */}
          <div className="clearfix"></div>
        </div>
      </div>
    </div>
  );
}
