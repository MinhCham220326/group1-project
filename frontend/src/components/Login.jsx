import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    
    // --- 1. THÊM DÒNG NÀY ---
    // Tạo state để lưu token và hiển thị
    const [token, setToken] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
            setMessage(res.data.message); // "Đăng nhập thành công"
            setIsError(false);
            localStorage.setItem('token', res.data.token);
            
            // --- 2. THÊM DÒNG NÀY ---
            // Lưu token vào state để hiển thị
            setToken(res.data.token); 

        } catch (error) {
            setIsError(true); 
            setToken(''); // Nếu đăng nhập lỗi, xóa token cũ
            
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Lỗi kết nối: Không thể kết nối đến server.");
            }
        }
    };

    return (
        <div className="form-container"> 
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
            
            {/* Hiển thị thông báo (lỗi hoặc thành công) */}
            {message && <p className={isError ? 'message message-error' : 'message'}>{message}</p>}

            {/* --- 3. THÊM KHỐI NÀY ĐỂ HIỂN THỊ TOKEN --- */}
            {/* Nếu state 'token' có giá trị, hiển thị nó ra */}
            {token && (
                <div style={{ marginTop: '1rem', textAlign: 'left' }}>
                    <p className="message">JWT Token:</p>
                    <p style={{ wordBreak: 'break-all', fontSize: '0.8rem', backgroundColor: '#282c34', padding: '10px', borderRadius: '5px' }}>
                        {token}
                    </p>
                </div>
            )}
            {/* --- HẾT PHẦN THÊM --- */}
        </div>
    );
};
export default Login;