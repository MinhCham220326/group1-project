// File: backend/config/nodemailer.js
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // 1. Tạo transporter (dịch vụ gửi mail)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASS // Mật khẩu ứng dụng
        }
    });

    // 2. Định nghĩa nội dung email
    const mailOptions = {
        from: `Group 1 App <${process.env.GMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
        // (Bạn có thể dùng 'html:' để gửi email đẹp hơn)
    };

    // 3. Gửi mail
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;