
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductOption = sequelize.define('ProductOption', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shape: {
        type: DataTypes.ENUM('square', 'circle'),
        allowNull: true
    },
    radius: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    type: {
        type: DataTypes.ENUM('text', 'color'),
        allowNull: false
    },
    values: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'productoptions',
    underscored: true
});

module.exports = ProductOption;
