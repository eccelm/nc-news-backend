const articlesRouter = require('express').Router();

const {
	getAllArticles,
	getArticleById,
	patchArticle,
	deleteArticle,
	postNewArticle,
} = require('../controllers/articles');

const {
	getArticleComments,
	postCommentToArticle,
} = require('../controllers/comments');

articlesRouter.route('/').get(getAllArticles).post(postNewArticle);

articlesRouter
	.route('/:article_id')
	.get(getArticleById)
	.patch(patchArticle)
	.delete(deleteArticle);

articlesRouter
	.route('/:article_id/comments')
	.get(getArticleComments)
	.post(postCommentToArticle);

module.exports = articlesRouter;

/*

GET /api/articles/:article_id
GET /api/articles/:article_id/comments
GET /api/articles

POST /api/articles
POST /api/articles/:article_id/comments
DELETE /api/articles/:article_id
PATCH /api/articles/:article_id
*/
