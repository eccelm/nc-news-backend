const {
	removeArticle,
	fetchAllArticles,
	fetchArticleById,
	updateArticleVotes,
	fetchArticleComments,
	addCommentToArticle,
	addNewArticle,
} = require('../models/articles');

const deleteArticle = (req, res, next) => {};

const getAllArticles = (req, res, next) => {};

const postNewArticle = (req, res, next) => {};

const getArticleById = (req, res, next) => {};

const patchVotes = (req, res, next) => {};

const getArticleComments = (req, res, next) => {};

const postCommentToArticle = (req, res, next) => {};

module.exports = {
	deleteArticle,
	getAllArticles,
	getArticleById,
	patchVotes,
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
