const sequelize = require('./config/database');

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o MySQL realizada com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar com o MySQL:', error.message);
    }
}

testConnection();