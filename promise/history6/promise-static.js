/**
 * 本次主要讲Promise上一些静态方法的实现原理以及实例上finally的实现原理
 */

// Promise.resolve 创建成功的promise
// Promise.reject 创建失败的promise

// 静态方法

// Promise.resolve('hello').then(data => {
//     console.log(data);
// });

// Promise.reject('hello').catch(err => {
//     console.log(err);
// });

/**
 * 实验：
 * Promise.resolve 如果参数是一个promise，会等待里面的promise执行完毕
    
    Promise.resolve(new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise.resolve 会等待里面的promise执行成功");
        }, 3000);
    })).then(data => {
        console.log("success:",data);
    });

 */


/**
 * 实验：
 * Promise.reject  如果参数是一个promise，不会等待里面的promise执行完毕

    Promise.reject(new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise.reject 不会等待里面的promise执行成功");
        }, 3000);
    })).catch(err => {
        console.log("error:",err);
    });

 */

// 静态方法1：实现Promise.resolve
// Promise.resolve = function (value) {
//     return new Promise((resolve, reject) => {
//         resolve(value);// 如果value是一个promise，会等待递归这个promise执行完成
//     });
// };

// 静态方法2：实现Promise.reject
// Promise.reject = function (value) {
//     return new Promise((resolve, reject) => {
//         reject(value);// 如果value是一个promise，reject并不会解析promise
//     });
// }

// Promise.prototype.finally 无论如何都执行 

// 静态方法3：实现Promise.prototype.finally
// Promise.prototype.finally = function (callback) {
//     return this.then((value) => {
//         // 等待finally方法执行完毕后，将上一个成功的结果向下传递
//         return Promise.resolve(callback()).then(() => value);
//     }, (err) => {
//         return Promise.resolve(callback()).then(() => {throw err});
//     });
// }

// Promise.reject(100).finally(() => {// reject的值会穿透finally回调，传递到finally后面的then回调里
//     console.log('finally');
//     // 如果finally的回调里包含了promise，代码会等待promise执行完毕后，再往下走其它的then回调
//     return new Promise((resolve, reject) => {// 默认会等待当前finally方法执行完毕
//         setTimeout(() => {
//             resolve('hello');
//         }, 1000);
//     });
// }).then(data => {
//     console.log('success:', data);
// }, err => {
//     console.log('error:',err);
// });

// 静态方法4：实现Promise.race

// let p1  = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('hello');
//     }, 1000);
// });

// let p2  = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject('world');
//     }, 900);
// });

// const isPromise = function (value) {
//     if (typeof value === 'object' && value !== null || typeof value === 'function') {
//         if (value.then && typeof value.then === 'function') {
//             return true;
//         }
//     }

//     return false;
// }

// Promise.race = function (promises) {
//     return new Promise((resolve, reject) => {
//         for (let i=0; i<promises.length; i++) {
//             let current = promises[i];
//             if (isPromise(current)) {
//                 // current.then(data=> {// 和下面的代码是等价的
//                 //     resolve(data);
//                 // }, err => {
//                 //     reject(err);
//                 // });
//                 current.then(resolve, reject);// 和上面注释的代码是等价的，因为resolve和reject本身就是一个函数
//             } else {
//                 resolve(current);
//             }
//         }
//     });
// }

// race 就是默认等到最先执行完毕的promise的状态
// Promise.race([p1, p2, 1]).then(data => {
//     console.log(data);
// }, err => {
//     console.log(err);
// });

// Promise.race([x1,x2,x3, ...])方法里的参数x1 x2 x3等等，如果是promise的话，都会被执行，只是会选择最先执行完毕的那个promise的结果，作为Promise.race的执行结果。

// Promise.race 应用场景
// 1.一个功能，有多个接口可以调用，接口结果都是一样的，只是速度不同，此时就可以使用race来判断哪个接口的速度最快。
// 2.做一个超时处理 中断的功能 （怎么让一个promise变成失败态，而且不调用这个promise的失败，就是wrap中间包裹一层）

let p  = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('world');
    }, 1000);// 要等待3s 之后变成成功态
});

// 这里并不是让p 变成失败态 而是做一个超时处理 超过2s 后不要再采用p的成功结果了

function wrap(p) {
    let abort = null;

    let p1 = new Promise((resolve, reject) => {
        abort = reject;
    }); 

    // race 方法   在内部构建一个promise为p1 将p1和传递进来的promise p 组成一个race 
    // 如果用户调用了p1的abort方法 相当于让p1失败，也就是Promise.race失败了，也就不再采用p的执行结果了
    let newPromise = Promise.race([p1, p]);

    newPromise.abort = abort;

    return newPromise;
}

let p1 = wrap(p);

p1.then(data => {
    console.log('success',data);
}, err => {
    console.log('error', err);
});

setTimeout(() => {
    p1.abort("超时2s了");
}, 2000);
