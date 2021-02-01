const usersRouter = require('express').Router();
const {
  getAllUsers,
  getUserByUsername,
  postNewUser,
} = require('../controllers/users');
const {send405} = require("../controllers/errors")

usersRouter
  .route('/')
  .get(getAllUsers)
  .post(postNewUser)
  .all(send405);

usersRouter
  .route('/:username')
  .get(getUserByUsername);

module.exports = usersRouter;
