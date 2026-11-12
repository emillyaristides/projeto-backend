
require('dotenv').config();

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const UserRoutes = require('./routes/UserRoutes');
const CategoryRoutes = require('./routes/CategoryRoutes');
const ProductRoutes = require('./routes/ProductRoutes');
const ProductImageRoutes = require('./routes/ProductImageRoutes');
const ProductOptionRoutes = require('./routes/ProductOptionRoutes');
const ProductCategoryRoutes = require('./routes/ProductCategoryRoutes');
const AuthRoutes = require('./routes/AuthRoutes');

const app = express();
const port = 3000;

// Permitir receber dados em JSON
app.use(express.json());

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota inicial
app.get('/', (request, response) => {
    response.json({
        mensagem: 'API do projeto Backend funcionando!'
    });
});

// Rotas de usuários
app.use('/users', UserRoutes);
app.use('/categories', CategoryRoutes);

// Rotas de produtos
app.use('/products', ProductRoutes);

// Rotas de imagens dos produtos
app.use('/product-images', ProductImageRoutes);
app.use('/product-options', ProductOptionRoutes);
app.use('/product-categories', ProductCategoryRoutes);
app.use('/auth', AuthRoutes);

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
