const { Sequelize } = require('sequelize');
require('dotenv').config();

const checkEnvironmentVariables = ['DB_NAME', 'DB_USERNAME', 'DB_PASSWORD', 'DB_HOST'];
checkEnvironmentVariables.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`${varName} environment variable is not set`);
  }
});

const targetDb = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT || 5432;

const sequelize = new Sequelize(targetDb, username, password, {
  host: host,
  port: port,
  dialect: 'postgres',
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
})();

module.exports = sequelize;
