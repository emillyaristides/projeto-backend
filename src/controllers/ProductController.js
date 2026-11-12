
const { Product } = require('../models');

class ProductController {

    // Cadastrar produto
    static async create(request, response) {
        try {
            const {
                name,
                slug,
                enabled,
                use_in_menu,
                stock,
                description,
                price,
                price_with_discount
            } = request.body;

            // Validar nome e slug
            if (
                typeof name !== 'string' ||
                !name.trim() ||
                typeof slug !== 'string' ||
                !slug.trim()
            ) {
                return response.status(400).json({
                    mensagem: 'Nome e slug são obrigatórios.'
                });
            }

            // Validar preço
            if (
                price === undefined ||
                price === null ||
                price === '' ||
                !Number.isFinite(Number(price)) ||
                Number(price) < 0
            ) {
                return response.status(400).json({
                    mensagem: 'O preço deve ser um número maior ou igual a zero.'
                });
            }

            // Validar preço com desconto
            if (
                price_with_discount !== undefined &&
                price_with_discount !== null &&
                (
                    price_with_discount === '' ||
                    !Number.isFinite(Number(price_with_discount)) ||
                    Number(price_with_discount) < 0 ||
                    Number(price_with_discount) > Number(price)
                )
            ) {
                return response.status(400).json({
                    mensagem: 'O preço com desconto deve ser válido e não pode ser maior que o preço original.'
                });
            }

            // Validar estoque
            if (
                stock !== undefined &&
                (!Number.isInteger(Number(stock)) || Number(stock) < 0)
            ) {
                return response.status(400).json({
                    mensagem: 'O estoque deve ser um número inteiro maior ou igual a zero.'
                });
            }

            // Validar campos booleanos
            if (
                (enabled !== undefined && typeof enabled !== 'boolean') ||
                (use_in_menu !== undefined && typeof use_in_menu !== 'boolean')
            ) {
                return response.status(400).json({
                    mensagem: 'Os campos enabled e use_in_menu devem ser booleanos.'
                });
            }

            // Verificar slug duplicado
            const existingProduct = await Product.findOne({
                where: { slug: slug.trim() }
            });

            if (existingProduct) {
                return response.status(409).json({
                    mensagem: 'Já existe um produto com esse slug.'
                });
            }

            // Cadastrar produto
            const product = await Product.create({
                name: name.trim(),
                slug: slug.trim(),
                enabled: enabled ?? true,
                use_in_menu: use_in_menu ?? false,
                stock: stock ?? 0,
                description,
                price: Number(price),
                price_with_discount:
                    price_with_discount === undefined ||
                    price_with_discount === null
                        ? Number(price)
                        : Number(price_with_discount)
            });

            return response.status(201).json({
                mensagem: 'Produto cadastrado com sucesso!',
                product
            });

        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);

            return response.status(500).json({
                mensagem: 'Erro ao cadastrar produto.'
            });
        }
    }

    // Listar produtos
    static async findAll(request, response) {
        try {
            const products = await Product.findAll();

            return response.status(200).json(products);

        } catch (error) {
            console.error('Erro ao listar produtos:', error);

            return response.status(500).json({
                mensagem: 'Erro ao listar produtos.'
            });
        }
    }

    // Buscar produto pelo ID
    static async findById(request, response) {
        try {
            const { id } = request.params;

            const product = await Product.findByPk(id);

            if (!product) {
                return response.status(404).json({
                    mensagem: 'Produto não encontrado.'
                });
            }

            return response.status(200).json(product);

        } catch (error) {
            console.error('Erro ao buscar produto:', error);

            return response.status(500).json({
                mensagem: 'Erro ao buscar produto.'
            });
        }
    }

    // Atualizar produto
    static async update(request, response) {
        try {
            const { id } = request.params;

            const product = await Product.findByPk(id);

            if (!product) {
                return response.status(404).json({
                    mensagem: 'Produto não encontrado.'
                });
            }

            const {
                name,
                slug,
                enabled,
                use_in_menu,
                stock,
                description,
                price,
                price_with_discount
            } = request.body;

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

            if (slug !== undefined) {
                const existingProduct = await Product.findOne({
                    where: { slug: slug.trim() }
                });

                if (existingProduct && existingProduct.id !== product.id) {
                    return response.status(409).json({
                        mensagem: 'Já existe um produto com esse slug.'
                    });
                }
            }

            const finalPrice = price !== undefined
                ? Number(price)
                : Number(product.price);

            const finalDiscount = price_with_discount !== undefined
                ? Number(price_with_discount)
                : Number(product.price_with_discount);

            if (
                price !== undefined &&
                (
                    price === null ||
                    price === '' ||
                    !Number.isFinite(finalPrice) ||
                    finalPrice < 0
                )
            ) {
                return response.status(400).json({
                    mensagem: 'O preço deve ser um número maior ou igual a zero.'
                });
            }

            if (
                price_with_discount !== undefined &&
                (
                    price_with_discount === null ||
                    price_with_discount === '' ||
                    !Number.isFinite(finalDiscount) ||
                    finalDiscount < 0
                )
            ) {
                return response.status(400).json({
                    mensagem: 'O preço com desconto deve ser um número válido e maior ou igual a zero.'
                });
            }

            if (finalDiscount > finalPrice) {
                return response.status(400).json({
                    mensagem: 'O preço com desconto não pode ser maior que o preço original.'
                });
            }

            if (
                stock !== undefined &&
                (!Number.isInteger(Number(stock)) || Number(stock) < 0)
            ) {
                return response.status(400).json({
                    mensagem: 'O estoque deve ser um número inteiro maior ou igual a zero.'
                });
            }

            if (
                (enabled !== undefined && typeof enabled !== 'boolean') ||
                (use_in_menu !== undefined && typeof use_in_menu !== 'boolean')
            ) {
                return response.status(400).json({
                    mensagem: 'Os campos enabled e use_in_menu devem ser booleanos.'
                });
            }

            if (name !== undefined) product.name = name.trim();
            if (slug !== undefined) product.slug = slug.trim();
            if (enabled !== undefined) product.enabled = enabled;
            if (use_in_menu !== undefined) product.use_in_menu = use_in_menu;
            if (stock !== undefined) product.stock = Number(stock);
            if (description !== undefined) product.description = description;
            if (price !== undefined) product.price = finalPrice;

            if (price_with_discount !== undefined) {
                product.price_with_discount = finalDiscount;
            }

            await product.save();

            return response.status(200).json({
                mensagem: 'Produto atualizado com sucesso!',
                product
            });

        } catch (error) {
            console.error('Erro ao atualizar produto:', error);

            return response.status(500).json({
                mensagem: 'Erro ao atualizar produto.'
            });
        }
    }

    // Excluir produto
    static async delete(request, response) {
        try {
            const { id } = request.params;

            const product = await Product.findByPk(id);

            if (!product) {
                return response.status(404).json({
                    mensagem: 'Produto não encontrado.'
                });
            }

            await product.destroy();

            return response.status(200).json({
                mensagem: 'Produto excluído com sucesso!'
            });

        } catch (error) {
            console.error('Erro ao excluir produto:', error);

            return response.status(500).json({
                mensagem: 'Erro ao excluir produto.'
            });
        }
    }
}

module.exports = ProductController;
