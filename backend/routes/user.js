// File: backend/routes/user.js
const express = require('express');
const router = express.Router();

// Import cả 2 middleware
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware'); 
const userController = require('../controllers/userController');

// --- 1. IMPORT UPLOAD MIDDLEWARE ---
const uploadMiddleware = require('../middleware/uploadMiddleware'); 

// --- CÁC ROUTE CỤ THỂ (Profile) ---
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);

// --- 2. THÊM ROUTE UPLOAD AVATAR ---
// POST /api/users/profile/avatar
router.post('/profile/avatar', [authMiddleware, uploadMiddleware.single('avatar')], userController.uploadAvatar);


// --- CÁC ROUTE ADMIN ---
// GET /api/users (Admin xem danh sách)
router.get('/', [authMiddleware, adminMiddleware], userController.getAllUsers);

// DELETE /api/users/:id (Admin xóa)
router.delete('/:id', [authMiddleware, adminMiddleware], userController.deleteUser);

// (Bạn có thể giữ lại 2 route này nếu vẫn cần, nếu không thì xóa đi)
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);

module.exports = router;