const {
	fetchArticleComments,
	addCommentToArticle,
	updateComment,
	removeComment,
} = require('../models/comments');

const getArticleComments = (req, res, next) => {
	const { article_id } = req.params;
	const { sort_by } = req.query;
	const { order } = req.query;

	fetchArticleComments(article_id, sort_by, order)
		.then((comments) => {
			res.status(200).send({ comments });
		})
		.catch(next);
};

const postCommentToArticle = (req, res, next) => {
	const { article_id } = req.params;
	const { body, username } = req.body;
	const newComment = { author: username, article_id, body };

	addCommentToArticle(newComment)
		.then((newComment) => {
			res.status(201).send({ comment: newComment[0] });
		})
		.catch(next);
};

const patchComment = (req, res, next) => {
	const { inc_votes } = req.body;
	const { comment_id } = req.params;

	updateComment(inc_votes, comment_id)
		.then((updatedComment) => {
			res.status(202).send({ comment: updatedComment[0] });
		})
		.catch(next);
};

const deleteComment = (req, res, next) => {
	const { comment_id } = req.params;
	removeComment(comment_id)
		.then(() => {
			res.sendStatus(204);
		})
		.catch(next);
};

module.exports = {
	getArticleComments,
	postCommentToArticle,
	patchComment,
	deleteComment,
};
