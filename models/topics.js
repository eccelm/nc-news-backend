const connection = require("../db/connection");

const fetchAllTopics = () => {
  return connection
    .select("*")
    .from("topics")
    .then((topics) => {
      return topics;
    });
};

const addTopic = (newTopic) => {
  //console.log(newTopic, "testings a new topic");
  return connection("topics").insert(newTopic).returning("*");
};

module.exports = { fetchAllTopics, addTopic };

/*
Naming functions CRUD (Create, Read, Update, Delete)
Controllers
  (C) post (R) get (U) patch (D) delete
Models
  (C) add (R) fetch (U) update (D) remove
*/
