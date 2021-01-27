const connection = require("../db/connection");

const fetchAllUsers = () => {
  return connection
    .select()
    .from("users")
    .then((users) => {
      return users;
    });
};

const fetchUserByUsername = (username) => {
  return connection
    .select()
    .from("users")
    .where("username", "=", username)
    .first()
    .then((user) => {
      return user;
    });
};

module.exports = { fetchAllUsers, fetchUserByUsername };
