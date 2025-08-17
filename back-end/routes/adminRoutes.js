const express = require('express');
const router = express.Router();

const { loginAdmin } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const verificarAdmin = require('../middlewares/verificarAdmin');

/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Gerenciamento de administradores
 */

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Realiza o login de um administrador
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do administrador.
 *               senha:
 *                 type: string
 *                 description: Senha do administrador.
 *     responses:
 *       200:
 *         description: Login bem-sucedido. Retorna um token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticação JWT.
 *       401:
 *         description: Credenciais inválidas.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post('/login', loginAdmin);

/**
 * @swagger
 * /admin/painel:
 *   get:
 *     summary: Acessa o painel do administrador
 *     tags: [Admin]
 *     description: Endpoint protegido para administradores. Retorna uma mensagem de boas-vindas.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acesso permitido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de boas-vindas com o email do administrador.
 *       401:
 *         description: Não autorizado (token não fornecido ou inválido).
 *       403:
 *         description: Proibido (não é um administrador).
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/painel', authMiddleware, verificarAdmin, (req, res) => {
  res.status(200).send(`Bem-vindo, administrador: ${req.user.email}`);
});

module.exports = router;
