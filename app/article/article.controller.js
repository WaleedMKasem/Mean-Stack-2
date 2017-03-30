// Load the module dependencies
const mongoose = require('mongoose');
const Article = mongoose.model('Article');
const articleService = require('./article.service');

// Create a new error handling controller method
const sendError = require('../../config/common').sendError;
// Create a new controller method that creates new articles
exports.create = function(req, res) {

    articleService.addArticle(req.body)
        .then(result => res.json(result))
        .error(err => res.json(err));
};

// Create a new controller method that retrieves a list of articles
exports.list = function(req, res) {
    articleService.getArticles(req.pageIndex, req.pageSize)
        .then(articles => res.json(articles))
};

// Create a new controller method that returns an existing article
exports.read = function(req, res) {

    const articleId = req.params.articleId;
    articleService.getArticleById(articleId)
        .then(article => res.json(article));
};

// Create a new controller method that updates an existing article
exports.update = function(req, res) {
    // Get the article from the 'request' object
    const articleId = req.params.articleId;

    // Update the article fields
    articleService.replaceArticle(articleId, req.body)
        .then(result => res.json(result._id.toString() === articleId))
        .catch(err => res.status(400).json(err));
};

// Create a new controller method that delete an existing article 
exports.delete = function(req, res) {

    articleService.removeArticle(req.article._id)
        .then(result => res.json(result.result.ok === 1))
};

// Create a new controller middleware that retrieves a single existing article
exports.articleById = function(req, res, next, id) {

    articleService.getArticleById(id).then(article => {

        if (!article) return next(new Error('Failed to load article ' + id));
        req.article = article
        next();
    })
};