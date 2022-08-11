// import logo from './logo.svg';
import { Routes, Route, useNavigate } from "react-router-dom";
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
  let navigate=useNavigate()
  let [isAuthenticated, setIsauthenticated] = useState(null);
  useEffect(() => {
    setIsauthenticated(localStorage.getItem("isAuthenticated"));
    // if(!isAuthenticated){
    //   navigate("/login")
    // }else{
    //   navigate("/")
    // }
  }, []);
  // let navigate=useNavigate()

  
  
    return (
      <div className="App">
        {/* <Content1/> */}

        
        {/* <Loader/> */}
        {/* {isAuthenticated && <Navbar />} */}
        <Navbar />
        <Routes>
       
        
          <Route path="/" element={<Content1 />} />
          <Route path="/customerdetail" element={<Customerdetails />} />
          <Route path="/engineermaster" element={<Engineermaster />} />
          <Route path="/leadview" element={<Leadview />} />
          <Route path="/place" element={<Place />} />
          <Route path="/city" element={<City />} />
          <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        </Routes>
       
      </div>
    );
 
}

export default App;
