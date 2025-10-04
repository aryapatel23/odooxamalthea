const express = require('express');
const { login  } = require('./authController');
const authenticateToken = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', login); // ✅ pass the function reference
// router.post('/change-password', authenticateToken, changePassword);

module.exports = router;
