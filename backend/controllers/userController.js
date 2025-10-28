// File: backend/controllers/userController.js
const User = require('../models/User.js');

// (Hàm getAllUsers và createUser của bạn đã có ở đây...)

// --- BẮT ĐẦU THÊM MỚI ---

// PUT: Sửa user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ URL
        const { name, email } = req.body; // Lấy thông tin mới từ body

        // Tìm và cập nhật user
        // { new: true } để nó trả về user sau khi đã cập nhật
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            { name, email }, 
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Sau khi sửa, trả về DANH SÁCH user mới nhất (giống như POST)
        // Điều này đảm bảo React cập nhật chính xác
        const allUsers = await User.find();
        res.status(200).json(allUsers);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE: Xóa user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ URL

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Sau khi xóa, trả về DANH SÁCH user mới nhất
        const allUsers = await User.find();
        res.status(201).json(allUsers);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- KẾT THÚC THÊM MỚI ---


// Cập nhật module.exports
module.exports = {
    getAllUsers,
    createUser,
    updateUser,   // <--- Thêm dòng này
    deleteUser    // <--- Thêm dòng này
};