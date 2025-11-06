// File: backend/controllers/userController.js
const User = require('../models/User.js');
const bcrypt = require('bcryptjs'); // <-- THÊM DÒNG NÀY

// (Giả sử hàm getAllUsers và createUser của bạn đã có ở đây...)
// (Nếu không, bạn sẽ gặp lỗi)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const createUser = async (req, res) => {
    // LƯU Ý: Hàm này từ Buổi 4 đã cũ.
    // Model User (Buổi 5) yêu cầu 'password'.
    // Bạn nên dùng API /api/auth/signup để tạo user.
    res.status(400).json({ message: "API này đã cũ, hãy dùng /api/auth/signup" });
};


// --- BẮT ĐẦU PHẦN CODE BẠN GỬI (HOẠT ĐỘNG 7 - Dành cho Admin) ---

// PUT: Sửa user (Admin)
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

// DELETE: Xóa user (Admin)
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const allUsers = await User.find();
        res.status(200).json(allUsers); // Sửa: 201 (Created) là sai, 200 (OK) mới đúng
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- KẾT THÚC PHẦN CODE BẠN GỬI ---


// --- BẮT ĐẦU PHẦN MỚI (HOẠT ĐỘNG 2 - BUỔI 5) ---

// CHỨC NĂNG 5: XEM THÔNG TIN CÁ NHÂN (View Profile)
const getProfile = async (req, res) => {
    // req.user đã được gán bởi authMiddleware
    // Chúng ta chỉ cần trả nó về
    if (req.user) {
        res.status(200).json(req.user);
    } else {
        res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
};

// CHỨC NĂNG 4: CẬP NHẬT THÔNG TIN CÁ NHÂN (Update Profile)
const updateProfile = async (req, res) => {
    try {
        // Lấy ID của user đã đăng nhập từ middleware (req.user)
        const userId = req.user._id; 
        
        // Lấy thông tin mới từ body
        const { name, email, password } = req.body;

        const updatedFields = {
            name: name,
            email: email,
        };

        // Chỉ cập nhật (mã hóa) mật khẩu nếu người dùng GỬI MẬT KHẨU MỚI
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updatedFields.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updatedFields,
            { new: true } // {new: true} để nó trả về user sau khi đã cập nhật
        ).select('-password'); // Luôn trừ mật khẩu khi trả về

        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- KẾT THÚC PHẦN MỚI ---


// Cập nhật module.exports
module.exports = {
    getAllUsers,  // (Hàm cũ)
    createUser,   // (Hàm cũ)
    updateUser,   // (Từ file của bạn)
    deleteUser,   // (Từ file của bạn)
    getProfile,   // (Hàm mới)
    updateProfile // (Hàm mới)
};