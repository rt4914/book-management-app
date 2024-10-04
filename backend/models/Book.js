const { DataTypes } = require('sequelize');
const sequelize = require('../config/postgresdb');
const Author = require('./Author');

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
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Author,
        key: 'id',
      },
    }
  },
  {
    timestamps: true,
  }
);

Book.belongsTo(Author, { foreignKey: 'author_id' });
Author.hasMany(Book, { foreignKey: 'author_id' });

module.exports = Book;
