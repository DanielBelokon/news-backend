const mdb = require("mongoose");

// Article Schema Model
const articleSchema = mdb.Schema({
    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    authorPseudoNym: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    topic: {
        type: String,
        default: "News"
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mdb.model("article", articleSchema);