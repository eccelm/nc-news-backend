const { fetchAllTopics, addTopic } = require('../models/topics');

const getAllTopics = (req, res, next) => {
	fetchAllTopics()
		.then((topics) => {
			res.status(200).send({ topics });
		})
		.catch(next);
};

const postNewTopic = (req, res, next) => {
	const { slug, description } = req.body;
	addTopic({ slug, description })
		.then((newTopic) => {
		
			res.status(201).send({ topic: newTopic[0] });
		})
		.catch(next);
};
module.exports = { getAllTopics, postNewTopic };

