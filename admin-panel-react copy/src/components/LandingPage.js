import React from "react";
import "../styles/landingpage.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import ThemeProvider from 'react-bootstrap/ThemeProvider'

export default function LandingPage() {
  let navigate = useNavigate();
  function logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    navigate("/login")
  
  }

  return (
    <ThemeProvider
  breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
  minBreakpoint="xxs"
>
    <div className="landing_page">
      <div className="landing-page container-{width:100%}">
        <div className="container">
          <div className="header-area">
            <div className="logo">
              Admin &nbsp;<b>Website</b>
            </div>
            <ul className="links">
              <li className="link1">Home</li>
              <li className="link1">About Us</li>
              <li className="link1">Work</li>
              <li className="link1">Info</li>
              <button onClick={logOut}>
                <li>Login</li>
              </button>
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
              <button className="btn">Reach Us </button>
            </a>
          </div>
          {/* <div className="image">
        <img src="https://i.postimg.cc/65QxYYzh/001234.png" alt='' />
      </div> */}
          <div className="clearfix"></div>
        </div>
      </div>
    </div>
    </ThemeProvider>
  );
}
