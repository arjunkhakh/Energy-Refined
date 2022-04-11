// Foreign Key For User and Product

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Product extends Model {}

Product.init(
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        installationCost: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        paybackAmount: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isIn: [['solar', 'wind', 'heat']],
              msg: "Product category must be either 'solar', 'wind' or 'heat'"
            }
        },
        user_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'user',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'product',
      }
)

module.exports = Product;