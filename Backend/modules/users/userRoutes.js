const express = require("express");
const router = express.Router();
const { addUser } = require("./userController");

// Add new user (Admin, Manager, Employee)
router.post("/add", addUser);

module.exports = router;
