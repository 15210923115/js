// 1组
var a = 1;
function a() {}
console.dir(a);// 1

function a() {}
var a = 1;
console.dir(a);// 1

// 2组
let a = 1;
function a() {}
console.dir(a);// Uncaught SyntaxError: Identifier 'a' has already been declared

function a() {}
let a = 1;
console.dir(a);// Uncaught SyntaxError: Identifier 'a' has already been declared

// 3组
let a = 1;
var a = 2;
console.dir(a);// Uncaught SyntaxError: Identifier 'a' has already been declared

var a = 2;
let a = 1;
console.dir(a);// Uncaught SyntaxError: Identifier 'a' has already been declared

// 4组
var a = 2;
var a = 1;
console.log(a);// 1

let a = 2;
let a = 1;
console.log(a);// Uncaught SyntaxError: Identifier 'a' has already been declared

// 5组
var a = 1;
console.dir(a);// 1 直接执行console.log函数，这是JS内置函数，无需编译，直接执行
function a() {}


function a() {}
console.dir(a);// f a()
var a = 1;


// 通过上面4组的测试，发现let声明的变量，不可以和任何其它var、function、const和let声明的变量重复声明。（const的规则和let一样，就不写了)
// 其中1组的情况，为什么var声明的变量结果会覆盖function声明的变量结果？
// 编译阶段，function会声明并赋值，而var仅声明不赋值，且编译阶段function会优先于var声明，因此发现有function声明了a，就不再管var声明的a了
// var、let和const声明的变量在编译阶段只声明，不赋值，都是在代码执行阶段赋值的。

/**
    var a = 1;
    function a() {}
    console.dir(a);// 1

    编译阶段function会优先于var声明，因此发现有function声明了a，就不再管var声明的a了：
    编译阶段{a: fn} -> 执行阶段{a: 1}
 */

/**
    function a() {}
    var a = 1;
    console.dir(a);// 1
    
    编译阶段function会优先于var声明，因此发现有function声明了a，就不再管var声明的a了：
    编译阶段{a: fn} -> 执行阶段{a: 1}
 */

/**
 * 其实es6的“代码块里的”let和const也有变量提升，只是在变量赋值之前，变量是不能使用的，例如下面的代码：
 * {
 *      console.log(a);
 *      let a = 1;
 * }
 * 
 * 会报错：Uncaught ReferenceError: Cannot access 'a' before initialization
 * 
 * 由这个报错可以看出，肯定是进行了变量提升，要不然不会提示在a初始化之前不能访问使用。
 * 
 * 平时说的let和const不存在变量提示是不严谨的的，也是不正确的，但是大家都那么说，是因为表面上看着确实不像变量提升。
 */