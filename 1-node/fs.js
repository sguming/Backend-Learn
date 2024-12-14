const fs = require('fs');

// package 库, library

// framework 框架

// path (path package), path.join
fs.readFile('./notes.txt', { encoding: 'utf-8' }, (error, data) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(data);
});

// fs.writeFileSync('./test.txt', 'hello world!!!!!!');
fs.appendFileSync('./test.txt', 'hello world!!!!!!\n');
