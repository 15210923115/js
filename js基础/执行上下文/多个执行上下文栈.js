// 一、执行上下文分类
// 1.1 JS代码在执行的时候会进入一个执行上下文，可以理解为当前代码的运行环境
// 1.2 在JS中运行环境主要分为全局执行上下文环境和函数环执行上下文环境（eval也是一个执行环境，但是一般并不到）
// 1.2.1 全局执行上下文只有一个，在客户端中一般由浏览器创建，也就是我们熟知的window对象，我们能通过this直接访问到它
// 1.2.2 window对象还是var声明的全局变量的载体。我们通过var创建的全局对象，都可以通过window直接访问

// 二、多个执行上下文
// 2.1 在JS执行过程会产出多个执行上下文,JS引擎会有栈来管理这些执行上下文
// 2.2 执行上下文栈(下文简称执行栈)也叫调用栈，执行栈用于存储代码执行期间创建的所有上下文，具有LIFO（Last In First Out后进先出，也就是先进后出）的特性
// 2.3 栈底永远是全局上下文，栈顶为当前正在执行的上下文
// 2.4 当开启一个函数执行时会生成一个新的执行上下文并放入调用栈，执行完毕后会自动出栈

function one() {
    var a = 1;
    function two() {
        var b = 1;
        function three() {
            var c = 1;
            debugger;
        }
        three();
        console.log(a);
    }
    two();
}
one();

var globalExecuteContext = {
    // 全局执行上下文
    VO: { 
        setTimeout, 
        Math, 
        String, 
        Object,
        one
    }
}

var executeContextStack = [
    globalExecuteContext
];

var oneExecuteContext = {
    // 函数执行上下文
    // oneExecuteContext.VO对象是我们无法访问和获取的
    // 为什么呢？是为了保护里面的变量不被外部随意修改（也就是为什么函数外部访问不到函数内部定义的变量）
    VO: { a: 1 }
}
executeContextStack.push(oneExecuteContext);

var twoExecuteContext = {
    VO: { b: 2 }
}

executeContextStack.push(twoExecuteContext);

var threeExecuteContext = {
    VO: { c: 3 }
}

executeContextStack.push(threeExecuteContext);
console.log(executeContextStack);

executeContextStack.pop();
executeContextStack.pop();
executeContextStack.pop();

/**
 * 执行上下文栈
 * 这里的栈是一种数据结构，里面管理着很多执行上下文
 * 每次执行函数，都会产生一个执行上下文
 * 全局上下文VO，也被称为GO（Global Object）全局对象
 * 全局对象上的属性可以在任何地方被访问到
 * 在浏览器端GO就是VO就是window
 */

