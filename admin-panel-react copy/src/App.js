// import logo from './logo.svg';
import { Routes, Route, Navigate,useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
import "./App.css";
import Content1 from "./components/Content1";
import Customerdetails from "./components/Customerdetails";
import Engineermaster from "./components/Engineermaster";
import Leadview from "./components/Leadview";
import Navbar from "./components/Navbar/Nav_bar";
import Place from "./components/Place";
import City from "./components/City";
import Login from "./components/Login";
import Signup from "./components/Signup";
import LandingPage from "./components/LandingPage";
import UserDashboard from "./components/user/UserDashboard";
// import Loader from "./components/Loader";

function App() {
  let location=useLocation();
  let token =localStorage.getItem("token") ||null
console.log(location.pathname)
const pathName=location.pathname;
  return (
    <div className="App">
     
      {!(pathName.includes('/login') ||pathName.includes('/signup') || (pathName.length===1 && pathName[0]==='/') ) ?<Navbar />:null}
      <Routes>
      <Route path="/" element={<LandingPage/>} />
        <Route path="/content" element={token?<Content1 />:<Navigate to="/login" replace/>} />
        <Route path="/customerdetail" element={token?<Customerdetails />:<Navigate to="/login" replace/>} />
        <Route path="/engineermaster" element={token?<Engineermaster />:<Navigate to="/login" replace/>} />
        <Route path="/leadview" element={token?<Leadview />:<Navigate to="/login" replace/>} />
        <Route path="/place" element={token?<Place />:<Navigate to="/login" replace/>} />
        <Route path="/city" element={token?<City />:<Navigate to="/login" replace/>} />
        <Route path="/userdashboard" element={token?<UserDashboard/>:<Navigate to="/login" replace/>} />
        
        <Route path="/login" element={token? <Navigate to="/content" replace/>:<Login />} />
        <Route path="/signup" element={token? <Navigate to="/content" replace/>:<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
