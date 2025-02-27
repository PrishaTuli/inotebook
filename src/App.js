// import logo from './logo.svg';
import './App.css';
import{BrowserRouter, Routes,Route}from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Notestate from './context/notes/Notestate';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import {useState} from 'react';
function App() {
  const [alert,setalert]= useState(null);
  const showalert=(message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setalert(null);
    },1500);
  }
  return (
    <>
    <Notestate>
    <BrowserRouter>
    <Navbar/>
    <Alert alert={alert}/>
     <div className="container">
      <Routes>
        <Route path="/" element={<Home showalert={showalert}/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/login" element={<Login showalert={showalert}/>}/>
        <Route path="/signup" element={<Signup showalert={showalert}/>}/>
      </Routes>
      </div>
      </BrowserRouter>
      </Notestate>
    </>
  );
}

export default App;
