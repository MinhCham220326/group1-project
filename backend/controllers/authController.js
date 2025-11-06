// File: backend/controllers/authController.js
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../config/nodemailer'); // <-- 1. ĐÃ THÊM
const crypto = require('crypto'); // <-- 2. ĐÃ THÊM

// --- ĐĂNG KÝ (SIGN UP) ---
exports.signup = async (req, res) => {
    // (Code gốc của bạn giữ nguyên)
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email đã tồn tại" });
        }
        user = new User({
            name,
            email,
            password
        });
        await user.save();
        res.status(201).json({ message: "Đăng ký thành công" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- ĐĂNG NHẬP (LOGIN) ---
exports.login = async (req, res) => {
    // (Code gốc của bạn giữ nguyên)
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email hoặc mật khẩu không đúng" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Email hoặc mật khẩu không đúng" });
        }
        const payload = {
            id: user._id,
            role: user.role
        };
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({
            message: "Đăng nhập thành công",
            token: token,
            user: {
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
exports.logout = (req, res) => {
    // (Code gốc của bạn giữ nguyên)
    res.status(200).json({ message: "Đăng xuất thành công" });
};


// --- BẮT ĐẦU THÊM MỚI (CHỨC NĂNG 9) ---

// API: /forgot-password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            // Chú ý: Vẫn trả về 200 để bảo mật, tránh lộ email nào đã đăng ký
            return res.status(200).json({ message: "Email reset đã được gửi (nếu email tồn tại)" });
        }

        // 1. Lấy token thô (đã tạo ở Model)
        const resetToken = user.getResetPasswordToken(); // Giả sử Model đã có hàm này
        await user.save({ validateBeforeSave: false }); 

        // 2. Tạo URL reset (trỏ về trang React)
        const resetUrl = `http://localhost:3001/reset-password/${resetToken}`;

        // 3. Tạo nội dung email
        const message = `Bạn nhận được email này vì bạn (hoặc ai đó) đã yêu cầu reset mật khẩu. Vui lòng click vào link sau để đặt mật khẩu mới: \n\n ${resetUrl} \n\n (Link có hạn 10 phút)`;

        // 4. Gửi email
        await sendEmail({
            email: user.email,
            subject: 'Yêu cầu Reset Mật khẩu',
            message: message
        });

        res.status(200).json({ message: "Email reset đã được gửi" });

    } catch (error) {
        // Xóa token nếu có lỗi
        if (user) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });
        }
        res.status(500).json({ message: error.message });
    }
};

// API: /reset-password/:token
exports.resetPassword = async (req, res) => {
    try {
        // 1. Lấy token thô từ URL
        const rawToken = req.params.token;
        
        // 2. Băm token thô lại để so sánh với CSDL
        const hashedToken = crypto
            .createHash('sha256')
            .update(rawToken)
            .digest('hex');

        // 3. Tìm user bằng token đã băm VÀ thời gian chưa hết hạn
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() } // $gt = greater than
        });

        if (!user) {
            return res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
        }

        // 4. Đặt mật khẩu mới
        user.password = req.body.password;
        // Xóa token (để không dùng lại được)
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        
        await user.save(); // (Hook pre-save sẽ tự mã hóa pass mới)

        res.status(200).json({ message: "Đổi mật khẩu thành công" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// --- KẾT THÚC THÊM MỚI ---

// Cập nhật module.exports
module.exports = {
    signup,
    login,
    logout,
    forgotPassword, // <-- ĐÃ THÊM
    resetPassword   // <-- ĐÃ THÊM
};