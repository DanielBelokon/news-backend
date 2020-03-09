const mdb = require("mongoose");

// User Schema Model
const userSchema = mdb.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    lastLogin {
        type: Date,
    },
    email: {
        type: String
    },
    role: {
        type: String,
        default: "user"
    }
});

module.exports = mdb.model("user", userSchema);