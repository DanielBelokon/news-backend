const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "pleasedontuseme";

function generateToken(user) {
    const data = {
        _id: user._id,
        name: user.username,
        email: user.email,
        role: user.role
    };
    const expiration = '30d';
    return jwt.sign(data, signature, { expiresIn: expiration });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, secret);
    } catch (e) {
        return null;
    }
}

// Extract token middleware (?)
function getToken(req) {
    const header = req.headers['authorization'];

    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        return token;
    } else {
        return null;
    }
}

exports.getToken = getToken;
exports.verifyToken = verifyToken;
exports.generateToken = generateToken;