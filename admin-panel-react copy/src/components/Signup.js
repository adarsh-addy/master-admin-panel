import axios from 'axios';
import {React,useState} from 'react'
import { Link } from 'react-router-dom';


export default function Signup() {
  let [name,setName]=useState('')
  let [email,setEmail]=useState('')
  let [password,setPassword]=useState('')

  async function handleClick(e){
    e.preventDefault();
    let resp= await axios.post("http://localhost:5800/backend/user", {
      name,
      email,
      password,
      
    });
    console.log(resp.data);
  }
  return (
    <div className='signup'>
       

       <div class="login-box">
  <h2>SignUp</h2><br/>
  <form onSubmit={handleClick}>
  <div class="user-box">
      <input type="text" name="name" onChange={(e)=>setName(e.target.value)} value={name} required="" />
      <label>Name</label>
    </div>
    <div class="user-box">
      <input type="text" name="email" onChange={(e)=>setEmail(e.target.value)} value={email} required="" />
      <label>Email</label>
    </div>
    <div class="user-box">
      <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)} value={password} required="" />
      <label>Password</label>
    </div>
    
    <div class="user-box">
  
           <Link to="/login">Account already existed</Link>
          </div>
    <br/>
    <br/>
    {/* <a href="/#" >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Login
    </a> */}
    <button class="custom-btn btn-12" type='submit' ><span>Click!</span><span>Signup</span></button>
  </form>
</div>

        </div>
  )
}
