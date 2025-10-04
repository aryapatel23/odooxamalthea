const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../auth' });
const { getDB, getClient } = require('../../config/db');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const login = async (req, res) => {
  try {
    const mainDb = getDB();
    const client = getClient(); // ✅ now client is defined

    const { user_id, password, companyId } = req.body;

    if (!user_id || !password || !companyId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // 1️⃣ Find company in main DB using companyId
    const company = await mainDb.collection('companies').findOne({ companyId });
    if (!company) return res.status(404).json({ message: 'Company not found' });

    // 2️⃣ Access the company's DB
    const companyDb = client.db(company.dbName);

    // 3️⃣ Find user by user_id in company's DB
    const user = await companyDb.collection('users').findOne({ user_id });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    // 4️⃣ Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // 5️⃣ Generate JWT
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        user_id: user.user_id,
        email: user.email,
        role: user.role,
        companyId: user.companyId
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      message: '✅ Login successful',
      token,
      user: {
        id: user.user_id,
        email: user.email,
        role: user.role.toLowerCase(),
        companyId: user.companyId
      }
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { login };
