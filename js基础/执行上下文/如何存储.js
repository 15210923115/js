// 当函数运行时，会创建一个执行环境，这个执行环境就叫执行上下文(Execution Context)，它是一个对象
// 执行上下文中会创建一个对象叫作变量对象(Variable Object)，里面存放着当前函数执行要使用到的变量
// 基本数据类型的值保存在变量对象里

// 引用数据类型的值要单独在堆内存里开辟空间保存，变量对象里保存的是引用数据类型在堆内存的地址，我们通过操作引用数据类型的引用地址来操作对象

// 执行上下文对象是放在堆里面的

// 执行上下文是一个对象，不是栈，很多执行上下文可以组成一个栈结构，叫做执行上下文栈

// 内存地址

var value = 300;
function sum(s1, s2) {
    return s1+s2;
}
function task(m, n){
    var a = 1;
    var b = {
        name:'Yyang'
    }
    var c = [1,2,3];
    var d = sum(1,2);
    var e = value;

    function is(bool) {
        return bool;
    }
    is(true);
    debugger;
}
task(100, 200);

let ExecuteContext = {
    this: window,
    scopeChain: [],
    VO: {// 当前函数执行所需的变量都存放在执行上下文的VO变量里
        a: 1,
        b: 'XO1',
        c: 'XA1',
        d: 3,
        e: 300,
        is: function is(bool) {},
        m: 100,
        n: 200,
    }
};
