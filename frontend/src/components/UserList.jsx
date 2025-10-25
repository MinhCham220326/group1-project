import React from 'react';

// Nhận props 'users' từ App.js
function UserList({ users }) {
  return (
    <div>
      <h2>Danh sách User</h2>
      <ul>
        {/* Dùng .map để lặp qua mảng users và hiển thị */}
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;