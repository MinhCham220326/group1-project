// File: backend/middleware/uploadMiddleware.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Cấu hình Cloudinary (lấy từ .env)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Cấu hình lưu trữ
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'group1-avatars', // Tên thư mục trên Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'],
        public_id: (req, file) => `avatar-${req.user._id}-${Date.now()}`,
    },
});

// Tạo middleware multer
const uploadMiddleware = multer({ storage: storage });
module.exports = uploadMiddleware;