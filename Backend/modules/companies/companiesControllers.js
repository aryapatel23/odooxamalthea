const { getDB } = require("../../config/db"); // your db file
const bcrypt = require("bcrypt");

// POST /api/superadmin/create-company
const createCompany = async (req, res) => {
  try {
    const { companyId, companyName, country, currency, adminName, adminEmail, adminPassword } = req.body;

    // Validate required fields
    if (!companyId || !companyName || !country || !currency || !adminName || !adminEmail || !adminPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const mainDb = getDB();

    // Check if company already exists by name or companyId
    const existing = await mainDb.collection("companies").findOne({
      $or: [{ companyName }, { companyId }]
    });
    if (existing) return res.status(400).json({ message: "Company already exists" });

    // Generate DB name for the company
    const dbName = companyName.toLowerCase().replace(/\s+/g, "_") + "_db";

    // Insert company info in main_db (Expense_Management) with manual companyId
    const companyData = {
      companyId, // <-- manual companyId
      companyName,
      dbName,
      country,
      currency, // { code, name, symbol }
      createdAt: new Date(),
    };

    await mainDb.collection("companies").insertOne(companyData);

    // Create new database for this company
    const client = getDB().client || mainDb.s.client; // Access the client object
    const companyDb = client.db(dbName);

    // Create collections for the company
    await companyDb.createCollection("users");
    await companyDb.createCollection("expenses");

    // Hash admin password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Insert admin user into company's DB
    const adminData = {
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      companyId, // use manual companyId
      createdAt: new Date(),
    };

    await companyDb.collection("users").insertOne(adminData);

    res.status(201).json({
      message: "✅ Company and admin user created successfully",
      company: {
        companyId,
        companyName,
        dbName,
        country,
        currency,
        adminEmail,
      },
    });
  } catch (error) {
    console.error("Error creating company:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = { createCompany };
