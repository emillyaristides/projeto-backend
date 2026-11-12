
const { Product, Category } = require('../models');

class ProductCategoryController {

    // Associar uma categoria a um produto
    static async create(request, response) {
        try {
            const { product_id, category_id } = request.body || {};

            if (
                !Number.isInteger(Number(product_id)) ||
                Number(product_id) <= 0 ||
                !Number.isInteger(Number(category_id)) ||
                Number(category_id) <= 0
            ) {
                return response.status(400).json({
                    mensagem: 'Informe IDs válidos para o produto e a categoria.'
                });
            }

            const product = await Product.findByPk(product_id);
            const category = await Category.findByPk(category_id);

            if (!product || !category) {
                return response.status(404).json({
                    mensagem: 'Produto ou categoria não encontrado.'
                });
            }

            const alreadyAssociated = await product.hasCategory(category);

            if (alreadyAssociated) {
                return response.status(409).json({
                    mensagem: 'Essa categoria já está associada ao produto.'
                });
            }

            await product.addCategory(category);

            return response.status(201).json({
                mensagem: 'Categoria associada ao produto com sucesso!'
            });

        } catch (error) {
            console.error('Erro ao associar categoria:', error);

            return response.status(500).json({
                mensagem: 'Erro ao associar categoria.'
            });
        }
    }

    // Listar categorias de um produto
    static async findByProduct(request, response) {
        try {
            const { product_id } = request.params;

            if (
                !Number.isInteger(Number(product_id)) ||
                Number(product_id) <= 0
            ) {
                return response.status(400).json({
                    mensagem: 'Informe um ID de produto válido.'
                });
            }

            const product = await Product.findByPk(product_id, {
                include: [{
                    model: Category,
                    as: 'categories'
                }]
            });

            if (!product) {
                return response.status(404).json({
                    mensagem: 'Produto não encontrado.'
                });
            }

            return response.status(200).json(product.categories);

        } catch (error) {
            console.error('Erro ao buscar categorias do produto:', error);

            return response.status(500).json({
                mensagem: 'Erro ao buscar categorias do produto.'
            });
        }
    }

    // Remover associação entre produto e categoria
    static async delete(request, response) {
        try {
            const { product_id, category_id } = request.params;

            if (
                !Number.isInteger(Number(product_id)) ||
                Number(product_id) <= 0 ||
                !Number.isInteger(Number(category_id)) ||
                Number(category_id) <= 0
            ) {
                return response.status(400).json({
                    mensagem: 'Informe IDs válidos para o produto e a categoria.'
                });
            }

            const product = await Product.findByPk(product_id);
            const category = await Category.findByPk(category_id);

            if (!product || !category) {
                return response.status(404).json({
                    mensagem: 'Produto ou categoria não encontrado.'
                });
            }

            const isAssociated = await product.hasCategory(category);

            if (!isAssociated) {
                return response.status(404).json({
                    mensagem: 'Essa categoria não está associada ao produto.'
                });
            }

            await product.removeCategory(category);

            return response.status(200).json({
                mensagem: 'Categoria removida do produto com sucesso!'
            });

        } catch (error) {
            console.error('Erro ao remover categoria:', error);

            return response.status(500).json({
                mensagem: 'Erro ao remover categoria.'
            });
        }
    }
}

module.exports = ProductCategoryController;
