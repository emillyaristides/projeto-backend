
const { User } = require('../models');
const bcrypt = require('bcrypt');

class UserController {

    // Cadastrar usuário
    static async create(request, response) {
        try {
            const { firstname, surname, email, password } = request.body;

            if (!firstname || !surname || !email || !password) {
                return response.status(400).json({
                    mensagem: 'Todos os campos são obrigatórios.'
                });
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return response.status(400).json({
                    mensagem: 'Informe um e-mail válido.'
                });
            }

            const existingUser = await User.findOne({
                where: { email }
            });

            if (existingUser) {
                return response.status(409).json({
                    mensagem: 'Este e-mail já está cadastrado.'
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                firstname,
                surname,
                email,
                password: hashedPassword
            });

            return response.status(201).json({
                mensagem: 'Usuário cadastrado com sucesso!',
                user: {
                    id: user.id,
                    firstname: user.firstname,
                    surname: user.surname,
                    email: user.email
                }
            });

        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);

            return response.status(500).json({
                mensagem: 'Erro interno ao cadastrar usuário.'
            });
        }
    }

    // Listar todos os usuários
    static async findAll(request, response) {
        try {
            const users = await User.findAll({
                attributes: ['id', 'firstname', 'surname', 'email']
            });

            return response.status(200).json(users);

        } catch (error) {
            console.error('Erro ao buscar usuários:', error);

            return response.status(500).json({
                mensagem: 'Erro interno ao buscar usuários.'
            });
        }
    }

    // Buscar usuário pelo ID
    static async findById(request, response) {
        try {
            const { id } = request.params;

            const user = await User.findByPk(id, {
                attributes: ['id', 'firstname', 'surname', 'email']
            });

            if (!user) {
                return response.status(404).json({
                    mensagem: 'Usuário não encontrado.'
                });
            }

            return response.status(200).json(user);

        } catch (error) {
            console.error('Erro ao buscar usuário:', error);

            return response.status(500).json({
                mensagem: 'Erro interno ao buscar usuário.'
            });
        }
    }

    // Atualizar usuário
    static async update(request, response) {
        try {
            const { id } = request.params;
            const { firstname, surname, email, password } = request.body;

            const user = await User.findByPk(id);

            if (!user) {
                return response.status(404).json({
                    mensagem: 'Usuário não encontrado.'
                });
            }

            if (email !== undefined) {
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    return response.status(400).json({
                        mensagem: 'Informe um e-mail válido.'
                    });
                }

                if (email !== user.email) {
                    const existingUser = await User.findOne({
                        where: { email }
                    });

                    if (existingUser) {
                        return response.status(409).json({
                            mensagem: 'Este e-mail já está cadastrado.'
                        });
                    }
                }
            }

            if (password !== undefined && !password) {
                return response.status(400).json({
                    mensagem: 'A senha não pode ser vazia.'
                });
            }

            if (firstname !== undefined) user.firstname = firstname;
            if (surname !== undefined) user.surname = surname;
            if (email !== undefined) user.email = email;

            if (password !== undefined) {
                user.password = await bcrypt.hash(password, 10);
            }

            await user.save();

            return response.status(200).json({
                mensagem: 'Usuário atualizado com sucesso!',
                user: {
                    id: user.id,
                    firstname: user.firstname,
                    surname: user.surname,
                    email: user.email
                }
            });

        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);

            return response.status(500).json({
                mensagem: 'Erro interno ao atualizar usuário.'
            });
        }
    }

    // Excluir usuário
    static async delete(request, response) {
        try {
            const { id } = request.params;

            const user = await User.findByPk(id);

            if (!user) {
                return response.status(404).json({
                    mensagem: 'Usuário não encontrado.'
                });
            }

            await user.destroy();

            return response.status(200).json({
                mensagem: 'Usuário excluído com sucesso!'
            });

        } catch (error) {
            console.error('Erro ao excluir usuário:', error);

            return response.status(500).json({
                mensagem: 'Erro interno ao excluir usuário.'
            });
        }
    }
}

module.exports = UserController;
