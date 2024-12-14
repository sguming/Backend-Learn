const http = require('http');
const fs = require('fs');
const path = require('path');

// google.com/
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'home.html'), (err, data) => {
      if (err) throw err;
      res.end(data);
    });
    return;
  }
  if (req.url === '/about') {
    fs.readFile(path.join(__dirname, 'about.html'), (err, data) => {
      if (err) throw err;
      res.end(data);
    });
    return;
  }
  // JSON 数据
  // JavaScript Object Notation
  const array = [1, 2, 3];
  res.end(JSON.stringify(array));

  // JSON.parse("[1,2,3]");
});

server.listen(3000);

// API server -> data -> JSON

// localhost:3000/abc -> react router (assume react webpack listen on 3000)
// webpack -> development server (hot-reload)

// localhost:3000/abc -> node.js server (assume node.js server listen on 3000)
// port to port
// 端口到端口

// ajax

// ssr (server side rendering)
// react -> csr (client side rendering)

// npm
// npm start
// package.json

// 使用path，fs，http创建一个server，记录用户访问的路径是时间
// 比如用户访问 /home, 我们就记录这个路径和访问的时间
// 如果用户访问/logs
// 我们就返回记录的所有log，以JSON的形式
// [{"time":"xxxx","path":"/home"}]
// 需要确保server重启，记录仍然存在。
