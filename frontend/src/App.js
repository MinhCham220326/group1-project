import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Import các component cũ
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile'; 

// Import component Admin
import AdminRoute from './components/AdminRoute'; 
import AdminUserList from './components/AdminUserList'; 

// --- 1. IMPORT COMPONENT MỚI (CHO HOẠT ĐỘNG 4) ---
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

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
          <Link to="/admin/users">Admin Users</Link> | 
          
          {/* --- 2. THÊM LINK MỚI (CHO HOẠT ĐỘNG 4) --- */}
          <Link to="/forgot-password">Quên mật khẩu?</Link> |

          <Logout />
        </nav>
        <header className="App-header">
          <Routes>
            {/* Public Routes (Ai cũng xem được) */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes (Chỉ user đã đăng nhập) */}
            <Route path="/profile" element={<Profile />} /> 

            {/* ADMIN Routes (Phải là Admin) */}
            <Route path="/admin/users" element={<AdminRoute />}> 
                <Route path="" element={<AdminUserList />} />
            </Route>

            {/* --- 3. THÊM ROUTE MỚI (CHO HOẠT ĐỘNG 4) --- */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            {/* --- HẾT PHẦN THÊM --- */}

          </Routes>
        </header>
      </div>
    </Router>
  );
}
export default App;