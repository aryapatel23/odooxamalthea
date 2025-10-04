const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./auth.env" });

const mongoURI = process.env.MONGO_URI;
const dbName = 'Expense_Management';

let db;
let client; // store MongoClient globally

const connectToMongoDB = async () => {
  client = new MongoClient(mongoURI);
  await client.connect();
  db = client.db(dbName);
  console.log("✅ MongoDB connected");
};

const getDB = () => db;
const getClient = () => client; // <-- export client

module.exports = { connectToMongoDB, getDB, getClient };
