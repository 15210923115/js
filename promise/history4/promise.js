// 宏
const PENDING = 'PENDING'; // 等待态
const FULFILLED = 'FULFILLED';// 成功态
const REJECTED = 'REJECTED';// 失败态

// resolvePromise统一来处理，判断一下当前then里onFulfilled或者onRejected的返回值x是什么类型的，来决定promise2是成功还是失败
// 如果x是一个普通值，则让promise2变成成功态
// 如果这个x是一个promise的话，那么让这个promise执行，并且采用它的状态来当做promise2的结果
const resolvePromise = (promise2, x, resolve, reject) => {
    // 判断 可能你的promise要和别人的promise来混用
    // 可能不同的promise库之间要相互调用
    if (promise2 === x) {
        // 如果当前then里onFulfilled的返回值x和我们要拿到的当前then的返回值promise2是同一个人（引用），就不需要等待了，因为x永远不能成功或者失败（不能自己等待自己成功或者失败），所以就卡死了
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    }
    // 我们要判断x的状态  判断x 是不是promise
    // 1.先判断是不是对象或者函数
    if ((typeof x === 'object' && x !== null ) || typeof x === 'function') {
        // x是一个对象或者函数 
        let called;// 为了考虑别人的promise 不健壮 我们需要自己判断 如果调用失败了，就不能成功了，如果成功了，就不能失败了。（promise/A+规范里说了，不能多次调用失败或者成功，防止一个promise既调成功又调失败）
        try {
            let then = x.then;// 就取出它的then方法 如果对象取then报异常的话，那么这个then方法有可能是采用defineProperty来定义的 因为defineProperty的get方法里有可能会有throw new Error()的逻辑
            if (typeof then === 'function') {
                // 判断then是不是一个函数，如果then不是一个函数，说明x不是promise
                // 只能认为x是一个promise了 并且调用then，让x作为then的this
                then.call(x, y => {// 如果x是一个promise 就采用这个promise的返回结果
                    // resolve(y);// 原则上是这样写，是把y看成了一个普通值，如果y又是一个promise的话，就需要使用递归的方式，让y这个promise执行完毕后，再抛出值，因此使用resolvePromise(y);替代resolve(y);
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);// 继续解析成功的值
                }, r => {
                    if (called) return;
                    called = true;
                    reject(r);// 直接用r 作为失败的结果
                });
                // 这里会再次去then方法 有可能会报错
                // x.then(() => {}, () => {});
            } else {
                // 说明x是一个对象，就是一个普通值，直接resolve即可
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);// 取then失败了 直接出发promise2的失败逻辑
        }
    } else {
        // x肯定不是promise 说明x是一个普通值 直接成功即可
        resolve(x);
    }
};
class Promise {
    constructor(executor) {
        this.status = PENDING; // 默认是等待态
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        // 只有状态是等待态的时候，才可以更新状态
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                this.onResolvedCallbacks.forEach(fn => fn());// 发布的过程
            }
        };
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        };
        // executor 执行的时候，需要传入两个参数，给用户来改变状态的
        try {
            executor(resolve, reject);
        } catch (err) {// 表示当前有异常，那就使用这个异常作为promise失败的原因
            reject(err);
        }
    }
    // 只要x 是一个普通值 就让下一个promise变成成功态
    // 这个x 有可能是一个promise 我们需要采用这个promise的状态
    then(onFulfilled, onRejected) {// 订阅的过程
        // 穿透（then方法里，可选参数的处理）
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
        onRejected = typeof onRejected === 'function' ? onRejected : err => {
            throw err;
        };
        // 递归
        let promise2 = new Promise((resolve, reject) => {// 每一个then都要返回一个新的promise

            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);// 拿到当前then的成功或者失败的执行结果，来判断当前promise2是成功还是失败
                        resolvePromise(promise2, x, resolve, reject);// 用x的值，来决定promise2是成功还是失败
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            } 

            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    } 
                }, 0);
                
            }
            if (this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                    
                });

                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                    
                });

            }
        });

        return promise2;
    }

    // catch就是一个没有成功的回调 是then(null, err => { todo ... })的语法糖
    catch(errCallback) {
        return this.then(null, errCallback);
    }
}

// 静态方法（类上的方法） 
Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    
    return dfd;
}

module.exports = Promise;

/**
 * 面试1：如和判断一个变量x是不是Promise？
 * 先判断x是否是对象或者函数，如果是，尝试从x上取then属性，即x.then，如果能取到then的话（取then的时候不会报错），再判断x.then是否是一个函数，如果是x.then是函数，就说明x是一个promise。
 * 
 * 面试2：Promise里链式调用如何实现的？
 * 每一个then返回的都是一个新的promise2
 * 
 * 面试3：让你产生一个延迟对象，你会怎么做？
 * Promise.deferred这个方法是产生一个延迟对象。
 * 注意原生的Promise库里，并没有Promise.deferred这么一个属性，是我们自己扩展的，这样扩展可以产生一个延迟对象，以前会这么用，现在不这么用了，都是直接new Promise()。
 * 
 */
