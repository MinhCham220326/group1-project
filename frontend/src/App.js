// File: frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile'; // <-- 1. IMPORT

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav /* className="navbar" */>
          <Link to="/signup">Sign Up</Link> | 
          <Link to="/login">Login</Link> | 
          <Link to="/profile">Profile</Link> | {/* <-- 2. THÊM LINK */}
          <Logout />
        </nav>
        <header className="App-header">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} /> {/* <-- 3. THÊM ROUTE */}
          </Routes>
        </header>
      </div>
    </Router>
  );
}
export default App;