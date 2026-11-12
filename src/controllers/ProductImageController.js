
const { ProductImage, Product } = require('../models');

class ProductImageController {

    // Cadastrar imagem
    static async create(request, response) {
        try {
            const { product_id, enabled, path } = request.body;

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

            if (typeof path !== 'string' || !path.trim()) {
                return response.status(400).json({
                    mensagem: 'O caminho da imagem é obrigatório.'
                });
            }

            if (enabled !== undefined && typeof enabled !== 'boolean') {
                return response.status(400).json({
                    mensagem: 'O campo enabled deve ser booleano.'
                });
            }

            const product = await Product.findByPk(product_id);

            if (!product) {
                return response.status(404).json({
                    mensagem: 'Produto não encontrado.'
                });
            }

            const image = await ProductImage.create({
                product_id: Number(product_id),
                enabled: enabled ?? true,
                path: path.trim()
            });

            return response.status(201).json({
                mensagem: 'Imagem cadastrada com sucesso!',
                image
            });

        } catch (error) {
            console.error('Erro ao cadastrar imagem:', error);

            return response.status(500).json({
                mensagem: 'Erro ao cadastrar imagem.'
            });
        }
    }

    // Listar imagens
    static async findAll(request, response) {
        try {
            const images = await ProductImage.findAll();

            return response.status(200).json(images);

        } catch (error) {
            console.error('Erro ao listar imagens:', error);

            return response.status(500).json({
                mensagem: 'Erro ao listar imagens.'
            });
        }
    }

    // Buscar imagem pelo ID
    static async findById(request, response) {
        try {
            const { id } = request.params;

            const image = await ProductImage.findByPk(id);

            if (!image) {
                return response.status(404).json({
                    mensagem: 'Imagem não encontrada.'
                });
            }

            return response.status(200).json(image);

        } catch (error) {
            console.error('Erro ao buscar imagem:', error);

            return response.status(500).json({
                mensagem: 'Erro ao buscar imagem.'
            });
        }
    }

    // Atualizar imagem
    static async update(request, response) {
        try {
            const { id } = request.params;
            const { product_id, enabled, path } = request.body;

            const image = await ProductImage.findByPk(id);

            if (!image) {
                return response.status(404).json({
                    mensagem: 'Imagem não encontrada.'
                });
            }

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

                image.product_id = Number(product_id);
            }

            if (enabled !== undefined) {
                if (typeof enabled !== 'boolean') {
                    return response.status(400).json({
                        mensagem: 'O campo enabled deve ser booleano.'
                    });
                }

                image.enabled = enabled;
            }

            if (path !== undefined) {
                if (typeof path !== 'string' || !path.trim()) {
                    return response.status(400).json({
                        mensagem: 'O caminho da imagem não pode ser vazio.'
                    });
                }

                image.path = path.trim();
            }

            await image.save();

            return response.status(200).json({
                mensagem: 'Imagem atualizada com sucesso!',
                image
            });

        } catch (error) {
            console.error('Erro ao atualizar imagem:', error);

            return response.status(500).json({
                mensagem: 'Erro ao atualizar imagem.'
            });
        }
    }

    // Excluir imagem
    static async delete(request, response) {
        try {
            const { id } = request.params;

            const image = await ProductImage.findByPk(id);

            if (!image) {
                return response.status(404).json({
                    mensagem: 'Imagem não encontrada.'
                });
            }

            await image.destroy();

            return response.status(200).json({
                mensagem: 'Imagem excluída com sucesso!'
            });

        } catch (error) {
            console.error('Erro ao excluir imagem:', error);

            return response.status(500).json({
                mensagem: 'Erro ao excluir imagem.'
            });
        }
    }
}

module.exports = ProductImageController;
