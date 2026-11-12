
const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Gerenciamento de produtos
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cadastrar produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               enabled:
 *                 type: boolean
 *               use_in_menu:
 *                 type: boolean
 *               stock:
 *                 type: integer
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               price_with_discount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Produto cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', auth, ProductController.create);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Listar produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
router.get('/', ProductController.findAll);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Buscar produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */
router.get('/:id', ProductController.findById);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualizar produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               enabled:
 *                 type: boolean
 *               use_in_menu:
 *                 type: boolean
 *               stock:
 *                 type: integer
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               price_with_discount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Produto atualizado
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', auth, ProductController.update);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Excluir produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto excluído
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', auth, ProductController.delete);

module.exports = router;
