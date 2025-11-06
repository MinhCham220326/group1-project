// File: backend/controllers/authController.js
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../config/nodemailer');
const crypto = require('crypto');

// --- ĐĂNG KÝ (SIGN UP) ---
const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email đã tồn tại" });
        }
        user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: "Đăng ký thành công" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- ĐĂNG NHẬP (LOGIN) ---
const login = async (req, res) => {
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

        const payload = { id: user._id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: "Đăng nhập thành công",
            token,
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
const logout = (req, res) => {
    res.status(200).json({ message: "Đăng xuất thành công" });
};

// --- QUÊN MẬT KHẨU (FORGOT PASSWORD) ---
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(200).json({ message: "Email reset đã được gửi (nếu email tồn tại)" });
        }

        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });

        const resetUrl = `http://localhost:3001/reset-password/${resetToken}`;
        const message = `Bạn nhận được email này vì bạn (hoặc ai đó) đã yêu cầu reset mật khẩu. 
        Vui lòng click vào link sau để đặt mật khẩu mới: 
        \n\n ${resetUrl} \n\n (Link có hạn 10 phút)`;

        await sendEmail({
            email: user.email,
            subject: 'Yêu cầu Reset Mật khẩu',
            message
        });

        res.status(200).json({ message: "Email reset đã được gửi" });
    } catch (error) {
        if (user) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });
        }
        res.status(500).json({ message: error.message });
    }
};

// --- ĐẶT LẠI MẬT KHẨU (RESET PASSWORD) ---
const resetPassword = async (req, res) => {
    try {
        const rawToken = req.params.token;

        const hashedToken = crypto
            .createHash('sha256')
            .update(rawToken)
            .digest('hex');

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({ message: "Đổi mật khẩu thành công" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- EXPORT TẤT CẢ ---
module.exports = {
    signup,
    login,
    logout,
    forgotPassword,
    resetPassword
};
