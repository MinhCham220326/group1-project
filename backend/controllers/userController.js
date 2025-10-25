// Bước 2: Tạo một mảng tạm thời để giả lập CSDL
// Thêm sẵn 2 user để GET API có dữ liệu trả về
let users = [
    { id: 1, name: "Student 1", email: "student1@test.com" },
    { id: 2, name: "Student 2", email: "student2@test.com" }
];

// Bước 3: Viết API GET /users
// Hàm này lấy tất cả người dùng
const getAllUsers = (req, res) => {
    res.status(200).json(users);
};

// Bước 3: Viết API POST /users
// Hàm này tạo một người dùng mới
const createUser = (req, res) => {
    // Lấy thông tin user mới từ request body
    const newUser = req.body;
    
    // Thêm một id đơn giản (lớn hơn id cuối cùng)
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    newUser.id = newId;

    // Thêm user mới vào mảng
    users.push(newUser);

    // Trả về thông báo thành công và toàn bộ danh sách users đã cập nhật
    res.status(201).json(users);
};

// Đừng quên export các hàm này để routes có thể dùng
module.exports = {
    getAllUsers,
    createUser
};