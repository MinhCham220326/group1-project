// File: frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

// --- THÊM 3 DÒNG NÀY ---
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
// --- HẾT PHẦN THÊM ---

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar"> 
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
          <Logout /> {/* Lỗi ở đây */}
        </nav>
        <header className="App-header">
          <Routes>
            <Route path="/signup" element={<Signup />} /> {/* Lỗi ở đây */}
            <Route path="/login" element={<Login />} /> {/* Lỗi ở đây */}
          </Routes>
        </header>
      </div>
    </Router>
  );
}
export default App;