const userContext = require("../../data/userContext");
const tokenUtils = require("./tokenUtils");

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
            if (role == null) {
                next();
            } else {
                if (tokenContent.role === role) {
                    next();
                }
                else {
                    next(new Error("User not in role " + role))
                }
            }
        }

        return next(new Error("Something went wrong"));
    }
}

async function register(req, res, next) {
    // Use data layer to register a new user with passed credentials
    console.log("middleware registering new user..." + req.body.username)
    const user = await userContext.registerUser(
        req.body.username,
        req.body.password,
        req.body.email,
        function (err) {
            if (err){
                next(err);
            }
        }
    );
    // Check if user was successfully added and return success
    // if not return error
    if (user != null) {
        console.log("middleware reports user registered.");
        res.json({
            success: true
        });
    }
    else {
        next(new Error("Something went wrong, try again later."));
    }
}

async function login(req, res, next) {
    // Authenticate user using userContext (compare passwords)
    // If successful use callback to generate & send a jw token with the needed creds
    await userContext.authenticateUser(req.body.username, req.body.password, function (err, user, options) {
        if (err == null) {
            if (!user){
                return next(new Error(options.message));
            }
            const token = tokenUtils.generateToken({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            });
            return res.json(token);
        } else {
            return next(err);
        }
    });
}

function setUserRole(user) {

}

exports.isAuthenticated = isAuthenticated;
exports.register = register;
exports.login = login;