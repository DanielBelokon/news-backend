const mdb = require("mongoose");

// User Schema Model
const userSchema = mdb.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date
    },
    email: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        default: "user"
    }
});

module.exports = mdb.model("user", userSchema);