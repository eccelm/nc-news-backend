const {
	removeArticle,
	fetchAllArticles,
	fetchArticleById,
	updateArticle,
	addNewArticle,
} = require('../models/articles');

const deleteArticle = (req, res, next) => {
	let { article_id } = req.params;

	removeArticle(article_id)
		.then((article) => {
				if (!article[0]) {
					return Promise.reject({
						status: 404,
						msg: `No article was found with an ID of: ${article_id}`,
					});
				}
			res.sendStatus(204);
		})
		.catch(next);
};

const getAllArticles = (req, res, next) => {
	const { sort_by, order, author, topic, limit, p } = req.query;

	fetchAllArticles(sort_by, order, author, topic, limit, p)
		.then((articles) => {
	
			if (articles.length === 0) {
				if(author || topic) {
				return Promise.reject({
					status: 404,
					msg: `No articles exist that match your filters`,
				});
			}
			}
			res.status(200).send({ articles });
		})
		.catch(next);
	
	}

const postNewArticle = (req, res, next) => {
	const { title, body, topic, username: author } = req.body;

	addNewArticle({ title, body, topic, author })
		.then((newArticle) => {
			res.status(201).send({ article: newArticle[0] });
		})
		.catch(next);
};

const getArticleById = (req, res, next) => {
	const { article_id } = req.params;

	fetchArticleById(article_id)
		.then((article) => {
			if (!article) {
				return Promise.reject({
					status: 404,
					msg: `No article was found with an ID of: ${article_id}`,
				});
			}
			res.status(200).send({ article });
		})
		.catch(next);
};

const patchArticle = (req, res, next) => {
	const { article_id } = req.params;
	const {inc_votes} = req.body;
	if (!inc_votes) {
		res.status(400).send({ msg: 'Bad Request, no vote has been received' });
	} else {
	updateArticle(inc_votes, article_id)
		.then((article) => {
			if (!article[0]) {
				return Promise.reject({
					status: 404,
					msg: `No article was found with an ID of: ${article_id}`,
				});
			}
			res.status(202).send({ article: article[0] });
		})
		.catch(next);
}};

module.exports = {
	deleteArticle,
	getAllArticles,
	getArticleById,
	patchArticle,
	postNewArticle,
};

/*
Naming functions CRUD (Create, Read, Update, Delete)
Controllers
  (C) post (R) get (U) patch (D) delete
Models
  (C) add (R) fetch (U) update (D) remove
*/
