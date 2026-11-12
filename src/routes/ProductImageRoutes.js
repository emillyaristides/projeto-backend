
const express = require('express');
const router = express.Router();

const ProductImageController = require('../controllers/ProductImageController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Imagens dos Produtos
 *   description: Gerenciamento de imagens dos produtos
 */

/**
 * @swagger
 * /product-images:
 *   post:
 *     summary: Cadastrar imagem de produto
 *     tags: [Imagens dos Produtos]
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
 *               enabled:
 *                 type: boolean
 *               path:
 *                 type: string
 *     responses:
 *       201:
 *         description: Imagem cadastrada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', auth, ProductImageController.create);

/**
 * @swagger
 * /product-images:
 *   get:
 *     summary: Listar imagens
 *     tags: [Imagens dos Produtos]
 *     responses:
 *       200:
 *         description: Lista de imagens
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', ProductImageController.findAll);

/**
 * @swagger
 * /product-images/{id}:
 *   get:
 *     summary: Buscar imagem pelo ID
 *     tags: [Imagens dos Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Imagem encontrada
 *       404:
 *         description: Imagem não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', ProductImageController.findById);

/**
 * @swagger
 * /product-images/{id}:
 *   put:
 *     summary: Atualizar imagem
 *     tags: [Imagens dos Produtos]
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
 *               enabled:
 *                 type: boolean
 *               path:
 *                 type: string
 *     responses:
 *       200:
 *         description: Imagem atualizada
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Imagem não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', auth, ProductImageController.update);

/**
 * @swagger
 * /product-images/{id}:
 *   delete:
 *     summary: Excluir imagem
 *     tags: [Imagens dos Produtos]
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
 *         description: Imagem excluída
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Imagem não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', auth, ProductImageController.delete);

module.exports = router;
