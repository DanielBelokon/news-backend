
function getAll(req, res, next)
{
    next();
}

function create(req, res, next)
{
    next();
}

function update(req, res, next)
{
    next();
}

function deleteArticle(req, res, next)
{
    next();
}

function get(req, res, next)
{
    res.send("whaTTHEHECK");
}

exports.getAll = getAll;
exports.create = create;
exports.update = update;
exports.deleteArticle = deleteArticle;
exports.get = get;