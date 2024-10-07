const mongoose = require('mongoose');
require('dotenv').config();

let isConnected;

async function connectToMongoDB() {
  if (isConnected) {
    return;
  }

  const mongoUrl = process.env.MONGO_DB_URL;
  if (!mongoUrl) {
    throw new Error('MONGO_DB_URL environment variable is not set');
  }

  try {
    await mongoose.connect(mongoUrl, {
      useUnifiedTopology: true,
    });
    isConnected = mongoose.connection.readyState;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

module.exports = { connectToMongoDB, mongoose };
