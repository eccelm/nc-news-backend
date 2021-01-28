const connection = require('../db/connection');

const fetchArticleComments = () => {};

const addCommentToArticle = (newComment) => {
	return connection.insert(newComment).into('comments').returning('*');
};

const updateComment = (inc_votes, comment_id) => {
	return connection
		.increment('votes', inc_votes)
		.into('comments')
		.where('comment_id', comment_id)
		.returning('*');
};

const removeComment = (comment_id) => {
	return connection.del().from('comments').where({ comment_id });
};

module.exports = {
	fetchArticleComments,
	addCommentToArticle,
	updateComment,
	removeComment,
};
