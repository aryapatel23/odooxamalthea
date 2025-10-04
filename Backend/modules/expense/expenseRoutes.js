const express = require('express');
const { addExpense ,getAllExpenses} = require('./expenseController');

const router = express.Router();

// Add expense
router.post('/addexpense', addExpense);
router.post('/allexpense', getAllExpenses)
module.exports = router;
