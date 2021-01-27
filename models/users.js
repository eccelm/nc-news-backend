const connection = require('../db/connection');

const fetchAllUsers = () => {
  return connection
    .select()
    .from('users')
    .then((users) => {
      return users;
    });
};

const fetchUserByUsername = (username) => {
  return connection
    .select()
    .from('users')
    .where('username', '=', username)
    .first()
    .then((user) => {
      return user;
    });
};

const addUser = (newUser) => {
  console.log(newUser, 'testings a new user');
  return connection('users').insert(newUser).returning('*');
};

module.exports = { fetchAllUsers, fetchUserByUsername, addUser };
