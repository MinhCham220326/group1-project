// File: frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import AddUser from './components/AddUser'; 
import './App.css';

const API_URL = "http://localhost:3000/users";

function App() {
  const [users, setUsers] = useState([]);

  // 1. GET (Hàm này giữ nguyên)
  const fetchUsers = () => {
    axios.get(API_URL)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error("Lỗi khi lấy dữ liệu users:", error));
  };

  // 2. useEffect (Hàm này giữ nguyên)
  useEffect(() => {
    fetchUsers(); 
  }, []);

  // --- XÓA HÀM NÀY ---
  // const handleUserAdded = (newUser) => { ... }; (Xóa hàm này)

  // (Hàm handleDelete và handleEdit từ Hoạt động 7 giữ nguyên)
  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error("Lỗi khi xóa user:", error));
  };

  const handleEdit = (user) => {
    console.log("Chuẩn bị sửa user:", user);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Quản lý User (React + Node)</h1>
        
        {/* --- THAY ĐỔI Ở ĐÂY --- */}
        {/* Không truyền 'onUserAdded' nữa */}
        {/* Thay vào đó, truyền 'fetchUsers' xuống */}
        <AddUser fetchUsers={fetchUsers} />
        
        <UserList 
          users={users} 
          handleDelete={handleDelete}
          handleEdit={handleEdit} 
        />
      </header>
    </div>
  );
}

export default App;