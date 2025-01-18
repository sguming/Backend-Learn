const { Router } = require('express');
const authRouter = require('./auth.router');
const testRouter = require('./test.router');

const v1Router = Router();

v1Router.use('/auth', authRouter);
v1Router.use('/test', testRouter);

module.exports = v1Router;
