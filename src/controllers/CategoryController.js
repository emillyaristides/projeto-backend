
const { Category } = require('../models');

class CategoryController {

    // Cadastrar categoria
    static async create(request, response) {
        try {
            const { name, slug, use_in_menu } = request.body;

            if (
                typeof name !== 'string' || !name.trim() ||
                typeof slug !== 'string' || !slug.trim()
            ) {
                return response.status(400).json({
                    mensagem: 'Nome e slug são obrigatórios.'
                });
            }

            const existingCategory = await Category.findOne({
                where: { slug: slug.trim() }
            });

            if (existingCategory) {
                return response.status(409).json({
                    mensagem: 'Este slug já está cadastrado.'
                });
            }

            const category = await Category.create({
                name: name.trim(),
                slug: slug.trim(),
                use_in_menu: use_in_menu ?? false
            });

            return response.status(201).json({
                mensagem: 'Categoria cadastrada com sucesso!',
                category
            });

        } catch (error) {
            console.error('Erro ao cadastrar categoria:', error);

            return response.status(500).json({
                mensagem: 'Erro interno ao cadastrar categoria.'
            });
        }
    }

    // Listar todas as categorias
    static async findAll(request, response) {
        try {
            const categories = await Category.findAll();

            return response.status(200).json(categories);

        } catch (error) {
            console.error('Erro ao buscar categorias:', error);

            return response.status(500).json({
                mensagem: 'Erro interno ao buscar categorias.'
            });
        }
    }

    // Buscar categoria pelo ID
    static async findById(request, response) {
        try {
            const { id } = request.params;

            const category = await Category.findByPk(id);

            if (!category) {
                return response.status(404).json({
                    mensagem: 'Categoria não encontrada.'
                });
            }

            return response.status(200).json(category);

        } catch (error) {
            console.error('Erro ao buscar categoria:', error);

            return response.status(500).json({
                mensagem: 'Erro interno ao buscar categoria.'
            });
        }
    }

    // Atualizar categoria
    static async update(request, response) {
        try {
            const { id } = request.params;
            const { name, slug, use_in_menu } = request.body;

            const category = await Category.findByPk(id);

            if (!category) {
                return response.status(404).json({
                    mensagem: 'Categoria não encontrada.'
                });
            }

            if (
                name !== undefined &&
                (typeof name !== 'string' || !name.trim())
            ) {
                return response.status(400).json({
                    mensagem: 'O nome não pode ser vazio.'
                });
            }

            if (
                slug !== undefined &&
                (typeof slug !== 'string' || !slug.trim())
            ) {
                return response.status(400).json({
                    mensagem: 'O slug não pode ser vazio.'
                });
            }

            if (slug !== undefined && slug.trim() !== category.slug) {
                const existingCategory = await Category.findOne({
                    where: { slug: slug.trim() }
                });

                if (existingCategory) {
                    return response.status(409).json({
                        mensagem: 'Este slug já está cadastrado.'
                    });
                }
            }

            if (use_in_menu !== undefined && typeof use_in_menu !== 'boolean') {
                return response.status(400).json({
                    mensagem: 'use_in_menu deve ser verdadeiro ou falso.'
                });
            }

            if (name !== undefined) category.name = name.trim();
            if (slug !== undefined) category.slug = slug.trim();

            if (use_in_menu !== undefined) {
                category.use_in_menu = use_in_menu;
            }

            await category.save();

            return response.status(200).json({
                mensagem: 'Categoria atualizada com sucesso!',
                category
            });

        } catch (error) {
            console.error('Erro ao atualizar categoria:', error);

            return response.status(500).json({
                mensagem: 'Erro interno ao atualizar categoria.'
            });
        }
    }

    // Excluir categoria
    static async delete(request, response) {
        try {
            const { id } = request.params;

            const category = await Category.findByPk(id);

            if (!category) {
                return response.status(404).json({
                    mensagem: 'Categoria não encontrada.'
                });
            }

            await category.destroy();

            return response.status(200).json({
                mensagem: 'Categoria excluída com sucesso!'
            });

        } catch (error) {
            console.error('Erro ao excluir categoria:', error);

            return response.status(500).json({
                mensagem: 'Erro interno ao excluir categoria.'
            });
        }
    }
}

module.exports = CategoryController;
