/**
 * 反柯理化
 * 
 * 我要实现一个需求，函数的的参数是一个类数组{ '0': 1, '1': 2, '2': 3 }，想办法，在函数内部再往里插入两个参数，分别是4和5。
 * 
 */

// 传统的方法：
(function(){
    Array.prototype.push.call(arguments, 4, 5);// 因为arguments不能直接使用数组方法，因此需要使用Array.prototype.push.call给arguments绑定一下数组的方法，才能让arguments里添加参数
    console.log(arguments);// { '0': 1, '1': 2, '2': 3, '3': 4, '4': 5 }
})(1,2,3);


// 反柯理化的方法：
Function.prototype.uncurring = function(){
    var self = this;// 代表当前的函数
    return function(){
        // console.log(arguments);// {'0': { '0': 1, '1': 2, '2': 3 }, '1': 4, '2': 5, '3': 6}
        let obj = Array.prototype.shift.call(arguments);// 把函数的第一个参数从arguments里删除，并且返回给obj
        // console.log(obj);// { '0': 1, '1': 2, '2': 3 }
        return self.apply(obj, arguments);
    }
}

let push = Array.prototype.push.uncurring();

(function(){
    push(arguments, 4, 5, 6);// 不用考虑arguments上有没有push方法，我们采用反柯理化的思想实现了push方法，直接只用即可，就可以往arguments里随时添加参数
    console.log(arguments);// { '0': 1, '1': 2, '2': 3, '3': 4, '4': 5, '5': 6 }
})(1,2,3);

