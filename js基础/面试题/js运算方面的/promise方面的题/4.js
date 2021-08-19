const promise = Promise.resolve().then(() => {
    return promise;// 这个地方就报错了
})
// 报错打印：UnhandledPromiseRejectionWarning: TypeError: Chaining cycle detected for promise #<Promise>

const promise1 = Promise.reject().catch(() => {
    return promise1;// 这个地方就报错了
})
// 报错打印：UnhandledPromiseRejectionWarning: TypeError: Chaining cycle detected for promise #<Promise>

/**
 * .then或.catch返回的值不能是promise本身，否则会造成死循环。
 */

const promise2 = Promise.resolve().then(() => {
    return 123;
})
promise2.then(console.log).catch(console.err) 
// 打印：123

const promise3 = Promise.resolve().then(() => {
    // throw new Error("我错了");
    return Promise.reject(new Error("我错了"))
})
promise3.then(console.log).catch(console.err)
// 打印：UnhandledPromiseRejectionWarning: Error: 我错了

const promise3 = Promise.resolve().then(() => {
    return Promise.reject(new Error("我错了"))
})
promise3.then(console.log).catch((err)=>{
    console.log("errrrrr:", err);// errrrrr: Error: 我错了
})
