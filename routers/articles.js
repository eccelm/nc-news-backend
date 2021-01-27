const articlesRouter = require('express').Router();

const {
	getAllArticles,
	getArticleById,
	getArticleComments,
	patchArticle,
	postCommentToArticle,
	deleteArticle,
	postNewArticle,
} = require('../controllers/articles');

articlesRouter.route('/:article_id').get(getArticleById).patch(patchArticle);
// 	.delete(deleteArticle);

// articlesRouter
// 	.route('/:article_id/comments')
// 	.get(getArticleComments)
// 	.post(postCommentToArticle);

articlesRouter.route('/').get(getAllArticles).post(postNewArticle);

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
