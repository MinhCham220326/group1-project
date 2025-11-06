// File: backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User.js'); // Đảm bảo đường dẫn đúng

const authMiddleware = async (req, res, next) => {
    let token;
    // Token sẽ được gửi trong header: 'Authorization: Bearer <token>'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 1. Lấy token
            token = req.headers.authorization.split(' ')[1];

            // 2. Xác thực token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Lấy thông tin user (trừ mật khẩu) và gắn vào req
            // req.user sẽ được dùng ở TẤT CẢ các hàm API được bảo vệ
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Chạy hàm API tiếp theo
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Token không hợp lệ, không có quyền truy cập' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Không tìm thấy token, không có quyền truy cập' });
    }
};

module.exports = { authMiddleware };