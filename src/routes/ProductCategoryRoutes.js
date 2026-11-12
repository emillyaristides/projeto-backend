
const express = require('express');
const router = express.Router();

const ProductCategoryController = require('../controllers/ProductCategoryController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Categorias dos Produtos
 *   description: Associação entre produtos e categorias
 */

/**
 * @swagger
 * /product-categories:
 *   post:
 *     summary: Associar categoria ao produto
 *     tags: [Categorias dos Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - category_id
 *             properties:
 *               product_id:
 *                 type: integer
 *               category_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Categoria associada ao produto
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Produto ou categoria não encontrado
 *       409:
 *         description: Associação já existente
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', auth, ProductCategoryController.create);

/**
 * @swagger
 * /product-categories/{product_id}:
 *   get:
 *     summary: Listar categorias de um produto
 *     tags: [Categorias dos Produtos]
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categorias do produto
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:product_id', ProductCategoryController.findByProduct);

/**
 * @swagger
 * /product-categories/{product_id}/{category_id}:
 *   delete:
 *     summary: Remover associação entre produto e categoria
 *     tags: [Categorias dos Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: category_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Associação removida com sucesso
 *       400:
 *         description: IDs inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Produto, categoria ou associação não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:product_id/:category_id', auth, ProductCategoryController.delete);

module.exports = router;
