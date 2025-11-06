import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUserList = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false); // Thêm state để đổi màu

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const res = await axios.get('http://localhost:3000/api/users', config);
            setUsers(res.data);
            setIsError(false);
        } catch (error) {
            // --- SỬA LỖI Ở ĐÂY ---
            setIsError(true);
            if (error.response) {
                // Có phản hồi từ server (ví dụ: 403 Không có quyền Admin)
                setMessage(error.response.data.message);
            } else {
                // Không có phản hồi (ví dụ: Server sập, lỗi mạng)
                setMessage("Lỗi kết nối: Không thể tải danh sách user.");
            }
            // --- HẾT PHẦN SỬA ---
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (!window.confirm("Bạn có chắc muốn xóa user này?")) return;

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const res = await axios.delete(`http://localhost:3000/api/users/${userId}`, config);

            setUsers(res.data); 
            setMessage("Xóa thành công!");
            setIsError(false);

        } catch (error) {
            // --- SỬA LỖI Ở ĐÂY ---
            setIsError(true);
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Lỗi kết nối: Không thể xóa user.");
            }
            // --- HẾT PHẦN SỬA ---
        }
    };

    return (
        <div>
            <h2>Quản lý User (Admin)</h2>
            {/* Thêm style để phân biệt lỗi/thành công */}
            {message && <p style={{ color: isError ? 'red' : 'green' }}>{message}</p>}
            
            <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#3a3f4a' }}>
                        <th style={{ padding: '10px', border: '1px solid #444' }}>Name</th>
                        <th style={{ padding: '10px', border: '1px solid #444' }}>Email</th>
                        <th style={{ padding: '10px', border: '1px solid #444' }}>Role</th>
                        <th style={{ padding: '10px', border: '1px solid #444' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td style={{ padding: '10px', border: '1px solid #444' }}>{user.name}</td>
                            <td style={{ padding: '10px', border: '1px solid #444' }}>{user.email}</td>
                            <td style={{ padding: '10px', border: '1px solid #444' }}>{user.role}</td>
                            <td style={{ padding: '10px', border: '1px solid #444', textAlign: 'center' }}>
                                <button onClick={() => handleDelete(user._id)} style={{color: 'red', background: 'none', border: 'none', cursor: 'pointer'}}>
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default AdminUserList;