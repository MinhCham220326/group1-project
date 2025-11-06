import React from 'react';

const Logout = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        alert('Đã đăng xuất!');
    };

    return (
        // Thêm class cho nút Logout
        <button onClick={handleLogout} className="btn-logout">
            Log Out
        </button>
    );
};
export default Logout;