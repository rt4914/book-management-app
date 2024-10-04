const { Sequelize } = require('sequelize');
require('dotenv').config();

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
    console.log('Database connected successfully');

    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Database connection error:', error);
  }
})();

module.exports = sequelize;
