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
	if (!inc_votes) {
		res.status(400).send({ msg: 'Bad Request, no vote has been received' });
	} else {
		updateComment(inc_votes, comment_id)
			.then((updatedComment) => {
				if (!updatedComment[0]) {
					return Promise.reject({
						status: 404,
						msg: `No comment exists with an ID of: ${comment_id}`,
					});
				}
				res.status(202).send({ comment: updatedComment[0] });
			})
			.catch(next);
	}
};

const deleteComment = (req, res, next) => {
	const { comment_id } = req.params;

	removeComment(comment_id)
		.then((comment) => {
			if (!comment[0]) {
				return Promise.reject({
					status: 404,
					msg: `No comment exists with an ID of: ${comment_id}`,
				});
			}
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
