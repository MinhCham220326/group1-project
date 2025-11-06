// File: frontend/src/components/AdminUserList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUserList = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            // Gọi API Admin (GET /api/users)
            const res = await axios.get('http://localhost:3000/api/users', config);
            setUsers(res.data);
        } catch (error) {
            setMessage(error.response.data.message || "Lỗi tải danh sách");
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

            // Gọi API Admin (DELETE /api/users/:id)
            const res = await axios.delete(`http://localhost:3000/api/users/${userId}`, config);

            // Backend trả về danh sách MỚI NHẤT
            setUsers(res.data); 
            setMessage("Xóa thành công!");

        } catch (error) {
            setMessage(error.response.data.message || "Lỗi khi xóa");
        }
    };

    return (
        <div>
            <h2>Quản lý User (Admin)</h2>
            {message && <p>{message}</p>}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => handleDelete(user._id)} style={{color: 'red'}}>
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