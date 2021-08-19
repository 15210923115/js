/**
 * 一个新的执行上下文的生命周期有两个阶段
    1. 创建阶段
        1.1 创建变量对象
        1.2 确定作用域链
        1.3 确定this指向
    2. 执行阶段
        2.1 变量赋值
        2.2 函数赋值
        2.3 代码执行

 */

/**
 * 变量对象
 
    1. 变量对象会保存变量声明(var)、函数参数(arguments)、函数定义(function)
        1.1 变量对象会首先获得函数的参数变量和值
        1.2 获取所有用function进行的函数声明，函数名为变量对象的属性名，值为函数对象,如果属性已经存在，值会用新值覆盖
        1.3 再依次所有的var关键字进行的变量声明，每找到一个变量声明，就会在变量对象上建一个属性，值为undefined，如果变量名已经存在，则会跳过，并不会修改原属性值，let声明的变量并不会在此阶段进行处理

    2. 函数声明优先级更高，同名的函数会覆盖函数和变量，但同名var变量并不会覆盖函数，执行阶段重新赋值可以改变原有的值
  
 */

/**
 *  当执行one的时候，会创建一个执行上下文
    开始编译，创建执行上下文
    创建VO
        1. 处理函数参数，把参数放入VO
        2. 扫描所有代码，找出function声明；代码会从上往下依次处理所有的函数声明，如果有重复声明的函数，后面会覆盖前面的声明
        3. 扫描var关键字，var不是赋值，只声明，值是undefined
        4. 在编译阶段不会处理let变量的，let的变量也不会放在VO里

    编译完成，开始执行上下文

    
 */

function one(m,n) {
    // let oneVO = {m:1, n:2, fn: () => 2, a: undefined, b: undefined};
    // let oneEC = {VO： oneVO, this: window, scopeChain: [oneVO, globalEC.VO]};
    console.log(m, n);
    var a = 1;
    function fn() {
        return 1;
    }
    function fn() {
        return 2;
    }
    var b = 2;
    var b = 3;
    var c = 4;
}
one(1,2);

// 面试题：
var a = 1;
function fn(m) { console.log('fn'); }
function fn(m) { console.log('new_fn'); }
function a() { console.log('fn_a'); }
console.log(a);// 1
fn(1);// new_fn
var fn = 'var_fn';
console.log(fn);// var_fn

// 编译阶段 globalVO = {fn: () => 'new_fn', a: () => 'fn_a'}
// 执行阶段 一开始是globalVO = {fn: () => 'new_fn', a: 1}，后来是globalVO = {fn: 'var_fn', a: 1}
