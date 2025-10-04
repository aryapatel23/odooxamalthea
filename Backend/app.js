const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./modules/auth/authRoutes');
const companiesRoutes = require('./modules/companies/companiesRoutes');
const usersRoutes = require('./modules/users/userRoutes');
const superadminRoutes = require('./modules/superadmin/superadminRoutes');
const app = express();

// ✅ Configure CORS for React frontend
app.use(cors());

//  Body parser & cookies
app.use(express.json());
app.use(cookieParser());

// ✅ Request logger (good for debugging)
app.use((req, res, next) => {
  console.log(`[📥 ${new Date().toLocaleString()}] ${req.method} ${req.url}`);
  next();
});

// ✅ Mount API routes
app.use('/api', authRoutes);
app.use('/api', companiesRoutes);
app.use('/api', usersRoutes);
app.use('/api', superadminRoutes);

module.exports = app;
