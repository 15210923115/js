// 1. ES5声明变量只有两种方式：var和function
// 2. ES6有let、const、import、class再加上ES5的var、function共有六种声明变量的方式
// 3. 浏览器环境中顶层对象是window，Node中是global对象
// 4. ES5中 顶层对象的属性等价于全局变量
// 5. ES6中var、function声明的全局变量，依然是顶层对象的属性；let、const、class声明的全局变量不属于顶层对象的属性

let a = 10;
console.log(window.a);// undefined
const b = 20;
console.log(window.b);// undefined
class C {}
console.log(window.C);// undefined

var d = 30;
console.log(window.d);// 30
function e() {}
console.log(window.e);// ƒ e() {}

'use strict' 
var a = 1;
console.log(a);//1
{
    console.log(a);// f 2
    function a() {
        console.log(2);
    }
}
console.log(a);// f 2

/**

    let 声明的变量为什么在window上访问不到？

    ES6的全局作用域下，VO和GO做了分离
    let f = 10;
    VO.f可以访问到
    但是GO.f访问不到了

    var s = 1;// window.a = global.variableEnvironment.a = 1; var在全局作用域下赋值，相当于给widow上赋值
    let x = 2;// global.lexicalEnvironment.b = 2，该操作并未在window上进行赋值，所以let声明的变量在window上拿不到
    console.log(window.s);// 1
    console.log(window.x);// undefined

 */

/**
 * function声明和var声明的区别？
 * 
 * - 扫描的时候，先扫描function，再扫描var
 * - function声明会在VO上声明并且直接赋值，var声明只在VO上声明但是不赋值（只复制undefined）,var的赋值是在执行阶段进行的
 */

/**
 * Local 是怎么和 closure one、closure two关联起来的？
 * 
 * 通过作用域链scopeChain=[local, twoVO, oneVO]
 */

/**
 * 为什么前两个叫Closure，第三个叫Local？
 * 
 * AO就是执行上下文栈的栈顶，它的VO就是Local
 */
