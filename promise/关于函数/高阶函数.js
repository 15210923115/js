// 高阶函数 满足下面两个条件中的一个的，就是高阶函数：
// 1》一个函数返回一个函数
// 2》一个函数作为另一个函数的参数

// 装饰器模式：对我们原有的功能进行包装

function core(a,b,c) {
    // todo...
    console.log("core 原有的功能", a,b,c);
}

// 一段核心代码，基于它进行再次封装，装饰出一个新方法，既不耽误别人使用核心代码，也能满足自己的使用需求

// 每个类都有一个原型，每个实例都有一个属性__proto__
Function.prototype.before = function (beforeFn) {
    // this == core this的指向 就是看调用者，谁调的就是谁
    // console.log(this);
    // 箭头函数中没有this、arguments和prototype
    return (...args) => {// 参数...args中的...是剩余运算符：把所有的参数转成一个数组
        beforeFn();
        this(...args);// 参数...args中的...是展开运算符：把数组一项一项展开，传递给当前的方法
    }
}

let newFn = core.before(() => {
    console.log("core before");
})

newFn(1,2,3);

/**

在原有功能不变的情况下，增加自己的逻辑

function xxx() {

}
xxx.before(() => {
    console.log("xxx");
})

 */

// 闭包
// 定义函数的作用域 和 调用的作用域 不是同一个