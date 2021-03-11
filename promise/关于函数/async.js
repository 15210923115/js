// 异步数据处理

const fs = require('fs');

// 异步处理都是基于回调的，异步不能通过try catch捕获异常，node中的回调参数第一个就是err属性

// 异步串行（解决异步问题 核心就是回调函数），此示例是采用高阶函数的思想来解决异步问题
// 示例：两个读取文件的操作，都读取完之后，再输出obj的值
let obj = {};
function after(times, callback) {// lodash after Promise.all 都是这个原理
    return function () {
        --times == 0 && callback();
    }
}
let fn = after(2, () => {
    console.log(obj);
});

fs.readFile('age.txt', 'utf8', function(err, data) {
    obj.age = data;
    fn();
});

fs.readFile('name.txt', 'utf8', function(err, data) {
    obj.name = data;
    fn();
})

// 解决异步串行问题的方式，还有一种，就是发布订阅模式和观察者模式