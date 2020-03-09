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

    // Check if user was successfully added and redirect to login page (not logged in yet),
    // if not return error
    if (user != null) {
        res.redirect("/login");
    }
    else {
        next(new Error("Something went wrong, try again later."));
    }
}

function login(req, res, next) {
    // Login through passport strategy, which uses authContext to authenticate
    passport.authenticate("local", {})(req, res, next){
        // If successfuly authenticated redirect to home page
        res.redirect("/");
    }

    });
    throw new Error("Not Implemented");
}

exports.isAuthenticated = isAuthenticated;