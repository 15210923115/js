// 函数柯理化   通用的柯理化函数

// 柯理化也是一个高阶函数

// 判断一个元素的类型
// typeof 可以判断什么类型，但是不能区分对象 比如是数组还是object或者null，都区分不了
// constructor 可以判断构造函数
// instanceof
// Object.prototype.toString.call() 可以借助对象原型上的toString方法，将它转换成一个字符串，判断类型

/*

// 传统的判断元素类型的方法

function isType(typing) {
    return function (val) {
        return Object.prototype.toString.call(val) === `[object ${typing}]`;
    }
}
// 让方法更具体一些 isNumber isString
let utils = {};
['String','Number','Boolean'].forEach(method => {
    utils[`is`+method] = isType(method);
});

console.log(utils.isString(123));
console.log(utils.isNumber(123));

*/


// 柯理化函数
// 分批传入参数 每次的入参都是一个参数 最终会把执行后的结果返给我
// 当我传入的参数和我预期的参数一样，就达到参数要求的结果了，这时候才会去真正的执行函数
// function sum(a,b,c,d,e) {
//     return a+b+c+d+e;
// }
// sum(1)(2)(3)(4)(5);

// 偏函数
// sum(1,2)(2)(3,4,5);

// 柯理化和偏函数的区别：柯理化的参数固定，每次的入参都是一个参数，否则不能做柯理化。但是偏函数不固定，每次的入参可以是一个、两个或者多个，只要能达到参数要求的结果就行。

// redux compose就是用curring包裹的，将一个个的函数自由组合起来

function sum(a,b,c,d,e) {
    return a+b+c+d+e;
}

// 实现柯理化（柯理化其实也是一个闭包）
const curring = (fn, arr = []) => {// arr就是我们要收集每次调用时传入的参数
    let len = fn.length;
    return function (...args) {
        let newArgs = [...arr, ...args];
        if (newArgs.length === len) {
            return fn(...newArgs);
        } else {
            return curring(fn, newArgs);
        }
    }
};

let newSum = curring(sum);

// 柯理化
console.log(newSum(1)(2)(3)(4)(5));
// 偏函数
console.log(newSum(1)(2)(3,4,5));


// 现在就可以使用函数柯理化处理“判断元素类型”
function isType(typing, val) {
    return Object.prototype.toString.call(val) === `[object ${typing}]`
}

let newIsType = curring(isType);
const isString = newIsType('String');
const isNumber = newIsType('Number');
console.log(isString('hello'));
console.log(isNumber('hello'));



/**
    知识拓展：
    函数的长度就是参数的个数
    function sum(a,b,c,d,e) {
        return a+b+c+d+e;
    }
    console.log(sum.length);// 5
 */