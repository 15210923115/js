/**
 * 作用域链在函数创建的时候就已经确定了，跟在哪执行没有关系
 * 
 * Global哪来的？就是全局执行上下文的VO，又被称为GO
 *
 */
function one() {
    var a = 1;
    function two() {
        console.log(a);
    }
    console.dir(two);
    // two['[[Scopes]]'] = [oneExecutionContextVO, globalExecuteContextVO] 函数创建的时候，会确定它的父作用域组成的作用域链
    return two;
}
var a = 2;
var outer_two = one();
outer_two();// 1

// 现在开始执行代码，创建执行上下文
// 创建执行上下文有两个阶段：第一个是编译阶段，第二个是执行阶段
// 编译阶段会寻找里面的var变量声明和函数声明，进行变量提升

// 全局编译阶段
var globalExecutionContextVO = {
    one: `()=>{}`, // 编译阶段，函数声明的话会声明并赋值 函数声明的优先级要比var的优先级要高
    a: undefined, // 编译阶段，var变量会声明，但是不赋值
    outer_two: undefined
};
var globalExecutionContext = {
    VO: globalExecutionContextVO,
    scopeChain: [globalExecutionContextVO]
};
// 全局开始执行
globalExecutionContext.VO.a = 2;
// 进入one函数执行的时候它的执行上下文的编译阶段
var oneExecutionContextVO = {
    two: {
        twoFunction: 'twoFunction'
    },
    a: undefined
};
var oneExecutionContext = {
    VO: oneExecutionContextVO,
    scopeChain: [oneExecutionContextVO, globalExecuteContextVO]
};
// 开始执行oneExecutionContext的执行阶段
oneExecutionContext.VO.a = 1;
globalExecutionContext.VO.outer_two = 'two';// 返回two函数
// two函数的编译阶段
var twoExecutionContextVO = {};// two函数里没有变量
// two这个函数的作用域其实并不是在这个时候创建的（不是在two执行的时候创建的，而是在定义的时候）
var twoExecutionContext = {
    VO: twoExecutionContextVO,
    scopeChain: [twoExecutionContextVO, ...two['[[Scopes]]']]
};
// two执行阶段
