const articleModel = require("./models/article");
const httpError = require("http-errors");

const DEFAULT_ART_COUNT = 15;

function getById(id) {
    return articleModel.findById(id).lean().exec();
}

function getByTopic(topic, page, count) {
    count = count || DEFAULT_ART_COUNT;
    page = page || 0;

    return articleModel.find({ topic: topic })
        .sort({ date: "desc" }) // Sort by descending date
        .limit(count) // Limit to amount per page
        .skip(count * page) // 'Skip' to correct page
        .lean()
        .exec();
}

function getAll(page, count) {
    count = count || DEFAULT_ART_COUNT;
    page = page || 0;

    return articleModel.find({})
        .sort({ date: "desc" }) // Sort by descending date
        .limit(count) // Limit to amount per page
        .skip(count * page) // 'Skip' to correct page
        .lean()
        .exec();
}

function getByAuthor(authorId) {
    return articleModel.find({ userId: authorId }).lean().exec();
}

async function create(article) {
    if (!article) {
        return Promise.reject();
    }
    console.log(article);
    var newArticle = articleModel({
        title: article.title,
        body: article.body,
        authorPseudonym: article.authorPseudonym,
        userId: article.userId,
        topic: article.topic || "News",
        featured: article.featured
    });
    try {
        var createdArticle = await newArticle.save();
        return Promise.resolve(createdArticle);
    } catch (err) {
        console.error(err);
        newErr = httpError.InternalServerError("Something went wrong with the database, try again later.");
        return Promise.reject(newErr);
    }
}

async function update(articleUpdates) {
    try {
        var article = await articleModel.findById(articleUpdates._id).exec();
        if (!article) return Promise.reject(httpError.NotFound());
        Object.assign(article, articleUpdates);

        console.log(article);
        return article.save();
    } catch (err) {
        console.error(err);
        newErr = httpError.InternalServerError("Something went wrong with the database, try again later.");
        return Promise.reject(newErr);
    }
}

async function deleteArticle(articleId) {
    try {
        var article = await articleModel.findByIdAndDelete(articleId);
        if (!article) return Promise.reject(httpError.NotFound());
        else return article;
    } catch (err) {
        return Promise.reject(err)
    }
}

module.exports = {
    create: create,
    getById: getById,
    getAll: getAll,
    getByTopic: getByTopic,
    getByAuthor: getByAuthor,
    update: update,
    deleteArticle: deleteArticle
}

