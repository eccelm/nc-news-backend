const connection = require('../db/connection');

const fetchArticleComments = (article_id, sort_by, order) => {
	return connection
		.select('*')
		.from('comments')
		.orderBy(sort_by || 'created_at', order)
		.returning('*')
		.where('article_id', '=', article_id);
};

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
	return connection.del().from('comments').where({ comment_id }).returning('*');
};

module.exports = {
	fetchArticleComments,
	addCommentToArticle,
	updateComment,
	removeComment,
};
