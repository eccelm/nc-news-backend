const handlePsqlErrors = (err, req, res, next) => {
   const badReqCodes = ['23502', '22001']
   console.log(err.code, err.message)
   if(badReqCodes.includes(err.code)) {
     res.status(400).send({ msg: `Bad Request`})
   } else {
     next(err)
   }
 }


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



module.exports = {handlePsqlErrors, internalErrorHandler, send404, send405 };
