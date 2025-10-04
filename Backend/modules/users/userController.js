const { getDB, getClient } = require("../../config/db"); // import getClient
const bcrypt = require("bcrypt");

const addUser = async (req, res) => {
  try {
    const {
      user_id,
      username,
      address,
      bankAccount,
      mobile,
      email,
      password,
      designation,
      salary,
      employmentType,
      role,
      emergencyContact,
      emergencyContactName,
      joiningDate,
      gender,
      IFSC,
      profilePic
    } = req.body;

    // companyId from JWT or request body
    const companyId = req.user?.companyId || req.body.companyId;
    if (!companyId) return res.status(400).json({ message: "Company ID is required" });

    const mainDb = getDB();
    const client = getClient(); // ✅ get MongoClient
    if (!client) return res.status(500).json({ message: "MongoDB client not connected" });

    // Find company to get DB name
    const company = await mainDb.collection("companies").findOne({ companyId });
    if (!company) return res.status(404).json({ message: "Company not found" });

    const dbName = company.dbName;
    const companyDb = client.db(dbName); // ✅ now works

    // Check if email already exists
    const existingUser = await companyDb.collection("users").findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Check if user_id already exists (if manually provided)
    if (user_id) {
      const existingId = await companyDb.collection("users").findOne({ user_id });
      if (existingId) return res.status(400).json({ message: "User ID already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Use provided user_id or generate one automatically
    const finalUserId = user_id || "EM" + Math.floor(1000 + Math.random() * 9000);

    // Prepare user object
    const newUser = {
      username,
      user_id: finalUserId,
      address,
      bankAccount,
      mobile,
      email,
      password: hashedPassword,
      designation,
      salary,
      employmentType,
      role,
      emergencyContact,
      emergencyContactName,
      joiningDate,
      gender,
      IFSC,
      profilePic,
      companyId,
      createdAt: new Date()
    };

    // Insert user
    await companyDb.collection("users").insertOne(newUser);

    res.status(201).json({
      message: "✅ User added successfully",
      user: {
        username,
        user_id: finalUserId,
        email,
        role,
        companyId
      }
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = { addUser };
