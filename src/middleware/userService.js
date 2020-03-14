const userContext = require("../data/userContext");
const tokenUtils = require("../utils/tokenUtils");

function isAuthenticated(role) {
    // return the middleware function called by Express
    // (This is done to enter the role param in the 'parent' function)
    return function (req, res, next) {
        // Extract token from the HTTP request
        const token = tokenUtils.getToken(req);
        // Check if no token, will be true if correct header was not found as well
        if (token == null) {
            return next(new Error("Token not found"));
        }
        // Check for token secret match and verify content exists (success)
        // Afterwards check for role if was passed in parent function
        const tokenContent = tokenUtils.verifyToken(token);
        if (tokenContent == null) {
            return next(new Error("Token verification failed"));
        }
        else {
            // If no role was entered - simple log-in check
            // If there was a role, compare to user's role
            if (typeof role == 'undefined') {
                return next();
            } else {
                if (tokenContent.role === role) {
                    return next();
                }
                else {
                    return next(new Error("User not in role " + role))
                }
            }
        }

        return next(new Error("Something went wrong"));
    }
}

async function register(req, res, next) {
    // Use data layer to register a new user with passed credentials
    if (typeof req.body == 'undefined') {
        return next(new Error("No user data provided"));
    }
    try {
        const user = await userContext.registerUser(
            req.body.username,
            req.body.password,
            req.body.email);
        console.log(user);
        return res.json({
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

async function login(req, res, next) {
    // Authenticate user using userContext (compare passwords)
    // If successful use callback to generate & send a jw token with the needed creds
    try {
        var user = await userContext.authenticateUser(req.body.username, req.body.password);
    } catch (err) {
        return next(err);
    }
    const token = tokenUtils.generateToken({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    });
    return res.json(token);
}

function setUserRole(user) {
    return new Error("Not Impelemented")
}

module.exports = {
    isAuthenticated: isAuthenticated,
    register: register,
    login: login,
    setUserRole: setUserRole
}