
const { ProductOption, Product } = require('../models');

class ProductOptionController {

    // Cadastrar opção de produto
    static async create(request, response) {
        try {
            const {
                product_id,
                title,
                shape,
                radius,
                type,
                values
            } = request.body;

            // Validar ID do produto
            if (
                product_id === undefined ||
                product_id === null ||
                product_id === '' ||
                !Number.isInteger(Number(product_id)) ||
                Number(product_id) <= 0
            ) {
                return response.status(400).json({
                    mensagem: 'Informe um ID de produto válido.'
                });
            }

            // Validar campos obrigatórios
            if (
                typeof title !== 'string' ||
                !title.trim() ||
                typeof type !== 'string' ||
                !type.trim() ||
                typeof values !== 'string' ||
                !values.trim()
            ) {
                return response.status(400).json({
                    mensagem: 'Título, tipo e valores são obrigatórios.'
                });
            }

            // Validar shape
            if (
                shape !== undefined &&
                shape !== null &&
                (typeof shape !== 'string' || !shape.trim())
            ) {
                return response.status(400).json({
                    mensagem: 'O formato da opção deve ser um texto válido.'
                });
            }

            // Validar radius
            if (
                radius !== undefined &&
                radius !== null &&
                (
                    radius === '' ||
                    !Number.isFinite(Number(radius)) ||
                    Number(radius) < 0
                )
            ) {
                return response.status(400).json({
                    mensagem: 'O raio deve ser um número maior ou igual a zero.'
                });
            }

            // Verificar se o produto existe
            const product = await Product.findByPk(product_id);

            if (!product) {
                return response.status(404).json({
                    mensagem: 'Produto não encontrado.'
                });
            }

            const option = await ProductOption.create({
                product_id: Number(product_id),
                title: title.trim(),
                shape: shape ?? null,
                radius: radius ?? null,
                type: type.trim(),
                values: values.trim()
            });

            return response.status(201).json({
                mensagem: 'Opção cadastrada com sucesso!',
                option
            });

        } catch (error) {
            console.error('Erro ao cadastrar opção:', error);

            return response.status(500).json({
                mensagem: 'Erro ao cadastrar opção.'
            });
        }
    }

    // Listar todas as opções
    static async findAll(request, response) {
        try {
            const options = await ProductOption.findAll();

            return response.status(200).json(options);

        } catch (error) {
            console.error('Erro ao listar opções:', error);

            return response.status(500).json({
                mensagem: 'Erro ao listar opções.'
            });
        }
    }

    // Buscar opção pelo ID
    static async findById(request, response) {
        try {
            const { id } = request.params;

            const option = await ProductOption.findByPk(id);

            if (!option) {
                return response.status(404).json({
                    mensagem: 'Opção não encontrada.'
                });
            }

            return response.status(200).json(option);

        } catch (error) {
            console.error('Erro ao buscar opção:', error);

            return response.status(500).json({
                mensagem: 'Erro ao buscar opção.'
            });
        }
    }

    // Atualizar opção
    static async update(request, response) {
        try {
            const { id } = request.params;

            const {
                product_id,
                title,
                shape,
                radius,
                type,
                values
            } = request.body;

            const option = await ProductOption.findByPk(id);

            if (!option) {
                return response.status(404).json({
                    mensagem: 'Opção não encontrada.'
                });
            }

            // Validar ID do produto
            if (product_id !== undefined) {
                if (
                    product_id === null ||
                    product_id === '' ||
                    !Number.isInteger(Number(product_id)) ||
                    Number(product_id) <= 0
                ) {
                    return response.status(400).json({
                        mensagem: 'Informe um ID de produto válido.'
                    });
                }

                const product = await Product.findByPk(product_id);

                if (!product) {
                    return response.status(404).json({
                        mensagem: 'Produto não encontrado.'
                    });
                }

                option.product_id = Number(product_id);
            }

            // Validar título
            if (title !== undefined) {
                if (typeof title !== 'string' || !title.trim()) {
                    return response.status(400).json({
                        mensagem: 'O título não pode ser vazio.'
                    });
                }

                option.title = title.trim();
            }

            // Validar formato
            if (shape !== undefined) {
                if (
                    shape !== null &&
                    (typeof shape !== 'string' || !shape.trim())
                ) {
                    return response.status(400).json({
                        mensagem: 'O formato da opção deve ser um texto válido.'
                    });
                }

                option.shape = shape;
            }

            // Validar raio
            if (radius !== undefined) {
                if (
                    radius !== null &&
                    (
                        radius === '' ||
                        !Number.isFinite(Number(radius)) ||
                        Number(radius) < 0
                    )
                ) {
                    return response.status(400).json({
                        mensagem: 'O raio deve ser um número maior ou igual a zero.'
                    });
                }

                option.radius = radius === null ? null : Number(radius);
            }

            // Validar tipo
            if (type !== undefined) {
                if (typeof type !== 'string' || !type.trim()) {
                    return response.status(400).json({
                        mensagem: 'O tipo não pode ser vazio.'
                    });
                }

                option.type = type.trim();
            }

            // Validar valores
            if (values !== undefined) {
                if (typeof values !== 'string' || !values.trim()) {
                    return response.status(400).json({
                        mensagem: 'Os valores não podem ser vazios.'
                    });
                }

                option.values = values.trim();
            }

            await option.save();

            return response.status(200).json({
                mensagem: 'Opção atualizada com sucesso!',
                option
            });

        } catch (error) {
            console.error('Erro ao atualizar opção:', error);

            return response.status(500).json({
                mensagem: 'Erro ao atualizar opção.'
            });
        }
    }

    // Excluir opção
    static async delete(request, response) {
        try {
            const { id } = request.params;

            const option = await ProductOption.findByPk(id);

            if (!option) {
                return response.status(404).json({
                    mensagem: 'Opção não encontrada.'
                });
            }

            await option.destroy();

            return response.status(200).json({
                mensagem: 'Opção excluída com sucesso!'
            });

        } catch (error) {
            console.error('Erro ao excluir opção:', error);

            return response.status(500).json({
                mensagem: 'Erro ao excluir opção.'
            });
        }
    }
}

module.exports = ProductOptionController;
