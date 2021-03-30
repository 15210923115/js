// var add = (function (length) {// 参数个数
//     let allArgs = [];
//     function _add(...args) {
//         allArgs = [...allArgs, ...args];
//         if (allArgs.length >= length) {
//             let sum = allArgs.reduce((pre, curr) => pre + curr, 0);
//             allArgs = [];// 要及时清空allArgs，使add可以多次调用。
//             return sum;
//         } else {
//             return _add;
//         }
//     }; 
//     return _add;
// })(5);

// function add(...args) {
//     let _add = add.bind(null, ...args);
//     _add.toString = function () {
//         return args.reduce((pre, curr)=>pre + curr, 0);
//     }
//     return _add;
// }
// // 使用alert打印一个对象的时候，它会调用对象的toString方法，打印一个字符串，那么我们把对象toString重写，让其实现累加的逻辑并返回结果且打印。
// alert(add(1, 2, 3, 4, 5));//15
// alert(add(1)(2, 3)(4, 5));//15
// alert(add(1)(2)(3)(4)(5));//15




// 函数柯理化：函数柯里化就是把接受多个参数的函数变换成接受一个单一参数的函数，并且返回接受余下参数返回结果的技术

function curry(fn, ...args) {
    // 函数的length属性，代表形参的个数
    return args.length < fn.length ? (...extraArgs) => {
        debugger;
        return curry(fn, ...args, ...extraArgs)
    } : fn(...args);
}

function addFn(a,b,c,d,e) {
    return a+b+c+d+e;
}

let add = curry(addFn);

// console.log(add(1,2,3,4,5));
// console.log(add(1)(2,3)(4,5));
console.log(add(1)(2)(3)(4)(5));
