import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/auth/forgot-password', { email });
            setMessage(res.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Quên Mật Khẩu</h2>
            <form onSubmit={handleSubmit}>
                <label>Nhập Email của bạn:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button type="submit">Gửi Email Reset</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};
export default ForgotPassword;