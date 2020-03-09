
function isAuthenticated(req, res, next)
{
    console.log("Authenticating...");
    res.send("Failed you fuck");
    console.log("Authenticated.");
}

exports.isAuthenticated = isAuthenticated;