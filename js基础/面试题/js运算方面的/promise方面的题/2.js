const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('timer')
        resolve('success')
    }, 1000)
})
const start = Date.now();
promise.then(res => {
    console.log("1:", res, Date.now() - start)
})
promise.then(res => {
    console.log("2:", res, Date.now() - start)
})

// timer
// 1: success 1007
// 2: success 1008

/**
    当然，如果你足够快的话，也可能两个都是1007。
    
    Promise的.then或者.catch可以被调用多次，但这里Promise构造函数只执行一次。
    或者说promise内部状态一经改变，并且有了一个值，那么后续每次调用.then或者
    .catch都会直接拿到该值。
 */