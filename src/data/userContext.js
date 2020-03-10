// TODO: Register: hashing using bcrypt and storing
const bcrypt = require("bcrypt");
const user = require("./models/user")

function getUserByUsername(username) {
    throw new Error("Not implemented.");
}

function getUserById(id) {
    throw new Error("Not implemented.");
}

function getUserByEmail(email) {
    throw new Error("Not implemented.");
}

function registerUser(username, password, email) {

    throw new Error("Not implemented.");
    // Storing in DB, hashing password with bcrypt

}

// User Authentication Check:
// Method for the middle tier to authenticate a user with the data tier - using bcrypt compare & save to express session with passport on success
// takes username, password, and passport's 'done' method which itself takes (error, user, message)
function authenticateUser(username, password, done) {
    const user = getUserByUsername(username);
    if (user == null) {
        // if user not found - use passport's 'done' function to return message
        return done(null, false, { message: "User not found" })
    }
    try {
        // Compare password(plain text) with user.password (encrypted & salted from the DB object)
        if (await bcrypt.compare(password, user.password)) {
            return done(null, user);
        } else {
            return done(null, false, { message: "Password incorrect" });
        }
    } catch (e) {
        // Something went wrong with bcrypt compare, return the error.
        return done(e);
    }
    // If you're all the way down here, something went really wrong.
    return done(new Error("Something went wrong"));
}

exports.authenticateUser = authenticateUser;
exports.registerUser = registerUser;