const connection = require("../db/connection");

const fetchAllTopics = () => {
  return connection
    .select("*")
    .from("topics")
    .returning("*")
    .then((topics) => {
      return topics;
    });
};

module.exports = { fetchAllTopics };

/*
Naming functions CRUD (Create, Read, Update, Delete)
Controllers
  (C) post (R) get (U) patch (D) delete
Models
  (C) add (R) fetch (U) update (D) remove
*/
