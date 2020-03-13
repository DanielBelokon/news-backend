// TODO: Register: hashing using bcrypt and storing
const bcrypt = require("bcrypt");
const userModel = require("./models/user");

async function getUserByUsername(username) {
    return userModel.findOne({ username: username }).exec();
};

async function getUserById(id) {
    return userModel.findById(id).exec();
}

async function getUserByEmail(email) {
    return userModel.findOne({ email: email }).exec();
}

async function registerUser(username, password, email, handleError) {
    console.log("Data registering new user...")
    var user = new userModel({
        username: username,
        password: await bcrypt.hash(password, 10),
        email: email
    });
    await user.save(function (err, user) {
        if (err) {
            handleError(err)
        } else {
            return user;
        }
    });
    return user;
}

// User Authentication Check:
// Method for the middle tier to authenticate a user with the data tier - using bcrypt compare & save to express session with passport on success
// takes username, password, and passport's 'done' method which itself takes (error, user, message)
async function authenticateUser(username, password, done) {
    var user = await getUserByUsername(username);
    if (user == null) {
        console.log(user)
        return done(null, false, { message: "User not found" })
    }
    try {
        // Compare password(plain text) with user.password (encrypted & salted from the DB object)
        if (await bcrypt.compare(password, user.password)) {
            console.log(user.username + " logged in");
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

module.exports = {
    authenticateUser: authenticateUser,
    registerUser: registerUser
}