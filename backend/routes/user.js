// File: backend/routes/user.js
const express = require('express');
const router = express.Router();

// Import cả 2 middleware
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware'); 

const userController = require('../controllers/userController');

// --- CÁC ROUTE CỤ THỂ (Profile) ---
// (Từ Hoạt động 2 - Chỉ cần đăng nhập)
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);

// --- BẮT ĐẦU CẬP NHẬT (HOẠT ĐỘNG 3) ---

// (API cũ từ Buổi 4 - Giờ chỉ dành cho Admin)
// Cả 2 route này yêu cầu: 1. Đăng nhập (auth) VÀ 2. Là Admin (admin)

// GET /api/users (Admin xem danh sách)
router.get('/', [authMiddleware, adminMiddleware], userController.getAllUsers);

// DELETE /api/users/:id (Admin xóa)
router.delete('/:id', [authMiddleware, adminMiddleware], userController.deleteUser);

// --- KẾT THÚC CẬP NHẬT ---

// (Route POST /api/users/ đã cũ, chúng ta dùng /api/auth/signup)
// router.post('/', userController.createUser); // (Bạn có thể xóa dòng này)

module.exports = router;