const topicsRouter = require('express').Router();
const { send405 } = require('../controllers/errors');
const { getAllTopics, postNewTopic } = require('../controllers/topics');

   topicsRouter
   .route('/')
   .get(getAllTopics)
   .post(postNewTopic)
   .all(send405);

module.exports = topicsRouter;
