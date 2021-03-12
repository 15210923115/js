/**
 * promise链式调用
 */

let fs = require('fs');

// 例子：一个有关联的请求 需要先通过第一个读取操作拿到返回结果，通过这个结果再去读取另一个文件
// 即：上一个人的输出是下一个人的输入

// fs.readFile('./name.txt', 'utf8', function (err, data) {
//     fs.readFile(data, 'utf8', function (err, data) {
//         console.log(data);
//     });
// });

function read(...args) {
    return new Promise((resolve, reject) => {
        fs.readFile(...args, function (err, data) {
            if (err) reject(err);
            resolve(data);
        });
    });
}

// promise 是通过 链式调用的方式解决了这个问题

// 成功的回调和失败的回调都可以返回一个结果
// 情况1：如果返回的是一个promise，那么会让这个promise执行，并且采用他的状态，将成功的结果或者失败的结果传递给外层的下一个then中
// 情况2：如果返回的是一个普通值(常量)，会把这个普通值作为外层的下一次then的成功的回调中
// 情况3：抛出一个异常，会进入到下一个then的失败回调中
// read('name.txt', 'utf8').then((data) => {
//     return read(data+"a", 'utf8');
// }).then((data) => {
//     console.log(data);
// }, (err) => {
//     // console.log(err);
//     return 100;
// }).then((data) => {
//     console.log(data);
//     // throw new Error("error了");
//     return new Promise((resolve, reject) => {
//         reject("错误了");
//     })
// });

// 情况1：如果返回的是一个promise，那么会让这个promise执行，并且采用他的状态，将成功的结果或者失败的结果传递给外层的下一个then中
// read('name.txt', 'utf8').then((data) => {
//     return read(data, 'utf8');
// }).then((data) => {
//     console.log(data);
// });

// 情况2：如果返回的是一个普通值(常量)，会把这个普通值作为外层的下一次then的成功的回调中
// read('name.txt', 'utf8').then((data) => {
//     return "常量";
// }).then((data) => {
//     console.log(data);
// }, (err) => {
//     console.log(err);
// });

/**
 * 如果你希望让一个promise变成一个失败态，可以在then的回调中返回一个失败的的promise，或者你也可以在then中抛出一个错误，这样都会进入到下一个then的失败回调中
 * 
 * 每一个then都可以定义err（也就是onRejected）方法，不然就走默认的catch方法（要是没有任何err方法的话，就会报错了）
 */

// 情况3：抛出一个异常，会进入到下一个（或者后面的）then的失败回调中，如果下一个（或者后面的）then没有写失败的回调，则会报错：UnhandledPromiseRejectionWarning: Error: ...
// read('name.txt', 'utf8').then((data) => {
//     return read(data+"a", 'utf8');
// }).then((data) => {
//     console.log(data);
// }, (err) => {
//     // console.log(err);
//     return 100;
// }).then((data) => {
//     console.log(data);
//     // throw new Error("error了");
//     return new Promise((resolve, reject) => {
//         reject("错误了");
//     })
// }).then(null, (err) => {
//     console.log(err);
// });

// 情况3衍生出来的特殊情况1：如果前一个then抛出错误了（即返回了一个reject的promise或者throw new Error()了），下一个then没有写错误的回调（进行错误捕获）或者后面根本没有捕获错误的then或者catch，则会报错：UnhandledPromiseRejectionWarning: Error: ...
// read('name.txt', 'utf8').then((data) => {
//     return read(data+"a", 'utf8');// read发生错误了
// }).then((data) => {
//     console.log(data);
// }, (err) => {// 捕获错误了
//     return 100;// 返回了常量，会进入下一个then的成功的回调中
// }).then((data) => {// 这个then抛出错误了
//     console.log(data);
//     throw new Error("这个then抛出错误了，但是下面没有捕获错误，因此会报错");// 抛出了错误，但是后面没有捕获错误，因此会报错
// }).then((data) => {// 这个then没有写错误的回调，或者这个then根本就不写，执行的时候就会报错：UnhandledPromiseRejectionWarning: Error: ...
//     console.log("");
// }, null);// 没有写错误的回调，会报错

