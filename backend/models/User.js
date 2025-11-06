// File: backend/models/User.js (ĐÃ GHÉP HOÀN CHỈNH)

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto'); // <-- THÊM TỪ DÒNG 2

const UserSchema = new mongoose.Schema({
    // --- Các trường từ Dòng 1 ---
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    
    // --- Các trường THÊM MỚI từ Dòng 2 ---
    avatar: {
        type: String, // Lưu URL từ Cloudinary
        default: ''
    },
    resetPasswordToken: {
        type: String // Lưu token (đã băm)
    },
    resetPasswordExpire: {
        type: Date // Thời gian token hết hạn
    }
    // --- KẾT THÚC THÊM MỚI ---
    
}, { timestamps: true }); // <-- Thêm timestamps từ Dòng 2

// --- Mã hóa mật khẩu TRƯỚC KHI LƯU (Từ Dòng 1) ---
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// --- THÊM HÀM TẠO TOKEN (Từ Dòng 2) ---
UserSchema.methods.getResetPasswordToken = function () {
    // 1. Tạo token thô (raw token)
    const resetToken = crypto.randomBytes(20).toString('hex');

    // 2. Băm (hash) token này và lưu vào CSDL
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // 3. Đặt thời gian hết hạn (10 phút)
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    // 4. Trả về token thô (để gửi email)
    return resetToken;
};

// 🛠️ GIỮ NGUYÊN DÒNG SỬA LỖI OVERWRITEMODELERROR (Từ Dòng 1)
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);