// File: backend/controllers/userController.js
const User = require('../models/User.js');
const bcrypt = require('bcryptjs'); 

// (Hàm getAllUsers và createUser của bạn đã có ở đây...)
const getAllUsers = async (req, res) => {
    // (Code gốc của bạn giữ nguyên)
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const createUser = async (req, res) => {
    // (Code gốc của bạn giữ nguyên)
    res.status(400).json({ message: "API này đã cũ, hãy dùng /api/auth/signup" });
};

// (Code gốc của bạn giữ nguyên)
// PUT: Sửa user (Admin)
const updateUser = async (req, res) => {
    // (Code gốc của bạn giữ nguyên)
    try {
        const { id } = req.params; 
        const { name, email } = req.body; 
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            { name, email }, 
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// (Code gốc của bạn giữ nguyên)
// DELETE: Xóa user (Admin)
const deleteUser = async (req, res) => {
    // (Code gốc của bạn giữ nguyên)
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const allUsers = await User.find();
        res.status(200).json(allUsers); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// (Code gốc của bạn giữ nguyên)
// CHỨC NĂNG 5: XEM THÔNG TIN CÁ NHÂN (View Profile)
const getProfile = async (req, res) => {
    // (Code gốc của bạn giữ nguyên)
    if (req.user) {
        res.status(200).json(req.user);
    } else {
        res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
};

// (Code gốc của bạn giữ nguyên)
// CHỨC NĂNG 4: CẬP NHẬT THÔNG TIN CÁ NHÂN (Update Profile)
const updateProfile = async (req, res) => {
    // (Code gốc của bạn giữ nguyên)
    try {
        const userId = req.user._id; 
        const { name, email, password } = req.body;
        const updatedFields = {
            name: name,
            email: email,
        };
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updatedFields.password = await bcrypt.hash(password, salt);
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updatedFields,
            { new: true } 
        ).select('-password');
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- BẮT ĐẦU THÊM MỚI (CHỨC NĂNG 10) ---
exports.uploadAvatar = async (req, res) => {
    try {
        // req.file.path là URL của ảnh (do uploadMiddleware cung cấp)
        if (!req.file) {
            return res.status(400).json({ message: 'Vui lòng chọn 1 file ảnh' });
        }

        const user = await User.findById(req.user._id);
        
        // (Xóa ảnh cũ trên Cloudinary nếu cần - Tùy chọn)

        // Cập nhật link avatar mới vào CSDL
        user.avatar = req.file.path;
        await user.save();

        res.status(200).json({
            message: "Upload avatar thành công",
            avatarUrl: user.avatar
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// --- KẾT THÚC THÊM MỚI ---

// Cập nhật module.exports
module.exports = {
    getAllUsers,  
    createUser,   
    updateUser,   
    deleteUser,   
    getProfile,   
    updateProfile, 
    uploadAvatar // <-- ĐÃ THÊM
};