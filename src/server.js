const express = require("express");

// Load routers 
const articleRouter = require("./routes/article");
const authRouter = require("./routes/auth");

const services = require("./middleware");

// check if in Production, if not - load dotenv
if (process.env.NODE_ENV !== "Production") {
    console.log("Dev env, loading dotenv");
    require('dotenv').config();
}

services.configServices(process.env.DB_CONNECTION);

const app = express();
app.use(express.json());
app.disable('x-powered-by');
// Set up routes - pipeline start
app.use("/article", articleRouter);
app.use("/auth", authRouter);

// If we've reached this far without an error or response, the resource was not found.
app.use('*', (req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;

    next(err);
});

// If we've reaced this far without an error or response - something went terribly wrong.
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        err: err.message || "Something's wrong"
    });
});


app.listen(process.env.PORT, console.log("Started listening on " + process.env.PORT));