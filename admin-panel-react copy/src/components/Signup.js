import axios from "axios";
import { React, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/signup.css";

export default function Signup() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [category, setCategory] = useState("");

  async function handleClick(e) {
    e.preventDefault();
    let resp = await axios
      .post("http://localhost:5800/backend/user", {
        name,
        category,
        email,
        password,
      })
      .catch((err) => {
        alert(err.response.data.message);
        // console.log(err.response.data.message);
      });
    if (resp) {
      console.log(resp.data);
      alert(resp.data.message);
    }
  }
  return (
    <div className="signup">
      <div className="login-box">
        <h2>SignUp</h2>
        <a href="/">
          {" "}
          <button className="exit_x">x</button>
        </a>
        <br />
        <form onSubmit={handleClick}>
          <div className="user-box">
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required=""
            />
            <label>Name</label>
          </div>

          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option>Select</option>
            <option>Admin</option>
            <option>User</option>
          </select>
          <br />
          <br />
          <br />
          <div className="user-box">
            <input
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required=""
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required=""
            />
            <label>Password</label>
          </div>

          <div className="user-box">
            <Link to="/login">Account already existed</Link>
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
          <button className="custom-btn btn-12" type="submit">
            <span>Click!</span>
            <span>Signup</span>
          </button>
        </form>
      </div>
    </div>
  );
}
