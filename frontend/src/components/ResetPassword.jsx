import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // <-- 1. IMPORT HOOKS

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const { token } = useParams(); // <-- 2. Lấy token từ URL
    const navigate = useNavigate(); // <-- 3. Dùng để chuyển trang

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:3000/api/auth/reset-password/${token}`, { password });
            setMessage(res.data.message);

            // Chuyển về trang login sau 2 giây
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Nhập Mật Khẩu Mới</h2>
            <form onSubmit={handleSubmit}>
                <label>Mật khẩu mới:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Đổi Mật Khẩu</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};
export default ResetPassword;