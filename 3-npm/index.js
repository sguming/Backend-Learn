const express = require('express');

// application
const app = express();
// function json() {
//   return (req,res,next)=>{next()};
// }
app.use(express.json());
app.use((req, res, next) => {
  console.log('global middleware triggered');
  req.time = Date.now();
  next();
});

// 所有以 /users 为开头的请求，都匹配
// GET /users/123
// app.use('/users', xxxx)

// /api/*

// /assets

//           route-handler (middleware function)
app.get('/', (req, res, next) => {
  res.send('hi');
});

// app.use((req, res) => {});

app.use('/users', (req, res, next) => {
  // if () {
  //   res.json()
  // } else {
  //   next()
  // }
  console.log('users middleware triggerred');
  // res.json({ time: req.time });
  next('error');
});

app.get('/users/:id/orders/:orderId', (req, res) => {
  const { id, orderId } = req.params; // route-parameters
  const { pageSize } = req.query;
  const body = req.body;
  const { hello } = req.body;
  // res.send({ user: id, orderId });
  // res.json({ user: id, orderId }); // es6 { user: id, orderId: orderId }
  // API server -> data in JSON
  // res.sendStatus(204);
  res.status(201).json({ user: id, orderId, pageSize, body, hello });
  // function chain
});

/**
 * 如何从request获取数据
 *  1. req.params (url 上的变量) (取出来的值是字符串)             - GET, PUT, DELETE, PATCH
 *    /users/:userId
 *  2. req.query  (注意大小写) (取出来的值是字符串)               - GET (查询)
 *    /users?pageSize=10
 *  3. req.body (global middleware) (app.use(express.json())) - POST, PUT, PATCH
 *
 * (4. from headers) authorization header (token)
 */

// app.post();
// app.put();
// app.patch();
// app.delete();

app.use((error, req, res, next) => {
  console.log(error);
  // next(error);
  res.status(500).json({ error: 'error' });
});

// app.use((error, req, res, next) => {
//   console.log(error);
//   res.status(500).json({ error: 'error' });
// });

app.listen(3000, () => {
  console.log('server listening on port 3000');
});

// middleware chain
// error middleware chain
