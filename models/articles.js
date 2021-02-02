const connection = require('../db/connection');

const fetchAllArticles = (
	sort_by = 'created_at',
	order = 'desc',
	author,
	topic,
	limit,
	p
) => {
	return connection
		.select('articles.*')
		.from('articles')
		.leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
		.count('comments.comment_id AS comment_count')
		.limit(parseInt(limit) || 10)
		.groupBy('articles.article_id')
		.modify((queryBuilder) => {
			if (author) {
				queryBuilder.where('articles.author', '=', author);
			}
			if (topic) {
				queryBuilder.where('articles.topic', '=', topic);
			}
			if (p > 1) {
				queryBuilder.offset(
					parseInt(limit) * parseInt(p - 1) || 10 * parseInt(p - 1)
				);
			}
		})
		.orderBy(sort_by, order)
		.then((articles) => {
			return articles;
		});
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

const updateArticle = (inc_votes, article_id) => {

	return connection
		.increment('votes', inc_votes)
		.into('articles')
		.where('article_id', '=', article_id)
		.returning('*');
};

const removeArticle = (article_id) => {
	return connection('articles').del().where({ article_id }).returning('*');
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
