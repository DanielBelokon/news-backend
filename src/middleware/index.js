const connectDb = require("../data").connectDb;

function configServices(dbUrl) {
    connectDb(dbUrl);
}

module.exports = {
    configServices: configServices,
    userService: require("./userService"),
    articleService: require("./articleService"),
    tokenUtils: require("./tokenUtils")
}