// import logo from './logo.svg';
import { Routes, Route, Navigate,useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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
// import Loader from "./components/Loader";

function App() {
  let location=useLocation();
  let token =localStorage.getItem("token") ||null
console.log(location.pathname)
const pathName=location.pathname;
  return (
    <div className="App">
      
      {!(pathName.includes('/login') ||pathName.includes('/signup')) ?<Navbar />:null}
      <Routes>
        <Route path="/" element={token?<Content1 />:<Navigate to="/login" replace/>} />
        <Route path="/customerdetail" element={token?<Customerdetails />:<Navigate to="/login" replace/>} />
        <Route path="/engineermaster" element={token?<Engineermaster />:<Navigate to="/login" replace/>} />
        <Route path="/leadview" element={token?<Leadview />:<Navigate to="/login" replace/>} />
        <Route path="/place" element={token?<Place />:<Navigate to="/login" replace/>} />
        <Route path="/city" element={token?<City />:<Navigate to="/login" replace/>} />
        
        <Route path="/login" element={token? <Navigate to="/" replace/>:<Login />} />
        <Route path="/signup" element={token? <Navigate to="/" replace/>:<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
