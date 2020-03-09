
function isAuthenticated(req, res, next)
{
    next(new Error("Not Implemented"));
}

exports.isAuthenticated = isAuthenticated;