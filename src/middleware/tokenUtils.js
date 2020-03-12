const jwt = require("jsonwebtoken");

const secret = process.env.AUTH_SECRET || "please2dontuseme";

function generateToken(user) {
    // Map the data to the correct format 
    // (Should already be mapped like this, but we want to prevent unwated data passing in the jwt)
    const data = {
        _id: user._id,
        name: user.username,
        email: user.email,
        role: user.role
    };
    const expiration = '30d';
    return jwt.sign(data, secret, { expiresIn: expiration });
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