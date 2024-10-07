const mongoose = require('mongoose');
require('dotenv').config();

let isConnected;

async function connectToMongoDB() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_DB_URL, {
      useUnifiedTopology: true,
    });
    isConnected = mongoose.connection.readyState;
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

module.exports = { connectToMongoDB, mongoose };
