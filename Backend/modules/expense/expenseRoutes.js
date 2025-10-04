const express = require('express');
const { addExpense } = require('./expenseController');

const router = express.Router();

// Add expense
router.post('/addexpense', addExpense);

module.exports = router;
