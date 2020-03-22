const { articleContext } = require("../data");
const httpError = require("http-errors");


async function getAll(req, res, next) {
    try {
        var page = req.params.page, count = req.params.count;

        var articles = await articleContext.getAll(
            isNaN(page) ? null : parseInt(page),  // If number pass value, if not pass null
            isNaN(count) ? null : parseInt(count) // (So default value is assigned in context) 
        );
        return res.json(articles);
    } catch (err) {
        return next(err);
    }
}

async function create(req, res, next) {
    var article = {
        title: req.body.title,
        body: req.body.body,
        summary: req.body.summary,
        authorPseudonym: req.body.authorPseudonym,
        userId: req.user._id,
        topic: req.body.topic,
        imageUrl: req.body.imageUrl,
        featured: req.body.featured
    }
    try {
        var createdArticle = await articleContext.create(article);
        return res.json(createdArticle);
    } catch (err) {
        return next(err);
    }
}

async function update(req, res, next) {
    var body = req.body;
    var articleUpdates = {
        _id: req.params.id
    };

    /* TODO: Refactor this fucking mess somehow
    * (If copied without check, update() will try to overide any missing fields with undefined and fail)
    * need to look into creating an array of 'user inputable' fields to iterate over it 
    * both here and in other funcs in articleService
    */
    if (typeof body.body != 'undefined') articleUpdates.body = body.body;
    if (typeof body.title != 'undefined') articleUpdates.title = body.title;
    if (typeof body.authorPseudonym != 'undefined') articleUpdates.authorPseudonym = body.authorPseudonym;
    if (typeof body.topic != 'undefined') articleUpdates.topic = body.topic;
    if (typeof body.featured != 'undefined') articleUpdates.featured = body.featured;

    console.log(articleUpdates);
    try {
        article = await articleContext.update(articleUpdates);
        return res.json(article);
    } catch (err) {
        return next(err);
    }
}

async function deleteArticle(req, res, next) {
    var id = req.params.id;
    try {
        var article = await articleContext.deleteArticle(id);
        console.log(article);
        return res.json({ success: `Deleted article titled "${article.title}", by author ${article.authorPseudonym}` });
    } catch (err) {
        next(err);
    }
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