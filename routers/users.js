const usersRouter = require('express').Router();
const {
  getAllUsers,
  getUserByUsername,
  postNewUser,
} = require('../controllers/users');

usersRouter.route('/').get(getAllUsers).post(postNewUser);

usersRouter.route('/:username').get(getUserByUsername);

module.exports = usersRouter;
