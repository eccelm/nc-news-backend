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
	
			if(!user) {
				return Promise.reject({
					status: 404,
					msg: `No user was found for the username: ${username}`
				})
			}
			res.status(200).send({ user });
		})
		.catch(next);
};

const postNewUser = (req, res, next) => {
	const { name, username, avatar_url } = req.body;
	addUser({ name, username, avatar_url })
		.then((newUser) => {
			res.status(201).send({ user: newUser[0] });
		})
		.catch(next);
};
module.exports = { getAllUsers, getUserByUsername, postNewUser };
