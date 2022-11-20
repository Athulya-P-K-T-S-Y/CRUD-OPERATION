const jwt = require('jsonwebtoken');
const {CustomAPIError} = require('../error/custom_error')

const authenticate = async (req, res, next) => {
    // check header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new CustomAPIError('Authentication invalid');
    }

    //verify token
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // attach the user to the book routes
        req.user = { userId: payload.userId, name: payload.name };
        next();
    } catch (error) {
        throw new CustomAPIError('Authentication invalid');
    }
};

module.exports = authenticate;