const connection = require('../db/connection');

const fetchAllArticles = () => {
	return connection
	.select('articles.*')
	.from('articles')
	.leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
	.count('comments.comment_id AS comment_count')
	.groupBy('articles.article_id')
	.then((articles)=> {
		return articles
	})
};

const fetchArticleById = (article_id) => {
	return connection
		.select('articles.*')
		.count('comments.comment_id AS comment_count')
		.from('articles')
		.leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
		.groupBy('articles.article_id')
		.where('articles.article_id', '=', article_id)
		.then((article) => {
			return article[0];
		});
};

const updateArticle = (reqBody, article_id) => {
	const { inc_votes } = reqBody;
	return connection
		.increment('votes', inc_votes)
		.into('articles')
		.where('article_id', '=', article_id)
		.returning('*');
};

const removeArticle = (article_id) => {
	return connection('articles').del().where({ article_id });
};

const addNewArticle = (newArticle) => {
	return connection.insert(newArticle).into('articles').returning('*');
};

module.exports = {
	removeArticle,
	fetchAllArticles,
	fetchArticleById,
	addNewArticle,
	updateArticle,
};
