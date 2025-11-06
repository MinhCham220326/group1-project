// File: backend/routes/user.js
const express = require('express');
const router = express.Router();

// Import Middleware
const { authMiddleware } = require('../middleware/authMiddleware'); 
// Import controller
const userController = require('../controllers/userController');


// --- CÁC ROUTE CỤ THỂ (Specific) PHẢI ĐẶT TRƯỚC ---
// (Hoạt động 5.2 - Profile)

// GET /api/users/profile (Xem thông tin cá nhân)
router.get('/profile', authMiddleware, userController.getProfile);

// PUT /api/users/profile (Cập nhật thông tin cá nhân)
router.put('/profile', authMiddleware, userController.updateProfile);


// --- CÁC ROUTE CHUNG (Generic) PHẢI ĐẶT SAU ---

// (Hoạt động 4/7 - Admin CRUD)
// GET /api/users/
router.get('/', userController.getAllUsers); 

// POST /api/users/
// (Lưu ý: API này đã cũ, nên dùng /api/auth/signup)
router.post('/', userController.createUser); 

// PUT /api/users/:id (Admin sửa)
router.put('/:id', userController.updateUser);

// DELETE /api/users/:id (Admin xóa)
router.delete('/:id', userController.deleteUser);


module.exports = router;