// 一、JSON.stringify的三个参数（出自：12.实现一个不可变对象.js）
let obj = {name: 'zf'};
console.log(JSON.stringify(obj, null, 2))

// 二、replace（出自：10.编写parse函数，实现访问对象里属性的值.js）
let str = 'e[0].f[0]';
str = str.replace(/\[(\d+)\]/g, '.$1');
console.log(str);

// 三、在控制台输入：[]+{}，回车之后，控制台返回的是"[object Object]"
console.log([]+{});// "[object Object]"

// 四、箭头函数不能new
let Arrow = () => {};
// new Arrow();// TypeError: Arrow is not a constructor

// 五、函数的toString方法的知识盲区
Function.prototype.toString = function(){
    console.log("Function.prototype.toString");
}

function f() {}
// f.toString = function(){console.log("toString---")}
console.log(f);

// 六、函数自己打印自己
function e() {
    console.log(e);// 是可以打印函数e的，为什么？因为函数在编译阶段是声明并赋值，等到执行的时候，通过执行上下文的作用域链，是可以找到变量e的，因此可以打印函数e的内容。
    // 如果不能打印的话，那函数递归又是咋实现的？所以肯定能打印自己。
}
e();

// 七、Symbol类型
// Symbol的克隆
let sym1 = Symbol('a');
let sym2 = Object(Symbol.prototype.valueOf.call(sym));
// console.log(Symbol.prototype.valueOf.call(sym));
// console.log(Object(Symbol.prototype.valueOf.call(sym)));
// symbol 是一种基本数据类型 （primitive data type）。Symbol()函数会返回symbol类型的值，该类型具有静态属性和静态方法。它的静态属性会暴露几个内建的成员对象；它的静态方法会暴露全局的symbol注册，且类似于内建对象类，但作为构造函数来说它并不完整，因为它不支持语法："new Symbol()"。
// Symbol的作用：每个从Symbol()返回的symbol值都是唯一的。一个symbol值能作为对象属性的标识符；这是该数据类型仅有的目的。
// mdn文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol

// 在对象中查找 Symbol 属性，使用Object.getOwnPropertySymbols()方法
let sym1 = Symbol('1');
let sym2 = Symbol('2');
let obj = {
    [sym1]: 'a',
    [sym2]: 'b'
}
console.log(obj);
console.log(Object.getOwnPropertySymbols(obj));// Object.getOwnPropertySymbols() 方法让你在查找一个给定对象的符号属性时返回一个symbol类型的数组。注意，每个初始化的对象都是没有自己的symbol属性的，因此这个数组可能为空，除非你已经在对象上设置了symbol属性。

// 下面带有 new 运算符的语法将抛出 TypeError 错误：
// var sym = new Symbol(); // TypeError: Symbol is not a constructor
// 这会阻止创建一个显式的 Symbol 包装器对象而不是一个 Symbol 值。围绕原始数据类型创建一个显式包装器对象从 ECMAScript 6 开始不再被支持。 然而，现有的原始包装器对象，如 new Boolean、new String以及new Number，因为遗留原因仍可被创建。
// 如果你真的想创建一个 Symbol 包装器对象 (Symbol wrapper object)，你可以使用 Object() 函数：
var sym = Symbol("foo");
console.log(typeof sym);     // "symbol"
var symObj = Object(sym);
console.log(typeof symObj);  // "object"

console.log(Symbol.prototype.valueOf.call(sym));// Symbol(foo)   获取symbol的原始值
console.log(typeof Symbol.prototype.valueOf.call(sym));// "symbol"
console.log(Object.prototype.toString.call(sym));// "[object Symbol]"



// 八、Set和Map数据结构
