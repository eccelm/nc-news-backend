const handlePsqlErrors = (err, req, res, next) => {
	const badReqCodes = [
		'42703',
		'23502',
		'23503',
		'22001',
		'23505',
		'22P02',
		'2201W',
	];
	//console.log(err.code, err.message)
	if (badReqCodes.includes(err.code)) {
		res.status(400).send({ msg: `Bad Request` });
	} else {
		next(err);
	}
};
const handleCustomErrors = (err, req, res, next) => {
	if (err.status) {
		res.status(err.status).send({ msg: err.msg });
	} else {
		next(err);
	}
};

const internalErrorHandler = (err, req, res, next) => {
	console.log(err, '<<<<<< The unhandled error');
	res.status(500).send({ msg: 'Internal Server Error' });
};
const send404 = (req, res, next) => {
	res.status(404).send({ msg: 'Route not found' });
};
const send405 = (req, res, next) => {
	res.status(405).send({ msg: 'method not allowed' });
};

module.exports = {
	handleCustomErrors,
	handlePsqlErrors,
	internalErrorHandler,
	send404,
	send405,
};
