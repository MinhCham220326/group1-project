const mongoose = require('mongoose');

// Đây là "khuôn" cho dữ liệu
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // Bắt buộc phải có tên
    },
    email: {
        type: String,
        required: true, // Bắt buộc phải có email
        unique: true    // Email phải là duy nhất
    }
});

// Export model
module.exports = mongoose.model('User', UserSchema);