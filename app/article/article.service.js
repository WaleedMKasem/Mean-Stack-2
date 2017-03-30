// Load the module dependencies
const mongoose = require('mongoose');
const Article = mongoose.model('Article');

exports.getArticles = function(pageIndex = 1, pageSize = 10) {
	// Use the model 'find' method to get a list of articles
	return Article.find().sort('-createdOn')
		.skip((pageIndex - 1) * pageSize).limit(pageSize).exec();
};

exports.getArticleById = function(articleId, callback) {
	// Use the model 'find' method to get a list of articles
	return Article.findById(articleId);
};

// Create a new controller method that delete an existing article
exports.removeArticle = function(articleId) {

	return Article.remove({
		_id: articleId
	});
};

exports.addArticle = function(article) {
	// Create a new article object
	const articleModel = new Article(article);
	return articleModel.save();
};

exports.replaceArticle = function(articleId, article) {
	return Article.findByIdAndUpdate(articleId, article, {
		new: true
	});
};

// exports.updateArticle = function(articleId, article) {
// 	module.exports.getArticleById(articleId, (err, result) => {

// 		// Update the article fields
// 		result.title = article.title;
// 		result.summery = article.summery;
// 		// Try saving the updated article
// 		return result.save();
// 	});


// };