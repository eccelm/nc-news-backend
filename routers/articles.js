const articlesRouter = require('express').Router();
const {send405} = require('../controllers/errors')
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

articlesRouter.route('/').get(getAllArticles).post(postNewArticle).all(send405);

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

