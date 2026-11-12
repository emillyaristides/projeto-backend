
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'projeto_backend',
    'root',
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = sequelize;
