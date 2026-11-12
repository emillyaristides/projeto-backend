
const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Autenticação de usuários
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realizar login
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               password:
 *                 type: string
 *                 example: sua_senha
 *     responses:
 *       200:
 *         description: Login realizado com sucesso. Retorna o token JWT.
 *       400:
 *         description: E-mail e senha são obrigatórios
 *       401:
 *         description: E-mail ou senha inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/login', AuthController.login);

module.exports = router;
