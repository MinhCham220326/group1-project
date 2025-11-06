// File: backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User.js'); 

// HÀM CŨ (Hoạt động 2) - Dùng để kiểm tra đăng nhập
const authMiddleware = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Token không hợp lệ' });
        }
    }
    if (!token) {
        res.status(401).json({ message: 'Không tìm thấy token' });
    }
};

// --- BẮT ĐẦU THÊM MỚI (HOẠT ĐỘNG 3) ---

// HÀM MỚI - Dùng để kiểm tra Admin
// Hàm này sẽ chạy SAU KHI authMiddleware chạy
const adminMiddleware = (req, res, next) => {
    // req.user đã được gán bởi authMiddleware
    if (req.user && req.user.role === 'admin') {
        next(); // Là Admin, cho phép đi tiếp
    } else {
        // Không phải Admin
        res.status(403).json({ message: "Không có quyền Admin" }); // 403 = Forbidden (Cấm)
    }
};
// --- KẾT THÚC THÊM MỚI ---

module.exports = { 
    authMiddleware, 
    adminMiddleware // <-- Export hàm mới
};