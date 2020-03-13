const mdb = require("mongoose");

const connectDb = (dbUrl) => {
    return mdb.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true});
};

module.exports = {
    connectDb: connectDb,
    userContext: require("./userContext"),
    articleContext: require("./articleContext")
}