// File: backend/routes/user.js
// BAO GỒM CẢ BUỔI 4 (CRUD) VÀ BUỔI 5 (PROFILE)

const express = require('express');
const router = express.Router();

// Import Middleware (cho Buổi 5)
const { authMiddleware } = require('../middleware/authMiddleware'); 

// Import controller
const userController = require('../controllers/userController');

// --- CÁC ROUTE CŨ (BUỔI 4 - DÀNH CHO ADMIN) ---
// (Giữ lại các route cũ: / (GET), / (POST), /:id (PUT), /:id (DELETE))
// Lưu ý: Các route này KHÔNG được bảo vệ, 
// (chúng ta sẽ sửa ở Hoạt động 3: Phân quyền)
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);


// --- BẮT ĐẦU THÊM MỚI (BUỔI 5 - HOẠT ĐỘNG 2) ---

// GET /api/users/profile (Xem thông tin cá nhân)
// Dùng authMiddleware để bảo vệ
router.get('/profile', authMiddleware, userController.getProfile);

// PUT /api/users/profile (Cập nhật thông tin cá nhân)
router.put('/profile', authMiddleware, userController.updateProfile);

// --- KẾT THÚC THÊM MỚI ---

module.exports = router;