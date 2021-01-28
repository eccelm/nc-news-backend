const {
	removeArticle,
	fetchAllArticles,
	fetchArticleById,
	updateArticle,
	fetchArticleComments,
	addCommentToArticle,
	addNewArticle,
} = require('../models/articles');

const deleteArticle = (req, res, next) => {};

const getAllArticles = (req, res, next) => {};

const postNewArticle = (req, res, next) => {
	const { title, body, topic, username: author } = req.body;

	addNewArticle({ title, body, topic, author }).then((newArticle) => {
		res.status(201).send({ article: newArticle[0] });
	});
};

const getArticleById = (req, res, next) => {
	const { article_id } = req.params;

	fetchArticleById(article_id)
		.then((article) => {
			res.status(200).send({ article });
		})
		.catch(next);
};

const patchArticle = (req, res, next) => {
	const { article_id } = req.params;
	updateArticle(req.body, article_id)
		.then((article) => {
			res.status(202).send({ article: article[0] });
		})
		.catch(next);
};

const getArticleComments = (req, res, next) => {};

const postCommentToArticle = (req, res, next) => {
	const { article_id } = req.params;
	const { body, username } = req.body;
	const newComment = { author: username, article_id, body };

	addCommentToArticle(newComment).then((newComment) => {
		res.status(201).send({ comment: newComment[0] });
	});
};

module.exports = {
	deleteArticle,
	getAllArticles,
	getArticleById,
	patchArticle,
	postNewArticle,
	postCommentToArticle,
	getArticleComments,
};

/*
Naming functions CRUD (Create, Read, Update, Delete)
Controllers
  (C) post (R) get (U) patch (D) delete
Models
  (C) add (R) fetch (U) update (D) remove
*/
