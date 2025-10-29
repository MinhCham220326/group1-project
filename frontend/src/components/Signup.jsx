// File: frontend/src/components/Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false); // Thêm state để biết là lỗi hay thành công

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/auth/signup', { name, email, password });
            setMessage(res.data.message); // "Đăng ký thành công"
            setIsError(false);
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
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input 
                        type="text" 
                        className="form-input"
                        placeholder="Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} required 
                    />
                </div>
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
                <button type="submit" className="btn">Sign Up</button>
            </form>
            {/* Hiển thị thông báo với style */}
            {message && <p className={isError ? 'message message-error' : 'message'}>{message}</p>}
        </div>
    );
};
export default Signup;