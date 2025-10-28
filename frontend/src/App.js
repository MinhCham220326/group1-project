import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import './App.css';

// URL của backend server
const API_URL = "http://localhost:3000/users";

function App() {
  // State để lưu danh sách users
  const [users, setUsers] = useState([]);

  // Hàm để gọi API GET (lấy tất cả user)
  const fetchUsers = () => {
    axios.get(API_URL)
      .then(response => {
        // Cập nhật state 'users' với dữ liệu từ API
        setUsers(response.data);
      })
      .catch(error => console.error("Lỗi khi lấy dữ liệu users:", error));
  };

  // useEffect sẽ chạy 1 lần khi component được tải
  // Nó sẽ gọi hàm fetchUsers() để lấy data ban đầu
  useEffect(() => {
    fetchUsers();
  }, []); // Dấu [] rỗng nghĩa là chỉ chạy 1 lần

  // Hàm để xử lý việc thêm user mới,
  // Hàm này sẽ được truyền xuống component AddUser
  const handleUserAdded = (newUser) => {
    console.log("--- TEST FRONTEND: DA GOI HAM handleUserAdded ---");
    // Gọi API POST để tạo user mới
    axios.post(API_URL, newUser)
      .then(response => {
        // Backend (từ Hoạt động 3) trả về danh sách user MỚI NHẤT
        // Cập nhật state với danh sách mới đó
        setUsers(response.data);
      })
      .catch(error => console.error("Lỗi khi thêm user:", error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Quản lý User (React + Node)</h1>
        {/* Component Form thêm User */}
        <AddUser onUserAdded={handleUserAdded} />
        
        {/* Component Danh sách User */}
        <UserList users={users} />
      </header>
    </div>
  );
}

export default App;