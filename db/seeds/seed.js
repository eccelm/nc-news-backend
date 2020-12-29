const {
  topicData,
  articleData,
  commentData,
  userData,
} = require("../data/index.js");

const { formatDate } = require("../utils/data-manipulation");

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      return knex.insert(topicData).into("topics").returning("*");
    })
    .then(() => {
      return knex.insert(userData).into("users").returning("*");
    })
    .then(() => {
      const formattedArticleData = formatDate(articleData);
      return knex.insert(formattedArticleData).into("articles").returning("*");
    });
};
