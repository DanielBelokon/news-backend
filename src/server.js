const express = require("express");
const articleRouter =  require("./routes/article");
const authRouter =  require("./routes/auth");

const app = express();

app.use("/article", articleRouter);
app.use("/auth", authRouter);

app.use("/", (req, res, next) => res.send({hello: "Hello World!"}));

app.use((req, res, next) =>
{
    const err = new Error("Not Found");
    err.status = 404;

    next(err);
});

app.use((err, req, res, next) =>
{
    res.status(err.status || 500).json({
        err: err.message || "Something's wrong"
    });
});

app.listen(5000, console.log("Started listening..."));