const { DataTypes } = require('sequelize');
const sequelize = require('../config/postgresdb');

const Author = sequelize.define(
  'Author',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    born_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    }
  },{
    timestamps: true,
  }
)

module.exports = Author;
