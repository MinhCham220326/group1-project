// File: frontend/src/components/Profile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    // --- STATE QUẢN LÝ DỮ LIỆU ---
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    // --- STATE CHO AVATAR ---
    const [avatarUrl, setAvatarUrl] = useState('');
    const [file, setFile] = useState(null);

    // --- LẤY TOKEN CONFIG ---
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

    // --- LẤY THÔNG TIN NGƯỜI DÙNG ---
    useEffect(() => {
        const fetchProfile = async () => {
            const config = getTokenConfig();
            if (!config) return;

            try {
                const res = await axios.get('http://localhost:3000/api/users/profile', config);
                setName(res.data.name);
                setEmail(res.data.email);
                setAvatarUrl(res.data.avatar || ''); // có thể rỗng nếu chưa có avatar
            } catch (error) {
                setMessage(error.response?.data?.message || "Lỗi khi tải thông tin người dùng");
            }
        };

        fetchProfile();
    }, []);

    // --- CẬP NHẬT THÔNG TIN NGƯỜI DÙNG ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = getTokenConfig();
        if (!config) return;

        const updatedData = { name, email };
        if (password) updatedData.password = password;

        try {
            const res = await axios.put('http://localhost:3000/api/users/profile', updatedData, config);
            setName(res.data.name);
            setEmail(res.data.email);
            setPassword('');
            setMessage("✅ Cập nhật thông tin thành công!");
        } catch (error) {
            setMessage(error.response?.data?.message || "❌ Lỗi khi cập nhật thông tin");
        }
    };

    // --- UPLOAD ẢNH ĐẠI DIỆN ---
    const handleAvatarUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage("⚠️ Vui lòng chọn 1 file ảnh trước khi upload");
            return;
        }

        const config = getTokenConfig();
        if (!config) return;

        const formData = new FormData();
        formData.append('avatar', file); // 'avatar' phải khớp với middleware ở backend

        try {
            const res = await axios.post('http://localhost:3000/api/users/profile/avatar', formData, config);
            setAvatarUrl(res.data.avatarUrl);
            setMessage("✅ Cập nhật ảnh đại diện thành công!");
        } catch (error) {
            setMessage(error.response?.data?.message || "❌ Lỗi khi upload ảnh");
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
            <h2>Thông tin cá nhân</h2>

            {/* --- ẢNH ĐẠI DIỆN --- */}
            {avatarUrl ? (
                <img
                    src={avatarUrl}
                    alt="Avatar"
                    style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        marginTop: '10px'
                    }}
                />
            ) : (
                <p>Chưa có ảnh đại diện</p>
            )}

            {/* --- FORM UPLOAD ẢNH --- */}
            <form onSubmit={handleAvatarUpload} style={{ margin: '20px 0' }}>
                <label>Đổi Avatar:</label><br />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ marginTop: '10px' }}
                />
                <br />
                <button
                    type="submit"
                    style={{ marginTop: '10px', padding: '6px 14px', cursor: 'pointer' }}
                >
                    Upload
                </button>
            </form>

            <hr />

            {/* --- FORM CẬP NHẬT THÔNG TIN --- */}
            <h3 style={{ marginTop: '20px' }}>Cập nhật thông tin</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tên:</label><br />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Email:</label><br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Mật khẩu mới:</label><br />
                    <input
                        type="password"
                        placeholder="Để trống nếu không muốn đổi"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    style={{ marginTop: '10px', padding: '6px 14px', cursor: 'pointer' }}
                >
                    Cập nhật thông tin
                </button>
            </form>

            {message && (
                <p style={{ marginTop: '15px', color: message.startsWith("✅") ? "green" : "red" }}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default Profile;
