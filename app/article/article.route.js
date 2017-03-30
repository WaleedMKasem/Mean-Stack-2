
const articles = require('./article.controller');

module.exports = function(app) {

    app.route('/api/article')
        .post(articles.create);
        
    app.route('/api/article/:articleId')
        .get(articles.read)
        .put(articles.update)
        .delete(articles.delete);


    app.route('/api/articles')
        .get(articles.list);

    app.param('articleId', articles.articleById);

};