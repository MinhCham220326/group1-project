const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // <-- THÊM DÒNG NÀY (để đọc JWT_SECRET)

// File: backend/server.js
// ... (sau dòng app.use(express.json());)

// --- KẾT NỐI MONGODB ---
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Thoát nếu kết nối lỗi
    }
};
connectDB();

// --- CÁC ROUTES ---
// ...

const app = express();
app.use(cors());
app.use(express.json());

// ... (kết nối MongoDB giữ nguyên) ...

// --- CÁC ROUTES ---
const userRoutes = require('./routes/user'); // (của Hoạt động 7)
app.use('/users', userRoutes); 

// THÊM ROUTE MỚI CHO AUTH
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes); // <-- Đặt tiền tố là /api/auth

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));