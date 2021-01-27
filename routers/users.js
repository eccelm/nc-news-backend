const usersRouter = require("express").Router();
const { getAllUsers, getUserByUsername } = require("../controllers/users");

/*
TO_DO
GET /api/users/:username
POST /api/users
GET /api/users

*/

usersRouter.route("/").get(getAllUsers);
usersRouter.route("/:username").get(getUserByUsername);

module.exports = usersRouter;
