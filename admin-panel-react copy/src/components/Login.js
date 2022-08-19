import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [category, setCategory] = useState("");

  let navigate = useNavigate();
  async function handleSubmit(e) {
    console.log("hiiii");
    e.preventDefault();
    let resp = await axios
      .post("http://localhost:5800/backend/userAuth", {
        email: username,
        category,
        password,
      })
      .catch((err) => {
        alert(err.response.data.message);
        // console.log(err.response.data.message);
      });
    if (resp) {
      console.log(resp.data);
      //  console.log(resp.data.message.split(" ")[0]);
      alert(resp.data.message);
    }

    if (resp.data.message === "admin_authenticated") {
      // localStorage.setItem("isAuthenticated",true)
      localStorage.setItem("token", resp.data.accessToken);
      localStorage.setItem("type", "admin");
      // let res= await axios.get("http://localhost:5800/backend/validate", {//not required to validate
      //   headers: {
      //     "x-access-token": localStorage.getItem("token")
      //   }
      // })
      navigate("/content");
    } else if (resp.data.message === "user_Authenticated") {
      localStorage.setItem("token", resp.data.accessToken);
      localStorage.setItem("type", "user");
      navigate("/userdashboard");
    } else if (resp.data.message === "User does not exist") {
      navigate("/signup");
    }
  }
  return (
    <div className="login">
      <div className="login-box">
        <h2>Login</h2>
        <a href="/">
          {" "}
          <button className="exit_x">x</button>
        </a>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              name="username"
              required=""
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Username</label>
          </div>

          <div className="select_opt">
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option className="opt_li">Select</option>
              <option className="opt_li">Admin</option>
              <option className="opt_li">User</option>
            </select>
          </div>
          <br />
          <br />
          <br />
          <div className="user-box">
            <input
              type="password"
              name="password"
              required=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>

          <div className="user-box">
            <div className="login_link">
              <Link to="/signup">Registration for new account</Link>
            </div>
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
            <span>Login</span>
          </button>
        </form>
      </div>
    </div>
  );
}
