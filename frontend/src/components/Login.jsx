import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [token, setToken] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
            setMessage(res.data.message); // "Đăng nhập thành công"
            setIsError(false);

            // --- CẬP NHẬT Ở ĐÂY (THEO YÊU CẦU) ---
            localStorage.setItem('token', res.data.token);
            // Lưu cả user (chứa role) vào localStorage
            localStorage.setItem('user', JSON.stringify(res.data.user)); 
            // --- HẾT CẬP NHẬT ---

            setToken(res.data.token); // Lưu token vào state để hiển thị

        } catch (error) {
            setIsError(true); 
            setToken(''); // Nếu đăng nhập lỗi, xóa token cũ

            // --- CẬP NHẬT Ở ĐÂY (THEO YÊU CẦU) ---
            localStorage.removeItem('token'); // Xóa token cũ nếu lỗi
            localStorage.removeItem('user');  // Xóa user cũ nếu lỗi
            // --- HẾT CẬP NHẬT ---
            
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

            {/* Hiển thị Token */}
            {token && (
                <div style={{ marginTop: '1rem', textAlign: 'left' }}>
                    <p className="message">JWT Token:</p>
                    <p style={{ wordBreak: 'break-all', fontSize: '0.8rem', backgroundColor: '#282c34', padding: '10px', borderRadius: '5px' }}>
                        {token}
                    </p>
                </div>
            )}
        </div>
    );
};
export default Login;