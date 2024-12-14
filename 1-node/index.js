// IIFE (Immediately invoked function expression) 立即执行函数
const moduleA = { exports: {} };
(function (module) {
  let counter = 0;

  function getCounter() {
    return counter;
  }

  function increment() {
    counter++;
  }

  module.exports = { increment, getCounter };
  // console.log(filename);
})(moduleA);

moduleA.exports.increment();
moduleA.exports.increment();
moduleA.exports.increment();
moduleA.exports.increment();
console.log(moduleA.exports.getCounter());

const { increment, getCounter } = require('./module');
increment();
