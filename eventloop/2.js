async function async1() {
    console.log('async1 start');// 2
    await async2(); // await语句 后面的代码（下一行以及后面所有行的代码），会变成微任务。也就是会把后面的代码放到then的回调中去了。即：async2().then(() => { console.log('async1 end');});
    console.log('async1 end');// 6
    
}

async function async2() {
    console.log('async2');// 3
}

console.log('script start'); // 1

setTimeout(function(){
    console.log('setTimeout');// 8
});

async1();

new Promise(function (resolve) {
    console.log('promise1');// 4
    resolve();
}).then(function () {
    console.log('promise2');// 7
});

console.log('script end');// 5

/**
 * 打印顺序：
 * 
 * 1.浏览器环境
 * script start
 * async1 start
 * async2
 * promise1
 * script end
 * async1 end // 差异1
 * promise2 // 差异2
 * setTimeout
 * 
 * 2.node环境（情况1，有的node版本是这个执行结果）
 * script start
 * async1 start
 * async2
 * promise1
 * script end
 * promise2 // 对比差异1
 * async1 end // 对比差异2
 * setTimeout
 * 
 * // 在浏览器中 await后面跟一个promise，那就直接then
 * // node中虽然你放的是一个promise 会再一次包装，node中await后面的结果会被再包装一次
 * 
 * 3.node环境（情况2，有的node版本是这个执行结果）
 * script start
 * async1 start
 * async2
 * promise1
 * script end
 * async1 end // 差异1
 * promise2 // 差异2
 * setTimeout
 * 
 */

// node里面 async + await 编译出来的结果跟浏览器不一样

// 浏览器和node中解析的方式不一样 在浏览器中 await 后面跟一个promise

// 解析方式1
// 浏览器和部分node版本中，中解析async1函数的方式（await会被解析出一个then来）：
async function async1() {
    console.log('async1 start');
    // 在浏览器中 await后面跟一个promise，因此async1函数里的await那行及之后的代码可以变成如下：
    async2().then(() => { 
        console.log('async1 end');
    });
}

// 解析方式2
// 有的node版本中，解析async1函数的方式（await会被解析出两个then来）：
async function async1() {
    console.log('async1 start');
    new Promise((resolve, reject) => {
        // resolve方法有个特点，如果参数是个promise的话，它会等待里面的promise执行完成，再去调用下一个then
        resolve(async2());// 上一个eventloop被执行，console.log('promise2');这样代码也是在这次的事件环里执行的
    }).then(() => {
        console.log('async1 end');// 下一个eventloop被执行
    });
}// 相当于 async2().then(resolve).then(() => {console.log('async1 end');})

// 对比两种不同的解析方式，按照解析方式2，可以看出来，console.log('async1 end');这行代码是在下一个eventloop里执行的，比console.log('promise2');这行代码，晚一个eventloop执行。
// 所以先打印promise2，后打印async1 end