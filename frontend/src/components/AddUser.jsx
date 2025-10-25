import React, { useState } from 'react';

// Nhận props 'onUserAdded' từ App.js
function AddUser({ onUserAdded }) {
  // Tạo state để lưu trữ giá trị của 2 ô input
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn form reload lại trang

    // Gọi hàm onUserAdded (đã được truyền từ App.js)
    // và gửi object user mới
    onUserAdded({ name, email });

    // Xóa trắng 2 ô input sau khi thêm
    setName('');
    setEmail('');
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
            required
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}

export default AddUser;