
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {

    // Realizar login
    static async login(request, response) {
        try {
            const { email, password } = request.body;

            if (!email || !password) {
                return response.status(400).json({
                    mensagem: 'E-mail e senha são obrigatórios.'
                });
            }

            if (!process.env.JWT_SECRET) {
                return response.status(500).json({
                    mensagem: 'Configuração de autenticação não encontrada.'
                });
            }

            const user = await User.findOne({
                where: { email }
            });

            if (!user) {
                return response.status(401).json({
                    mensagem: 'E-mail ou senha incorretos.'
                });
            }

            const passwordMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!passwordMatch) {
                return response.status(401).json({
                    mensagem: 'E-mail ou senha incorretos.'
                });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );

            return response.status(200).json({
                mensagem: 'Login realizado com sucesso!',
                token
            });

        } catch (error) {
            console.error('Erro ao realizar login:', error);

            return response.status(500).json({
                mensagem: 'Erro interno ao realizar login.'
            });
        }
    }
}

module.exports = AuthController;
