// 1. 闭包有两部分组成，一个是当前的执行上下文A，一个是在该执行上下文中创建的函数B
// 2. 当B执行的时候引用了当前执行上下文A中的变量就会产出闭包
// 3. 当一个值失去引用的时候就会会标记，被垃圾收集回收机回收并释放空间
// 4. 闭包的本质就是在函数内部保持外部变量的引用，从而阻止垃圾回收
// 5. 调用栈并不会影响作用域链，函数调用栈是在执行时才确定，而作用域规则是在代码编译阶段（也就是作用域链是在函数创建的时候确定的）就已经确定了
// 6. MDN定义：闭包是指这样的作用域foo，它包含了一个函数fn，这个函数fn可以调用被这个作用域所封闭的变量a、函数等内容

// function one() {
//     var a = 1;
//     var b = 2;
//     function two() {
//         var c = 3;
//         debugger;
//         console.log(a,c);
//     }
//     return two;
// }
// let two = one();
// two();

/**
// 中间没用到的变量闭包会忽略

function one() {
    var a = 1;
    function two() {
        var b = 2;
        function three() {
            var c = 3;
            debugger;
            console.log(a, b, c);
        }
        three();
    }
    two();
}
one();

function one() {
    var a = 1;
    function two() {
        var b = 2;
        function three() {
            var c = 3;
            debugger;
            console.log(a, c);
        }
        three();
    }
    two();
}
one();

 */
