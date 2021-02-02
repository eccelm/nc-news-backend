const express = require('express');
const cors = require('cors');
const app = express();
const apiRouter = require('./routers/api');
const {handleCustomErrors, handlePsqlErrors, internalErrorHandler,  send404 } = require('./controllers/errors');

app.use(express.json());
app.use(cors());

// happy path
app.use('/api', apiRouter);
app.all('/*', send404);

//error handlers
app.use(handleCustomErrors)
app.use(handlePsqlErrors)
app.use(internalErrorHandler);

module.exports = app;
