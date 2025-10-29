// File: backend/models/User.js (ĐÃ CHỈNH SỬA)
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import bcrypt

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Đảm bảo email không trùng
    },
    password: {
        type: String,
        required: true // Mật khẩu là bắt buộc
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Chỉ cho phép 2 giá trị
        default: 'user' // Mặc định là 'user'
    }
    // Bạn có thể thêm các trường khác như avatar, v.v.
});

// --- Mã hóa mật khẩu TRƯỚC KHI LƯU ---
// Đây là một "pre-save hook" của Mongoose
UserSchema.pre('save', async function (next) {
    // Chỉ mã hóa nếu mật khẩu được tạo mới hoặc thay đổi
    if (!this.isModified('password')) {
        return next();
    }

    try {
        // Tạo "salt"
        const salt = await bcrypt.genSalt(10);
        // Băm (hash) mật khẩu với salt
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// 🛠️ DÒNG CHỈNH SỬA ĐỂ KHẮC PHỤC LỖI OVERWRITEMODELERROR
// Kiểm tra xem mô hình 'User' đã tồn tại trong mongoose.models chưa.
// Nếu tồn tại (do nodemon đã load), thì dùng mô hình đó.
// Nếu chưa, thì tạo mô hình mới.
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);