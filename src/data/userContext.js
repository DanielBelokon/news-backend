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
/**
 * Register a new user with the given username, password and email to the DB, 
 * Encrypt the password using bcrypt.hash, saving using mongoose Model.save
 * to be used async (with await)
 * @param {string} username
 * @param {string} password
 * @param {string} email
 * @returns Promise to resolve a User document, or reject with an error
 */
async function registerUser(username, password, email) {
    if (!username || !password || !email) {
        return Promise.reject(httpError.BadRequest("One of the parameters is missing"));
    }
    var user = new userModel({
        username: username,
        password: await bcrypt.hash(password, 10),
        email: email
    });
    return user.save();
}
/**
 * Authenticates user with given params against the DB,
 * Using bcrypt.compare & userContext.getUserByUsername
 * @param {string} username the unique username
 * @param {string} password the password associated with the user
 * @returns A promise to resolve the User that was found, or a rejection with the error
 */
async function authenticateUser(username, password) {
    var user = await getUserByUsername(username);
    return new Promise(async (resolve, reject) => {
        if (user == null) {
            reject(httpError.NotFound("No user by that name"));
        } else {
            try {
                if (await bcrypt.compare(password, user.password)) {
                    user.lastLogin = Date.now();
                    await user.save();
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