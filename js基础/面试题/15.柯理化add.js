var add = (function (length) {// 参数个数
    let allArgs = [];
    function _add(...args) {
        allArgs = [...allArgs, ...args];
        if (allArgs.length >= length) {
            let sum = allArgs.reduce((pre, curr) => pre + curr, 0);
            allArgs = [];// 要及时清空allArgs，使add可以多次调用。
            return sum;
        } else {
            return _add;
        }
    }; 
    return _add;
})(5);

console.log(add(1, 2, 3, 4, 5));//15
console.log(add(1)(2, 3)(4, 5));//15
console.log(add(1)(2)(3)(4)(5));//15

// 函数柯理化：函数柯里化就是把接受多个参数的函数变换成接受一个单一参数的函数，并且返回接受余下参数返回结果的技术

