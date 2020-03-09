const authContext = require("../../data/authContext")
const passport = require("passport");

function isAuthenticated(req, res, next) {
    next(new Error("Not Implemented"));
}

function register(req, res, next) {
    // Use data layer to register a new user with passed credentials
    const user = authContext.registerUser(
        req.body.username,
        req.body.password,
        req.body.email
    );

    // Check if user was successfully added and return success
    // if not return error
    if (user != null) {
        res.json({
            success: true
        });
    }
    else {
        next(new Error("Something went wrong, try again later."));
    }
}

function login(req, res, next) {
    // Login through passport strategy, which uses authContext to authenticate
    passport.authenticate("local", {})(req, res, next){
        // If successfuly authenticated - todo: check what needs to be returned on passport.authenticate success
        return next();
    }

    });
    throw new Error("Not Implemented");
}

exports.isAuthenticated = isAuthenticated;