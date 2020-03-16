const { articleContext } = require("../data");


async function getAll(req, res, next) {
    try {
        var articles = await articleContext.getAll();
        return res.json(articles);
    } catch (err) {
        return next(err);
    }
}

async function create(req, res, next) {
    var article = {
        title: req.body.title,
        body: req.body.body,
        authorPseudonym: req.body.authorPseudonym,
        userId: req.user._id,
        topic: req.body.topic
    }
    try {
        var createdArticle = await articleContext.create(article);
        return res.json(createdArticle);
    } catch (err) {
        return next(err);
    }
}

function update(req, res, next) {
    articleContext.update();
}

function deleteArticle(req, res, next) {
    articleContext.deleteArticle();
}

async function get(req, res, next) {
    try {
        var article = await articleContext.getById(req.params.id);
        return res.json(article);
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    getAll: getAll,
    create: create,
    update: update,
    deleteArticle: deleteArticle,
    get: get
}