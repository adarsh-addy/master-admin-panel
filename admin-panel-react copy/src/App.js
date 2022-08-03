// import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Content1 from './components/Content1';
import Customerdetails from "./components/Customerdetails";
import Engineermaster from "./components/Engineermaster";
import Leadview from "./components/Leadview";
import Navbar from "./components/Navbar/Nav_bar";

function App() {
  return (
    <div className="App">
      {/* <Content1/> */}

      <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Content1/>}/>
        <Route path="/customerdetail" element={<Customerdetails/>}/>
        <Route path="/engineermaster" element={<Engineermaster/>}/>
        <Route path="/leadview" element={<Leadview/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
