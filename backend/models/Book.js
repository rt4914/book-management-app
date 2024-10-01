const { DataTypes } = require('sequelize');
const sequelize = require('../config/postgresdb');
const Author = require('./Author.js');

const Book = sequelize.define(
  'Book',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    published_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
)

Book.belongsTo(Author, {foreignKey: 'author_id'});

module.exports = Book;
