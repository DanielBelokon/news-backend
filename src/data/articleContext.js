const articleModel = require("./models/article");
const httpError = require("http-errors");

function getById(id) {
    return articleModel.findById(id).exec();
}

function getByTopic(topic) {
    return articleModel.find({ topic: topic }).exec();
}

function getAll(id, count) {
    return articleModel.find({}).exec();
}

function getByPage(topic) {
    throw new Error("Not Implemented");
}

function getByAuthor(authorId) {
    return articleModel.find({userId: authorId}).exec();
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
        topic: article.topic || "News"
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

module.exports = {
    create: create,
    getById: getById,
    getByPage: getByPage,
    getAll: getAll,
    getByTopic: getByTopic
}

