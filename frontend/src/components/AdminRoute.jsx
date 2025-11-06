// File: frontend/src/components/AdminRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');

    let user = null;
    if (userString) {
        user = JSON.parse(userString);
    }

    // Kiểm tra 3 điều: Có token, có user, VÀ user.role == 'admin'
    if (token && user && user.role === 'admin') {
        return <Outlet />; // Cho phép vào
    } else {
        // Đẩy về trang Login
        return <Navigate to="/login" />;
    }
};

export default AdminRoute;