// 什么是Promise.all？能解决什么问题？
// Promise.all 方法表示等待所有的promise全部成功后，才会执行回调，如果有一个promise失败就失败了

let fs = require('fs').promises;
let Promise = require('./promise');
// Promise.all返回的是一个promise，能then

function isPromise(value) {
    if (typeof value === 'object' && value !== null || typeof value === 'function') {
        return typeof value.then === 'function';
    }
    return false;
}

// 静态方法（类上的方法）
Promise.all = function(promises) {
    return new Promise((resolve, reject) => {

        let arr = [];// 返回的数组
        let i = 0;
        let processData = (index, data) => {
            arr[index] = data+"***";
            if (++i === promises.length) {
                resolve(arr);
            }
        };

        for (let i=0; i<promises.length; i++) {
            let current = promises[i];
            if (isPromise(current)) {
                current.then(data => {
                    processData(i, data);
                }, reject);// 如果有任何一个promise失败了 直接让这个promise变成失败态即可
            } else {
                processData(i, current);
            }
        }
    });
}

Promise.all([1,2,3, fs.readFile('name.txt', 'utf8'), fs.readFile('age.txt', 'utf8')]).then(values => {
    console.log(values);
}, err => {
    console.log(err);
});

// Promise.race 赛跑 谁是第一个完成的 就用它的结果，如果是失败的，则这个promise就是失败态，如果第一个是成功，则这个promise就是成功太
// 就看谁先完成，promise的状态就是先完成的那个promise的状态
// 先到先得

// Promise.race([fs.readFile('names.txt', 'utf8'), fs.readFile('age.txt', 'utf8')]).then(values => {
//     console.log(values);
// }, err => {
//     console.log(err);
// });

// promise.finally 不是类上的方法
// 无论成功还是失败都会执行的方法，如果finally中返回了一个promise，会等待这个promise执行完成后继续执行下面的的代码
// finally核心也是一个then方法（就是说借助then方法实现的）

// new Promise((resolve, reject) => {
//     resolve(100);
// }).finally((data) => {
//     console.log(data);// finally接收不到前面的返回值
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             reject("1000");
//         }, 1000);
//     });
// }).then(data => {
//     console.log("success"+data);
// }).catch(err => {
//     console.log("reject"+err);
// });

// Promise.resolve() 创建一个成功地promise

// Promise.reject() 创建一个失败的promise