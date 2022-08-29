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
import UserContent from "./components/user/UserContent";
import UserNavbar from "./components/user/UserNavbar/UserNavbar";
import UserCustomerdetails from "./components/user/UserCustomerdetails";
import UserEngineer from "./components/user/UserEngineer";
import UserLeadview from "./components/user/UserLeadview";
import UserPlace from "./components/user/UserPlace";
import UserCity from "./components/user/UserCity";
import Pagenotfound from "./components/Pagenotfound";
import Brand from "./components/Brand"
import UserBrand from "./components/user/UserBrand";
// import Loader from "./components/Loader";

function App() {
  let location=useLocation();
  let token =localStorage.getItem("token") ||null
  let admin =localStorage.getItem("type") ||null
  let user =localStorage.getItem("type") ||null
  console.log(user);
console.log(location.pathname)
const pathName=location.pathname;
let isNavbar=!(pathName.includes('/login') 
              || pathName.includes('/signup') 
              || (pathName.length===1 && pathName[0]==='/') 
              || pathName.includes('/userdashboard'))
let isUserNavbar=!(pathName.includes('/login') 
              || pathName.includes('/signup') 
              || (pathName.length===1 && pathName[0]==='/') 
              || pathName.includes('/content'))
  return (
    <div className="App">
     {/* rendering navbar with condition */}
      {isNavbar && admin==="admin" ?<Navbar />:isUserNavbar && user==="user" ?<UserNavbar/>:null}

      <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/*" element={<Pagenotfound/>} /> 
      {/* this is for error handling for non exist routes */}

      {/* admin section */}
        <Route path="/content" element={token && admin==="admin" ? <Content1 />:<Navigate to="/login" replace/>} />
        <Route path="/customerdetail" element={token && admin==="admin" ?<Customerdetails />:<Navigate to="/login" replace/>} />
        <Route path="/engineermaster" element={token && admin==="admin" ?<Engineermaster />:<Navigate to="/login" replace/>} />
        <Route path="/leadview" element={token && admin==="admin" ?<Leadview />:<Navigate to="/login" replace/>} />
        <Route path="/place" element={token && admin==="admin" ?<Place />:<Navigate to="/login" replace/>} />
        <Route path="/city" element={token && admin==="admin" ?<City />:<Navigate to="/login" replace/>} />
        <Route path="/brand" element={token && admin==="admin" ?<Brand/>:<Navigate to="/login" replace/>} />

        {/* user section */}
        <Route path="/userdashboard/*" element={token && user==="user" ?<UserDashboard/>:<Navigate to="/login" replace/>} />
        <Route path="/usercontent" element={token && user==="user" ?<UserContent/>:<Navigate to="/login" replace/>} />
        <Route path="/usercustomerdetails" element={token && user==="user" ?<UserCustomerdetails/>:<Navigate to="/login" replace/>} />
        <Route path="/userengineer" element={token && user==="user" ?<UserEngineer/>:<Navigate to="/login" replace/>} />
        <Route path="/userleadview" element={token && user==="user" ?<UserLeadview/>:<Navigate to="/login" replace/>} />
        <Route path="/userplace" element={token && user==="user" ?<UserPlace/>:<Navigate to="/login" replace/>} />
        <Route path="/usercity" element={token && user==="user" ?<UserCity/>:<Navigate to="/login" replace/>} />
        <Route path="/userbrand" element={token && user==="user" ?<UserBrand/>:<Navigate to="/login" replace/>} />

        {/* authentication section */}
        <Route path="/login" element={token? <Navigate to="/content" replace/>:<Login />} />
        <Route path="/signup" element={token? <Navigate to="/content" replace/>:<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
