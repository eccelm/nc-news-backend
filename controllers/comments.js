const { updateComment, removeComment } = require('../models/comments');

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
	removeComment(comment_id).then(() => {
		res.sendStatus(204);
	});
};

module.exports = { patchComment, deleteComment };