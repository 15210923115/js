/**
 * 函数
 * 
 * 为了批量创建对象，我们有了函数
 * 
 */

// 字面量创建对象，是一个语法糖，内部调用的是new Object()
// let obj1 = {name: 'zf'};

// Object是个什么东西？其实也是一个函数，可以创建普通对象。
// 在浏览器控制台通过console.dir(Object)，可以看到打印出来一个函数，它上面有很多属性。
let obj2 = new Object();
// Object哪来的？
// Object也是一个函数，函数也是对象，肯定也是new出来的
// Object是函数的一个实例

function add(a, b) {
    return a+b;
}
console.log(add.length);// 形参的个数
// add也是Function类的实例
// Object也是Function类的实例

let minus = new Function('a', 'b', 'return a-b;');
console.log(add(1,2));// 3
console.log(minus(2,1));// 1

// 在JS内部有这样一个方法let Object = new Function();

Object.__proto__ = Function.prototype;// 所以说Object是Function的一个实例，根在Function上

// Object函数是JS内部创建好的，通过new

function Person() {

}
// let Person = new Function();// Person也是Function new出来的

let Function = new Function();// 在JS内部，Function是自己new出来的

let Object = new Function();// Object也是Function new出来的（Object也是一个函数，所以是使用new Function创建的）

// 函数的祖宗就是Function，包括Function的祖宗也是Function，自己是自己的祖宗
Function.prototype === Function.__proto__

// Object的祖宗是null
Object.prototype.__proto__ === null

// Function是一切函数的根
// Object.prototype是一切原型的根

// instanceof 原理
// instanceof运算符的第一个参数是一个对象，第二个参数一般是一个函数
// instanceof的判断规则是: 沿着对象的__proto__这条链来向上查找，如果能找到函数的prototype则返回true，否则返回false
function Animal() {};
let dog = new Animal();
console.log(dog instanceof Animal);// true 因为dog.__proto === Animal.prototype
console.log(dog instanceof Object);// true 因为dog.__proto === Animal.prototype -> Animal.prototype.__proto === Object.prototype
console.log(dog instanceof Function);// true 

// __proto__属性组成的链条就叫原型链

// 为什么要有原型链？为了实现属性和方法的共享。

// 为什么会有函数呢？核心作用就是批量创建对象（共有的放在原型上，不共有的放在私有属性上）。

// 为什么会有原型？用来实现共有方法和属性，节省内存和性能。

let a = 1;// 基本类型只是一个值，没有属性和方法。那么怎么调的toString方法呢？通过包装对象，当你.的时候，它会new Number(a).toString()
console.log(a.toString());// 1
console.log(Number.prototype.__proto__.toString());