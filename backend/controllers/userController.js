// File: backend/controllers/userController.js
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');

// --- LẤY DANH SÁCH USER (Admin) ---
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- TẠO USER MỚI (đã cũ) ---
const createUser = async (req, res) => {
    res.status(400).json({ message: "API này đã cũ, hãy dùng /api/auth/signup" });
};

// --- SỬA USER (Admin) ---
const updateUser = async (req, res) => {
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

// --- XÓA USER (Admin) ---
const deleteUser = async (req, res) => {
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

// --- XEM THÔNG TIN CÁ NHÂN ---
const getProfile = async (req, res) => {
    if (req.user) {
        res.status(200).json(req.user);
    } else {
        res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
};

// --- CẬP NHẬT THÔNG TIN CÁ NHÂN ---
const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, email, password } = req.body;
        const updatedFields = { name, email };

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

// --- UPLOAD ẢNH ĐẠI DIỆN (CLOUDINARY) ---
// --- UPLOAD ẢNH ĐẠI DIỆN ---
const uploadAvatar = async (req, res) => {
    try {
        console.log("🟢 Nhận request upload avatar...");
        console.log("📁 req.file:", req.file);
        console.log("👤 req.user:", req.user);

        if (!req.file) {
            return res.status(400).json({ message: 'Không có file nào được tải lên!' });
        }

        if (!req.user) {
            return res.status(401).json({ message: 'Không xác định được người dùng (token sai?)' });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng!' });
        }

        // ✅ CloudinaryStorage tự gắn `req.file.path` là URL ảnh
        user.avatar = req.file.path;
        await user.save();

        console.log("✅ Upload thành công:", user.avatar);
        res.status(200).json({
            message: 'Upload avatar thành công!',
            avatarUrl: user.avatar
        });

    } catch (error) {
        console.error("❌ Lỗi uploadAvatar:", error);
        res.status(500).json({ message: error.message });
    }
};


// --- EXPORT TẤT CẢ ---
module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getProfile,
    updateProfile,
    uploadAvatar
};
