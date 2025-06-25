const jwt = require('jsonwebtoken');

const generateToken = async (user) => {
    const payload = {
        id: user._id,
        email: user.email,
    };

    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRY });
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        return null;
    }
}

module.exports = { generateToken, verifyToken };