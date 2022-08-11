import React from "react";
import {useState} from 'react'
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  let [username,setUsername]=useState('');
  let [password,setPassword]=useState('')
let navigate=useNavigate();
  async function handleSubmit(e){
    console.log("hiiii");
e.preventDefault();
let resp = await axios.post("http://localhost:5800/backend/userAuth", {
      email:username,
      password,
      
    });
    console.log(resp.data);
    if(resp.data.message==="authenticated"){
      localStorage.setItem("isAuthenticated",true)
      navigate("/")
    }else if(resp.data.message==="User does not exist"){
navigate("/signup")
    }
  }
  return (
    <div className="login">
      <div class="login-box">
        <h2>Login</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div class="user-box">
            <input type="text" name="username" required="" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <label>Username</label>
          </div>
          <div class="user-box">
            <input type="password" name="password" required="" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <label>Password</label>
          </div>

          <div class="user-box">
  
  <Link to="/signup">Add new account</Link>
 </div>
          <br />
          <br />
          {/* <a href="/#" >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Login
    </a> */}
          <button class="custom-btn btn-12" type="submit" >
            <span>Click!</span>
            <span>Login</span>
          </button>
        </form>
      </div>
    </div>
  );
}
