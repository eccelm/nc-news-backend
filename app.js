const express = require("express");
const app = express();
const apiRouter = require("./routers/api");

app.use(express.json());
// happy path
app.use("/api", apiRouter);
//error handlers

module.exports = app;
