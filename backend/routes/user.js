const express = require('express');
const router = express.Router();

// Import các hàm controller
const { getAllUsers, createUser } = require('../controllers/userController.js');

// Định nghĩa các routes
// Khi có request GET tới / , nó sẽ gọi hàm getAllUsers
router.get('/', getAllUsers);

// Khi có request POST tới / , nó sẽ gọi hàm createUser
router.post('/', createUser);

// Export router
module.exports = router;