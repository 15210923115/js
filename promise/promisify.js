// 什么是Promise.all？能解决什么问题？
// Promise.all 方法表示等待所有的promise全部成功后，才会执行回调，如果有一个promise失败就失败了

// 我们可以将node中的异步api 转换成promise的写法

/**
 * 转换方法1：

    高版本的node中，通过require('fs').promises，可以使用基于promise语法的fs中的各个api，用法如下：
    
    let fs = require('fs').promises;

    fs.readFile('name.txt', 'utf8').then(data => {
        console.log(data);
    });

 */

/**
 * 转换方法2：
 
    let fs = require('fs');
    let util = require('util');

    let readFile = util.promisify(fs.readFile);

    readFile('name.txt', 'utf8').then(data => {
        console.log(data);
    });

 */

// 下面我们就自己实现一个跟util.promisify一样的方法，叫做promise化
// 把 node中的异步api转换成promise方法 只针对node方法
// 为啥只针对Node？因为只有Node里的api是异步的，并且node中的回调函数有两个参数：一个是err，另一个是data，符合promise的成功和失败

let fs = require('fs');

function promisify(fn) {// 返回的是一个函数
    return function (...args) {// 返回的是一个promise
        return new Promise((resolve, reject) => {
            fn(...args, function (err, data) {
                if (err) reject(err);
                resolve(data);
            });
        });
    }
}

let read = promisify(fs.readFile);

read('name.txt', 'utf8').then(data => {
    console.log(data);
});

// 各种node模块只要遵循这个参数规律，即：fn (params1, params2, ..., function (err, data) {})  
// 我们都可以将这个异步方法转换成promise