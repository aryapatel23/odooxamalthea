const { getDB, getClient } = require('../../config/db');
const { ObjectId } = require('mongodb');

// POST /api/expenses/add
const addExpense = async (req, res) => {
  try {
    const { amount, photo, currency, date, description, companyId, user_id, username } = req.body;

    // ✅ Validate required fields
    if (!amount || !currency || !date || !description || !companyId || !user_id || !username) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const mainDb = getDB();
    const client = getClient();

    // 1️⃣ Find company in main DB
    const company = await mainDb.collection('companies').findOne({ companyId});
    if (!company) return res.status(404).json({ message: 'Company not found' });

    // 2️⃣ Access company's DB
    const companyDb = client.db(company.dbName);

    // 3️⃣ Prepare expense object
    const expenseData = {
      amount,
      photo: photo || null,        // optional
      currency,
      date: new Date(date),
      description,
      companyId,
      createdBy: {
        user_id,                   // passed from frontend (Redux)
        username
      },
      status: 'Pending',
      createdAt: new Date()
    };

    // 4️⃣ Insert into expenses collection
    const result = await companyDb.collection('expenses').insertOne(expenseData);

    res.status(201).json({
      message: '✅ Expense added successfully',
      expense: {
        id: result.insertedId,
        ...expenseData
      }
    });

  } catch (error) {
    console.error('❌ Add expense error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const getAllExpenses = async (req, res) => {
  try {
    const mainDb = getDB();
    const client = getClient();

    // ✅ Get companyId from logged-in manager
const { companyId } = req.body;

    const company = await mainDb.collection('companies').findOne({ companyId });
    if (!company) return res.status(404).json({ message: 'Company not found' });

    const companyDb = client.db(company.dbName);

    // Optional filter by status
    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const expenses = await companyDb.collection('expenses').find(filter).toArray();

    res.status(200).json({ expenses });

  } catch (error) {
    console.error('❌ Get all expenses error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { addExpense,getAllExpenses };
