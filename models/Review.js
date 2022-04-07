const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model {}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        review_data: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        user_id: {
           type: DataTypes.INTEGER,
           references: {
               model: 'user',
               key: 'id',
           },
        },
        date_created: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        product_id: {
           type: DataTypes.INTEGER,
           references: {
               model: 'product',
               key: 'id',
           },
       },
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        modelName: 'review',
    }
);

module.exports = Review;