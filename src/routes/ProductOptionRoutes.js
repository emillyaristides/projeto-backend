
const express = require('express');
const router = express.Router();

const ProductOptionController = require('../controllers/ProductOptionController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Opções dos Produtos
 *   description: Gerenciamento de opções dos produtos
 */

/**
 * @swagger
 * /product-options:
 *   post:
 *     summary: Cadastrar opção do produto
 *     tags: [Opções dos Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *               title:
 *                 type: string
 *               shape:
 *                 type: string
 *               radius:
 *                 type: integer
 *               type:
 *                 type: string
 *               values:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Opção cadastrada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', auth, ProductOptionController.create);

/**
 * @swagger
 * /product-options:
 *   get:
 *     summary: Listar opções
 *     tags: [Opções dos Produtos]
 *     responses:
 *       200:
 *         description: Lista de opções
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', ProductOptionController.findAll);

/**
 * @swagger
 * /product-options/{id}:
 *   get:
 *     summary: Buscar opção pelo ID
 *     tags: [Opções dos Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Opção encontrada
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Opção não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', ProductOptionController.findById);

/**
 * @swagger
 * /product-options/{id}:
 *   put:
 *     summary: Atualizar opção
 *     tags: [Opções dos Produtos]
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
 *               product_id:
 *                 type: integer
 *               title:
 *                 type: string
 *               shape:
 *                 type: string
 *               radius:
 *                 type: integer
 *               type:
 *                 type: string
 *               values:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Opção atualizada
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Opção não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', auth, ProductOptionController.update);

/**
 * @swagger
 * /product-options/{id}:
 *   delete:
 *     summary: Excluir opção
 *     tags: [Opções dos Produtos]
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
 *         description: Opção excluída
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Opção não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', auth, ProductOptionController.delete);

module.exports = router;
