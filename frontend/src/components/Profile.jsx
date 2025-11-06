// File: frontend/src/components/Profile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    // State cho dữ liệu form
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // Chỉ dùng để GỬI pass MỚI

    // State cho thông báo
    const [message, setMessage] = useState('');

    // Hàm helper để lấy config (gắn token)
    const getTokenConfig = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setMessage("Lỗi: Bạn chưa đăng nhập");
            return null;
        }
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    };

    // --- CHỨC NĂNG 5: XEM THÔNG TIN (GET) ---
    useEffect(() => {
        const fetchProfile = async () => {
            const config = getTokenConfig();
            if (!config) return; // Dừng nếu không có token

            try {
                // API URL: http://localhost:3000/api/users/profile
                const res = await axios.get('http://localhost:3000/api/users/profile', config);

                // Điền dữ liệu vào form
                setName(res.data.name);
                setEmail(res.data.email);

            } catch (error) {
                setMessage(error.response.data.message || "Lỗi khi tải thông tin");
            }
        };

        fetchProfile();
    }, []); // [] = Chạy 1 lần khi tải trang

    // --- CHỨC NĂNG 4: CẬP NHẬT (PUT) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = getTokenConfig();
        if (!config) return;

        const updatedData = { name, email };

        // Chỉ thêm 'password' vào data gửi đi nếu người dùng nhập mật khẩu mới
        if (password) {
            updatedData.password = password;
        }

        try {
            // API URL: http://localhost:3000/api/users/profile
            const res = await axios.put('http://localhost:3000/api/users/profile', updatedData, config);

            // Cập nhật lại form với tên/email mới (nếu có)
            setName(res.data.name);
            setEmail(res.data.email);
            setPassword(''); // Xóa ô mật khẩu
            setMessage("Cập nhật thành công!");

        } catch (error) {
            setMessage(error.response.data.message || "Lỗi khi cập nhật");
        }
    };

    return (
        // (Bạn có thể dùng className="form-container" như hướng dẫn trước)
        <div>
            <h2>Thông tin cá nhân</h2>
            <form onSubmit={handleSubmit}>
                <div /* className="form-group" */>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div /* className="form-group" */>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div /* className="form-group" */>
                    <label>Password Mới:</label>
                    <input
                        type="password"
                        placeholder="Để trống nếu không muốn đổi"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" /* className="btn" */>Cập nhật</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Profile;