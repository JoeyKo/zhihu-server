const express = require("express");

const userRouter = require('./user')
const articleRouter = require('./article')
const storeRouter = require('./store')
const uploadRouter = require('./upload')

const app = express();

app.use("/book/", userRouter);

// user, upload, article, store, router

module.exports = app;