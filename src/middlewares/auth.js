
const jwt = require('jsonwebtoken');

function auth(request, response, next) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({
            mensagem: 'Token não informado.'
        });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return response.status(401).json({
            mensagem: 'Formato do token inválido.'
        });
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        request.user = decoded;

        return next();
    } catch (error) {
        return response.status(401).json({
            mensagem: 'Token inválido ou expirado.'
        });
    }
}

module.exports = auth;
