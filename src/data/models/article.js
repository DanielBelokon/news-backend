const mdb = require("mongoose");

// Article Schema Model
const articleSchema = mdb.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    authorPseudoNym: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
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