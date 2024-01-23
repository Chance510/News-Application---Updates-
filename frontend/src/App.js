import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from "react";
import { useAuthContext } from './hooks/useAuthContext';
import './App.css';

//Pages and Components
import Home from "./pages/Home";
import SingleNews from "./pages/SingleNews";
import Signup from './pages/Signup';
import Login from './pages/Login';
import MyFeed from './pages/myfeed';
import Navbar from "./Components/Navbar";

//Getting user context

function App() {
  
  const {user} = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/news/:id" element={<SingleNews/>}></Route>
            <Route path="/user/feed" element={<MyFeed />}></Route>
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />}></Route>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
      
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    </div>
  );
}

export default App;
