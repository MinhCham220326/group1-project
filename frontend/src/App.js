// File: frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Import các component cũ
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile'; 

// --- 1. IMPORT COMPONENT MỚI (CHO ADMIN) ---
import AdminRoute from './components/AdminRoute'; 
import AdminUserList from './components/AdminUserList'; 

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav /* className="navbar" */>
          {/* Link cũ */}
          <Link to="/signup">Sign Up</Link> | 
          <Link to="/login">Login</Link> | 
          <Link to="/profile">Profile</Link> | 
          
          {/* --- 2. THÊM LINK MỚI (CHO ADMIN) --- */}
          <Link to="/admin/users">Admin Users</Link> | 
          
          <Logout />
        </nav>
        <header className="App-header">
          <Routes>
            {/* Public Routes (Ai cũng xem được) */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes (Chỉ user đã đăng nhập) */}
            <Route path="/profile" element={<Profile />} /> 

            {/* --- 3. THÊM ROUTE ADMIN (ĐƯỢC BẢO VỆ) --- */}
            {/* ADMIN Routes (Phải là Admin) */}
            <Route path="/admin/users" element={<AdminRoute />}> {/* Bọc ngoài */}
                <Route path="" element={<AdminUserList />} /> {/* Trang con */}
            </Route>
            {/* --- HẾT PHẦN THÊM --- */}

          </Routes>
        </header>
      </div>
    </Router>
  );
}
export default App;