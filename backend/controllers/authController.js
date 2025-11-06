// File: backend/controllers/authController.js
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- ĐĂNG KÝ (SIGN UP) ---
exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // 1. Kiểm tra email trùng
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email đã tồn tại" });
        }

        // 2. Tạo user mới (mật khẩu sẽ tự động mã hóa nhờ hook ở Model)
        user = new User({
            name,
            email,
            password
            // role sẽ mặc định là 'user'
        });

        // 3. Lưu vào DB
        await user.save();

        res.status(201).json({ message: "Đăng ký thành công" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- ĐĂNG NHẬP (LOGIN) ---
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // 1. Kiểm tra email có tồn tại không
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email hoặc mật khẩu không đúng" });
        }

        // 2. So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Email hoặc mật khẩu không đúng" });
        }

        // 3. Tạo JWT Token
        const payload = {
            id: user._id, // Lấy _id từ MongoDB
            role: user.role
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET, // Lấy từ file .env
            { expiresIn: '1h' } // Token hết hạn sau 1 giờ
        );

        // 4. Trả về token cho client
        res.status(200).json({
            message: "Đăng nhập thành công",
            token: token,
            user: { // Gửi kèm thông tin user (trừ mật khẩu)
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- ĐĂNG XUẤT (LOGOUT) ---
// Logout chủ yếu xử lý ở client. 
// API này chỉ để gọi tượng trưng (hoặc để blacklist token nếu dùng CSDL)
exports.logout = (req, res) => {
    res.status(200).json({ message: "Đăng xuất thành công" });
};