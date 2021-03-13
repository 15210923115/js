// generator es6语法

// 基本用法1：
// 碰到yield就会停止
// 碰到return，done就会变为true
// 函数执行完之后会返回一个迭代器，迭代器上有next方法可供迭代使用

function * gen() {// generator函数 生成器函数 生成的是迭代器对象
    yield 1;
    yield 2;

    // 碰到return 这个函数才会结束 done才会变为true
}

// 生成的是迭代器对象
// 迭代器上有一个方法next 是不可枚举的 {value: 100, done: true}
// value 就是当前迭代出来的结果； done 表示当前函数是否执行完毕
let it = gen();
// 生成器函数和普通函数的区别 在于生成器函数具有暂停的效果
console.log(it.next());// { value: 1, done: false } 碰到yield 就会暂停
console.log(it.next());// { value: 2, done: false }
console.log(it.next());// { value: undefined, done: true }

// generator应用场景 
// 1.dva至今还在使用generator
// 2.koa1.0的时候用generator，后来Koa2.0的时候变成async await了

// 基本用法2：
// yield可以有返回值

function * gen2() {
    let r1 = yield 1;
    console.log(r1);
    let r2 = yield 2;
    console.log(r2);
    return r2;
}

let it2 = gen2();
console.log(it2.next(1));// 第一次传递的值是无效的
console.log(it2.next(100));// 当调用next方法的时候 传递的参数会给上一次yield 赋值
console.log(it2.next(200));
// 1.每次调用next，碰到yield 就停止
// 2.碰到return 函数就执行完毕
// 3.当前调用next时 传递的参数永远给的是 上一次yield的返回值

// generator 应用场景
// 1.读取文件

let fs = require('fs').promises;
function * read() {// 感觉写代码就是同步地写，但是执行还是异步嵌套地执行
    let content = yield fs.readFile('name.txt', 'utf8');
    let age = yield fs.readFile(content, 'utf8');
    return age;
}

let it3 = read();
let {value, done} = it3.next();
value.then(data => {// 实际中，谁要这样嵌套写代码，会被骂死，所以co库就可以派上用场了
    let {value, done} = it3.next(data);
    value.then(data => {
        let {value, done} = it3.next(data);
        console.log('generator原生it写的执行代码，获取的结果：',value);
    });
});

// 上面的那段为了说明generator应用场景，而写的读取文件的代码，read方法是同步写的，
// 但是执行代码确实嵌套写的，如果需要读取100个文件，那就有一百多个嵌套执行的代码了，
// 所以写起来generator还是不好用，于是就有了tj所写的co库，这个库面试的时候，也会问到

// co 实现 tj写的
let co = require('co');
co(read()).then(data => {// 由co的执行结果来看，co执行后返回的是一个promise，因此模仿着写co库原理的时候，co函数最终要返回一个promise
    console.log('co库写的generator执行代码，获取的结果：',data);
});

// co原理 参数就是生成器函数执行之后返回的迭代器；co函数最终要返回一个promise
function _co(it) {
    return new Promise((resolve, reject) => {
        // 如果是异步 而且是重复性的 不能使用循环，因为循环是同步的
        // 异步重复性工作 迭代 -> 回调
        function next(data) {
            let {value, done} = it.next(data);// value就是yield后面的表达式的返回值，后面的表达式的返回值可能是promise，也有可能不是promise
            if (!done) {
                Promise.resolve(value).then(data => {// value有可能是一个promise，也有可能是一个普通值，所以使用Promise.resolve()处理，因为Promise.resolve会等待promise执行完毕再接着往后执行，如果是普通值，它会把普通值包装成promise，到最后普通值也可以then
                    next(data);
                }, reject);// 如果有一个挂了，就不用往后走了，就直接reject就行了
            } else {
                resolve(value);// 将最终的结果 返回给当前co的promise
            }
        }
        next();
    });
}

_co(read()).then(data => {// 由co的执行结果来看，co执行后返回的是一个promise，因此模仿着写co库原理的时候，co函数最终要返回一个promise
    console.log('自己写的co库，写的generator执行代码，获取的结果：',data);
});

// 如果面试的时候，问你知不知道co库的原理，其实就变相的问你会不会generator。

// async await 是es7语法

// async + await(语法糖) 等价于 generator + co

// async 函数返回的就是一个promise  await 后面跟的内容(value)会被包装成一个promise（使用Promise.resolve(value).then()包装的）

// 面试题：用async + await 来模拟 Promise.all

let fn1 = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("1");
        }, 1000);
    });
}

let fn2 = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("2");
        }, 2000);
    });
}

let fn3 = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("3");
        }, 3000);
    });
}

async function readAll() {
    console.time('timer');
    let r = await Promise.all([fn1(), fn2(), fn3()]);// 三个promise是一起执行的，然后再当做参数供Promise.all使用
    console.timeEnd('timer');
    return r;
}

readAll().then(data => {
    console.log(data);
});

// 模拟
async function asyncAlls(promises) {
    let arr = [];
    // promises.forEach(async p => {// forEach是同步的，不具备等待效果，所以不能这么写
    //     arr.push(await p);
    // });
    for (let p of promises) {
        arr.push(await p);// 会阻塞for循环 但是asyncAlls调用的时候，我们的promise是一起执行的，所以还是以最长时间为主
    }
    return arr;
}

async function _readAll() {
    console.time('timer--');
    let r = await asyncAlls([fn1(), fn2(), fn3()]);// 三个promise是一起执行的，然后再当做参数供asyncAlls使用
    console.timeEnd('timer--');
    return r;
}

_readAll().then(data => {
    console.log('--',data);
});

// forEach、map等（就是带有回调的那种循环，例如还有filter等等），都不会等待promise执行
// 只有for in和for of循环 会等待promise执行