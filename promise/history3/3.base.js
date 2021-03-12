let Promise = require('./promise');

let p1 = new Promise((resolve, reject) => {
    resolve('hello');
});

// 可选参数与的处理 

// 穿透：如果then里不写任何回调，那么就会把这个data依次往下传递
p1.then().then().then().then(data => {
    console.log(data, 'resolve');
}, err => {
    console.log(err);
});

let p2 = new Promise((resolve, reject) => {
    reject('hello');
});

// 穿透：如果then里不写任何回调，那么就会把这个data依次往下传递
p2.then().then().then().then(data => {
    console.log(data);
}, err => {
    console.log(err, 'err');
});