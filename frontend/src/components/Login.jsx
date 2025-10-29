// File: frontend/src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
            setMessage(res.data.message); // "Đăng nhập thành công"
            setIsError(false);
            localStorage.setItem('token', res.data.token);
            // (Sau này bạn sẽ dùng 'useNavigate' để chuyển trang)
        } catch (error) {
        setIsError(true); // Đặt trạng thái lỗi
        
        // KIỂM TRA LỖI:
        if (error.response) {
            // Có phản hồi từ server (ví dụ: Email trùng, sai pass)
            setMessage(error.response.data.message);
        } else {
            // Không có phản hồi (ví dụ: Server sập, lỗi mạng)
            setMessage("Lỗi kết nối: Không thể kết nối đến server.");
        }
            }
        };

    return (
        <div className="form-container"> {/* Thêm class bọc ngoài */}
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        className="form-input"
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} required 
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        className="form-input"
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} required 
                    />
                </div>
                <button type="submit" className="btn">Login</button>
            </form>
            {/* Hiển thị thông báo với style */}
            {message && <p className={isError ? 'message message-error' : 'message'}>{message}</p>}
        </div>
    );
};
export default Login;