const apiRouter = require('express').Router();

const topicsRouter = require('./topics');
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const commentsRouter = require('./comments');

const endpoints = require('../endpoints.json');

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);

const displayExamples = (req, res, next) => {
	res.status(200).send({ endpoints });
};

apiRouter.route('/').get(displayExamples);
module.exports = apiRouter;

/*
GET /api
*/
