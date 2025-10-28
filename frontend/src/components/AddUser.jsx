// File: frontend/src/components/AddUser.jsx
import React, { useState } from 'react';
import axios from 'axios'; // <-- Import axios ở đây

// URL của backend server
const API_URL = "http://localhost:3000/users";

// Bước 1: Nhận props 'fetchUsers' (thay vì 'onUserAdded')
function AddUser({ fetchUsers }) { 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Bước 2: Cập nhật hàm handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn form reload

    // --- VALIDATION BẮT ĐẦU ---
    // 1. Kiểm tra Name trống
    if (!name.trim()) {
      alert("Name không được để trống");
      return; // Dừng hàm
    }

    // 2. Kiểm tra Email (dùng regex đơn giản)
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      alert("Email không hợp lệ (ví dụ: test@gmail.com)");
      return; // Dừng hàm
    }
    // --- VALIDATION KẾT THÚC ---

    // Nếu validation thành công:
    try {
      // Tự gọi API POST để thêm user
      await axios.post(API_URL, { name, email });
      
      // Bảo App.js tải lại danh sách user
      fetchUsers(); 
      
      // Xóa trắng 2 ô input
      setName('');
      setEmail('');

    } catch (error) {
      console.error("Lỗi khi thêm user:", error);
      alert("Có lỗi xảy ra khi thêm user!");
    }
  };

  return (
    <div>
      <h2>Thêm User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}

export default AddUser;