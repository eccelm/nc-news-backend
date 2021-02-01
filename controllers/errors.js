const send404 = (req, res, next) => {
	res.status(404).send({ msg: 'Route not found' });
};

module.exports = { send404 };