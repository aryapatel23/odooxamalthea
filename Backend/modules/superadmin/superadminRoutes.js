const express = require('express');
const { superadminLogin } = require('./superadminController');
const router = express.Router();

// POST /api/superadmin/login
router.post('/superadmin', superadminLogin);

module.exports = router;
