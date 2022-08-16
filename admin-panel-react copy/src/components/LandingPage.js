import React from 'react'
import '../styles/landingpage.css'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className='landing_page'>
        <div className="landing-page">
    <div className="container">
      <div className="header-area">
        <div className="logo">Your <b>Website</b></div>
        <ul className="links">
          <li>Home</li>
          <li>About Us</li>
          <li>Work</li>
          <li>Info</li>
      <Link to='/login' ><li>Login</li></Link>
      <Link to='/signup' ><li>Signup</li></Link>
        </ul>
      </div>
      <div className="info">
        <h1>Looking For Inspiration</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus odit nihil ullam nesciunt quidem iste, Repellendus odit nihil</p>
        <button>Button name</button>
      </div>
      <div className="image">
        <img src="https://i.postimg.cc/65QxYYzh/001234.png" alt='' />
      </div>
      <div className="clearfix"></div>
    </div>
  </div></div>
  )
}
