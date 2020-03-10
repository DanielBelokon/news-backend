const mdb = require("mongoose");

const connectDb = (dbUrl) => {
    return mdb.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true});
};

exports.connectDb = connectDb;