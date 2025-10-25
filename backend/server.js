const express = require('express');
const app = express();
app.use(express.json());


// 1. Import user routes
const userRoutes = require('./routes/user');

// 2. Sử dụng routes với tiền tố (prefix) là /users
// Tức là:
// GET /users   -> sẽ gọi router.get('/') trong user.js
// POST /users  -> sẽ gọi router.post('/') trong user.js
app.use('/users', userRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));