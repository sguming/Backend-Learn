const { Router } = require('express');
const authRouter = require('./auth.router');
const postRouter = require('./post.router');

const v1Router = Router();

v1Router.use('/auth', authRouter);
v1Router.use('/posts', postRouter);

module.exports = v1Router;
