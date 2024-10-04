const { Sequelize } = require('sequelize');
require('dotenv').config();

const initialDb = 'postgres';
const targetDb = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

const sequelize = new Sequelize(initialDb, username, password, {
  host: host,
  port: process.env.DB_PORT || 5432,
  dialect: 'postgres',
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();

    const [results] = await sequelize.query(
      `SELECT 1 FROM pg_database WHERE datname = '${targetDb}'`
    );

    if (results.length === 0) {
      await sequelize.query(`CREATE DATABASE "${targetDb}";`);
    }

    await sequelize.sync({ alter: true });
  } catch (error) {
    throw new Error('Database connection error:', error);
  }
})();

module.exports = sequelize;
