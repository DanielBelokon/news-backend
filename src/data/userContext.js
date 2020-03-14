const bcrypt = require("bcrypt");
const userModel = require("./models/user");
const httpError = require("http-errors");

async function getUserByUsername(username) {
    return userModel.findOne({ username: username }).exec();
};

async function getUserById(id) {
    return userModel.findById(id).exec();
}

async function getUserByEmail(email) {
    return userModel.findOne({ email: email }).exec();
}

async function registerUser(username, password, email) {
    var user = new userModel({
        username: username,
        password: await bcrypt.hash(password, 10),
        email: email
    });
    return user.save();
}

// User Authentication Check:
// Method for the middle tier to authenticate a user with the data tier - using bcrypt compare & save to express session with passport on success
// takes username, password, and passport's 'done' method which itself takes (error, user, message)
async function authenticateUser(username, password) {
    var user = await getUserByUsername(username);
    return new Promise(async (resolve, reject) => {
        if (user == null) {
            reject(httpError.NotFound("No user by that name"));
        } else {
            try {
                if (await bcrypt.compare(password, user.password)) {
                    resolve(user);
                } else {
                    reject(httpError.Unauthorized("Password incorrect"));
                }
            } catch (err){
                reject(err);
            }
        }
    });
}

module.exports = {
    authenticateUser: authenticateUser,
    registerUser: registerUser
}