// 此题考查new运算符、.运算符的优先级，以及prototype

function Foo() {
    getName = function () {
        console.log(1);
    }
    return this;
}

Foo.getName = function () {
    console.log(2);
}

Foo.prototype.getName = function () {
    this.name = 'FOO-foo'
    console.log(3);
    return 'Foo的实例foo原型上的方法getName'
}

var getName = function () {
    console.log(4);
}

function getName() {
    console.log(5);
}

Foo.getName();// 行1 *** 打印2
getName();// 行2 *** 打印4
Foo().getName();// 行3 *** 打印1
getName();// 行4 *** 打印1
new Foo.getName();// 行5 *** 打印2
new Foo().getName();// 行6 *** 打印3
let ret = new new Foo().getName();// 行7 *** 打印3
// 打印顺序：2 4 1 1 2 3 3
console.log(ret);// Foo.getName {name: "FOO-foo"}

// 这段代码的执行，分为编译阶段和执行阶段
// 一、编译阶段
// 1.1 扫描所有的function声明并赋值
var globalEC = {
    this: globalThis,
    scopeChain: [],
    VO: {
        Foo: () => {},// 此处创建Foo函数，并且给设置了prototype属性
        getName: () => { console.log(5) }
    }
}
// 1.2 扫描所有var声明，赋值为undefined
// 发现var声明的getName已经被function声明过了，因此就不再声明了

// 二、执行阶段
globalEC.VO.Foo.getName = function () {
    console.log(2);
}

globalEC.VO.Foo.prototype.getName = function () {
    console.log(3);
}

globalEC.VO.getName = function () {
    console.log(4);
}

// 执行行1
globalEC.VO.Foo.getName(); // 打印2 这一步会产生一个执行上下文，此处省略了，知道怎么回事就行

// 执行行2
getName();// 打印4 这一步会产生一个执行上下文，此处省略了，知道怎么回事就行

// 执行行3 Foo().getName()
// 会先执行Foo函数，产生一个FooEC
var FooEC = {
    VO: {}
};
globalEC.VO.getName = function () {
    console.log(1);
};
// FooEC出栈
// FooEC执行完之后，返回this，此处的this就是window，则代码变成执行window.getName()了，也就是执行globalEC.VO.getName()
globalEC.VO.getName(); // 打印1 这一步会产生一个执行上下文，此处省略了，知道怎么回事就行

// globalEC.VO.getName()出栈

// 执行行4
globalEC.VO.getName(); // 打印1 这一步会产生一个执行上下文，此处省略了，知道怎么回事就行

// 执行行5 new Foo.getName();
// 这段代码到底是先执行new Foo呢，还是先执行Foo.getName呢？
// 这涉及到运算符优先级问题了，成员访问（也就是.运算符）运算符的优先级是19，此处new是无参数列表的，优先级是18，可参考mdn（https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence）
// .的优先级比new的高，先执行Foo.getName
// Foo.getName是function () {console.log(2);}，因此此处new的是这个函数，因此执行行5，会打印2

// 执行行6 new Foo().getName()
// 此处的new运算符是带参数列表的，优先级是19，.运算符优先级也是19，优先级相同时，从左往右开始计算
// 因此先执行new Foo()
// 执行new Foo()第一步是：
globalEC.VO.getName = function () {
    console.log(1);
};
// 执行new Foo()第二步是生成了一个Foo的实例foo，于是代码变成了foo.getName()，在实例上调getName方法，
// 首先看实力上有没有自己的getName方法，发现没有，于是去实例的原型上找，发现有getName方法，且
// 方法为function () {console.log(3);}，于是执行该方法，打印3

// 执行行7 new new Foo().getName()
// 这段代码很独特，少见，有两个new，且第二个new是带参数列表的，优先级是19，因此先执行new Foo()返回了实例foo
// 代码就变成了new foo.getName()，到这里就剩一个new了，发现这个new是无参数列表的，优先级是18，.的优先级是19，
// 因此先执行foo.getName，foo.getName是函数function () {console.log(3);}，这里把这个函数记为fun，
// 于是代码变成了new fun()，代码就变成了new一个fun函数，于是打印3

// 结果是：2 4 1 1 2 3 3