// 情况3衍生出来的特殊情况2：如果前一个then抛出错误了（即返回了一个reject的promise或者throw new Error()了），只要在调用链的最后加一个catch或者最后一个then里写了错误捕获，反正最后有一个能错误捕获，进行兜底，就不会报错了
// read('name.txt', 'utf8').then((data) => {
//     return read(data+"a", 'utf8');// 这个then里，read的第一个参数路径写错了，那么read这个promise会reject
// }).then((data) => {// 发现这个then里没有catch错误（因此这里面的代码不会执行）
//     console.log(data);
// }).then((data) => {// 发现这个then里也没有catch错误（因此这里面的代码不会执行）
//     console.log(data);
// }).catch((err) => {// 最后发现了catch（兜底的）
//     console.log("只要上面没有捕获错误，就会执行这个catch", err);
// });

// 情况3衍生出来的特殊情况3：如果前一个then抛出错误了（即返回了一个reject的promise或者throw new Error()了），后面有多个捕获错误的then或者catch，则会在第一捕获错误的onRejected函数中被捕获到错误，后面不会被执行了
// read('name.txt', 'utf8').then((data) => {
//     return read(data+"a", 'utf8');// 这个then里，read的第一个参数路径写错了，那么read这个promise会reject
// }).then((data) => {// 发现这个then里没有catch错误（因此这里面的代码不会执行）
//     console.log(data);
// }, (err) => {
//     console.log("这里捕获错误了，因此下面的catch没有被执行", err);
// }).catch((err) => {// 最后发现了catch（兜底的）
//     console.log("只要上面有捕获错误，就不会执行这个catch", err);
// });

// 情况3衍生出来的特殊情况4：catch方法后还是可以继续跟then方法的
// read('name.txt', 'utf8').then((data) => {
//     return read(data+"a", 'utf8');
// }).then((data) => {
//     console.log(data);
// }, (err) => {
//     return 100;
// }).then((data) => {
//     console.log(data);
//     return new Promise((resolve, reject) => {
//         reject("错误了");
//     })
// }).catch(err => {
//     console.log("这个catch捕获了错误，但是没有return，此时js函数会默认return undefined，如果这个catch后面还有then，那么走到下一个then里去，就会变成情况2了");
// }).then(data => {
//     console.log("上面的catch默认return undefined，也会走到这个then中", data);
// });

// 一直then是可以的，但是如果不是返回有意义的内容的话，一直then下去是没有意义的，平时也不会这么无聊的写
// read('name.txt', 'utf8').then((data) => {
//     return read(data, 'utf8');
// }).then(data => {
//     console.log("上面的then return了value", data);
// }).then(data => {
//     console.log("上面的then默认return undefined，也会走到这个then中", data);
// }).then(data => {
//     console.log("上面的then默认return undefined，也会走到这个then中", data);
// }).then(data => {
//     console.log("上面的then默认return undefined，也会走到这个then中", data);
// }).then(data => {
//     console.log("上面的then默认return undefined，也会走到这个then中", data);
// });

/**
 * 因此，如果我想一直进行链式调用的话，就不停地在then中返回promise，那么这个promise的结果就会作为下一次then的成功或者失败
 */

/**
    catch就是个语法糖（then回调中err方法的简写），其实本质就是then的第二个参数，也就是错误的回调。它帮助我们少写一个成功的回调。

    read('name.txt', 'utf8').then((data) => {
        return read(data+"a", 'utf8');
    }).catch(err => {
        return 100;
    });

    上面的catch，和下面的第二个then的err回调是一样的
    
    read('name.txt', 'utf8').then((data) => {
        return read(data+"a", 'utf8');
    }).then(data => {
        console.log(data);
    }, err => {
        return 100;
    });

 */

/**

    promise如何实现链式调用的？

    jq中的链式调用返回的是this，而promise中的链式调用返回的是一个新的promise；
    promise 必须返回一个全新的promise 这样可以解决promise的状态问题，否则可能会出现promise刚开始成功，后来又变成失败态了；
    promise有个特点，一旦成功，就不能再失败，或者一旦失败，就不能再成功；
    每次都返回一个全新的promise，这样这个promise是有成功和失败的，而且是互不干扰的，因为上一个promise的成功或者失败，不会影响下一个promise的成功或者失败；
    如果一直返回this的话，this会一直继承下去，那么this有可能是上一次是成功的，下一次就是失败的，这样不符合promise/A+规范对于状态不可变的定义，因此promise的链式调用，每次必须返回一个全新的promise；
    
    read('name.txt', 'utf8').then((data) => {
        return read(data+"a", 'utf8');
    })

 */
