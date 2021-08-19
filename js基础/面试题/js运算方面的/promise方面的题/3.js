Promise.resolve().then(() => {
    return new Error('error!!!')
}).then(res => {
    console.log("then: ", res)
}).catch(err => {
    console.log("catch: ", err)
})
// 打印：then:  Error: error!!!

/**
    返回任意一个非promise的值都会被包裹成promise对象，因此这里的return new Error('error!!!')
    也被包裹成了return Promise.resolve(new Error('error!!!'))。

    为什么不会走到catch里去，因为这里并不是抛出错误。

    如果想要走到catch里的话，可以这样做：
    return Promise.reject(new Error('error!!!'));
    // or
    throw new Error('error!!!')

 */

Promise.resolve().then(() => {
    throw new Error('error!!!')
}).then(res => {
    console.log("then: ", res)
}).catch(err => {
    console.log("catch: ", err)
})
// 打印：catch:  Error: error!!!

Promise.resolve().then(() => {
    return Promise.reject(new Error('error!!!'))
}).then(res => {
    console.log("then: ", res)
}).catch(err => {
    console.log("catch: ", err)
})
// 打印：catch:  Error: error!!!

