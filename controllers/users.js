const {
  fetchAllUsers,
  fetchUserByUsername,
  addUser,
} = require('../models/users');

const getAllUsers = (req, res, next) => {
  fetchAllUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

const getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  fetchUserByUsername(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};

const postNewUser = (req, res, next) => {
  console.log(req.body);
  const { name, username, avatar_url } = req.body;
  addUser({ name, username, avatar_url })
    .then((newUser) => {
      console.log(newUser);
      res.status(201).send(newUser[0]);
    })
    .catch(next);
};
module.exports = { getAllUsers, getUserByUsername, postNewUser };
