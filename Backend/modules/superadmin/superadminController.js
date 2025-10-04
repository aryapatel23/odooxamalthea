const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../auth' });
const { getDB } = require('../../config/db');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const superadminLogin = async (req, res) => {
  try {
    const db = getDB(); // main DB
    const { user_id, password } = req.body;

    if (!user_id || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }

    // Find superadmin in main DB by user_id
    const user = await db.collection('superadmins').findOne({ user_id });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        user_id: user.user_id,
        role: 'superadmin',
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      message: '✅ Superadmin login successful',
      token,
      user: {
        username: user.name,
        user_id: user.user_id,
        role: 'superadmin',
      },
    });
  } catch (error) {
    console.error('Superadmin login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { superadminLogin };
