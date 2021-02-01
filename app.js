const express = require('express');
const app = express();
const apiRouter = require('./routers/api');
const {handleCustomErrors, handlePsqlErrors, internalErrorHandler,  send404 } = require('./controllers/errors');
/*
 *
 * WILL NEED CORS FOR FRONT END
 *
 */
app.use(express.json());
// happy path
app.use('/api', apiRouter);
app.all('/*', send404);
//error handlers
app.use(handleCustomErrors)
app.use(handlePsqlErrors)
app.use(internalErrorHandler);

module.exports = app;
