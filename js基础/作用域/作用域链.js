// 作用域链是由当前执行环境与上层执行环境的一系列变量对象VO组成的，
// 它保证了当前执行环境对符合访问权限的变量和函数的有序访问
// 作用域规则是在代码编译阶段（也就是作用域链是在函数创建的时候确定的）就已经确定了

function one() {
    var a = 1;
    function two() {
        var b = 2;
        function three() {
            var c = 3;
            console.log(a, b, c);
        }
        three();
    }
    two();
}
one(); 
// 模拟上面函数的作用域链

// 1.创建全局上下文
var globalExecuteContextVO = { one: `()=>{var a = 1;}` }
var globalExecuteContext = {
    VO: globalExecuteContextVO,
    scopeChain: [globalExecuteContextVO]
}
var executeContextStack = [globalExecuteContext];
//2.执行one，创建one执行上下文
var oneExecuteContextVO = {
    a: 1,
    two: `()=>{var b = 2 ;}`
}
var oneExecuteContext = {
    VO: oneExecuteContextVO,
    scopeChain: [oneExecuteContextVO, globalExecuteContext.VO]
}
//2.执行two，创建two执行上下文
var twoExecuteContextVO = {
    b: 2,
    three: `()=>{var c = 3 ;}`
}
var twoExecuteContext = {
    VO: twoExecuteContextVO,
    scopeChain: [twoExecuteContextVO, oneExecuteContext.VO, globalExecuteContext.VO]
}
//3.执行three，创建three执行上下文
var threeExecuteContextVO = {
    c: 3
}
var threeExecuteContext = {
    VO: threeExecuteContextVO,
    scopeChain: [threeExecuteContextVO, twoExecuteContext.VO, oneExecuteContext.VO, globalExecuteContext.VO]
}
function getValue(varName) {
    for (let i = 0; i < threeExecuteContext.scopeChain.length; i++) {
        if (varName in threeExecuteContext.scopeChain[i]) {
            return threeExecuteContext.scopeChain[i][varName];
        }
    }
}
//console.log(a, b, c);
console.log(
    getValue('a'),
    getValue('b'),
    getValue('c'),
);