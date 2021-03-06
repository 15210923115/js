// 什么是promise 解决哪些问题（基于回调）
// 1.回调地狱（代码不好维护，错误处理非常麻烦，不能统一处理错误）
// 2.多个请求的并发问题

// Promise 是一个类
// 1.在new Promise的时候需要传递一个执行器函数，这个函数默认会立即被执行
// 2.每个promise都有三个状态：pending 等待态 fulfilled 成功态 rejected 失败态
// 3.默认创建一个promise 是等待态 默认提供给你两个函数 resolve让promise变成成功态 reject让promise变成失败态
// 4.每个promise的实例都具备一个then方法，then方法中传递两个参数：1.成功的回调 2.失败的回调
// 5.如何让promise变成失败态：调用reject()或者抛出一个错误throw new Error()
// 6.如果多次调用成功或者失败，只会执行一次，一旦状态变化了，就不能再变成成功或者失败了（状态改变后是不可逆的）

let Promise = require("./promise");

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {// 异步的
        resolve("成功了");// 此时如果调用了resolve 就让刚才存储的成功地回调函数去执行
    }, 1000);
    // resolve("成功了");
    // reject("err了");
    // throw new Error("error了");
})

// 同一个promise实例，可以then多次
// 核心就是发布订阅模式 then相当于订阅的过程 resolve和reject相当于发布的过程
promise.then((data) => { // 如果调用then的时候没有成功也没有失败，则可以先保存成功和失败的回到
    console.log("resolve", data);
}, (err) => {
    console.log("reject", err);
});

promise.then((data) => {
    console.log("resolve2", data);
}, (err) => {
    console.log("reject2", err);
});
