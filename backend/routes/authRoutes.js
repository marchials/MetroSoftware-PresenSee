const express = require('express');
const { createAdmin, loginAdmin, logoutAdmin } = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// Menggunakan fungsi controller untuk POST request
router.post('/admin', verifyToken, createAdmin); // Verify token sebelum membuat admin baru
router.post('/login', loginAdmin);  // Login admin
router.post('/logout', logoutAdmin); // Logout admin

module.exports = router;
