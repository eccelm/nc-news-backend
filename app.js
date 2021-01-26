const express = require("express");
const app = express();
const apiRouter = require("./routers/api-router");

// happy path
app.use(express.json());
app.use("/api", apiRouter);

//error handlers

module.exports = app;
