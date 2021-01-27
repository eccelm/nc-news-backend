const { fetchAllTopics, addTopic } = require("../models/topics");

const getAllTopics = (req, res, next) => {
  fetchAllTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

const postNewTopic = (req, res, next) => {
  // model func here req.params destructure
  addTopic();
};
module.exports = { getAllTopics, postNewTopic };

/*
Naming functions CRUD (Create, Read, Update, Delete)
Controllers
  (C) post (R) get (U) patch (D) delete
Models
  (C) add (R) fetch (U) update (D) remove
*/
