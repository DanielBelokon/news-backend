const connectDb = require("../data").connectDb;

function configServices(dbUrl) {
    connectDb(dbUrl);
}

exports.configServices = configServices;