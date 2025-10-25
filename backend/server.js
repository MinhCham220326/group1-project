const express = require('express');
const cors = require('cors'); // <--- 1. THÊM DÒNG NÀY (Ở trên cùng)

const app = express();

app.use(cors()); // <--- 2. THÊM DÒNG NÀY (Ngay bên dưới app())
app.use(express.json());

// Import user routes
const userRoutes = require('./routes/user');
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));