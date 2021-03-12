let Promise = require('./promise');

let promise = new Promise((resolve, reject) => {
    resolve('hello');
});

let promise2 = promise.then(data => {
    return new Promise((resolve, reject) => {
        resolve(new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('hello world');
            }, 1000);
        }));
    });
});

promise2.then(data => {
    console.log('success', data);
}, err => {
    console.log('----', err);
});

/**
 * Promise1是自己按照promise/A+规范写的Promise 
 * 现在将Promise1和es6里的Promise混用，看看是否没有问题（看自己的promise库是否兼容别人的promise库）
 * 
    let Promise1 = require('./promise');

    let promise = new Promise1((resolve, reject) => {
        resolve('hello');
    });

    let promise2 = promise.then(data => {
        return new Promise((resolve, reject) => {// 使用es里的Promise
            resolve('hello');
        });
    });

    promise2.then(data => {
        console.log('success', data);
    }, err => {
        console.log('----', err);
    });
 */

/**
    // 面试必考点1：
    
    let promise = new Promise((resolve, reject) => {
        resolve('hello');
    });

    let promise2 = promise.then(data => {
        return x;// return 的值在源码里用x指代的
    });

    如果最后的返回值x恰好是promise2，即onFulfilled或者onRejected的返回值x是promise2，
    也就是说then的返回值promise2和then里的onFulfilled或者onRejected的返回值x是同一个引用，
    此时自己等待自己成功或者失败，是不合理的，因为promise2里没有地方调用resolve或者reject，
    也就永远不会成功或者失败，那么下一个then永远等不到结果，卡死了
    所以在源码里，如果判断出promise2 === x，主动抛错，直接return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    告诉下一个then，上一个then发生错误卡死了
 */
