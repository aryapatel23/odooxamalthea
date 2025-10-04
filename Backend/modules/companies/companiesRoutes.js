const express = require("express");
const router = express.Router();
const { createCompany } = require("./companiesControllers");

// Super Admin route to create company
router.post("/superadmin/create-company", createCompany);

module.exports = router;
