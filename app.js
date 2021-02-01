const express = require('express');
const app = express();
const apiRouter = require('./routers/api');
const { send404 } = require('./controllers/errors');
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

module.exports = app;
