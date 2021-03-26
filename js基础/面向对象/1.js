/**
 * C语言是一个面向过程的语言
 * 
 * 基本上所有的现代语言都是面向对象的
 * 
 * Java 整个系统划分为若干个对象，每个对象都有自己的数据和方法，然后通过相互调用进行协作完成任务
 */

/**
 * 1.JS数据类型分为两种
 *  基本类型：string、boolean、null、undefined、symbol、number
 *  引用类型：都是对象，像Array、Object、Regex、Date、Math、Function（函数是一种特殊的对象）
 */

// console.log(typeof a);    // undefined
// console.log(typeof 1);   // number
// console.log(typeof 'zhufeng'); // string
// console.log(typeof true);  // boolean
// console.log(typeof Symbol('a'));  // symbol

// console.log(typeof function () { });  //function 函数是一种特殊的对象

// console.log(typeof [1, 2, 3]);  //object
// console.log(typeof { name: 'zhufeng' });  //object
// console.log(typeof null);  //object 这是JS设计的一个意外的BUG
// console.log(typeof new Number(1));  //object
// console.log(typeof new Date());// object
// console.log(typeof /^$/);// object

/**
 * 什么是对象？对象和基本数据类型的本质区别是什么？
 * 
 * 基本数据类型是光棍，或者说只是一个值；而对象类型是若干个属性的集合，可以放多个值（对象就是属性的容器，多个值的集合）。
 * 
 * 一切引用类型都是对象。
 * 
 * 函数和数组也是对象。
 * 
 * function 为什么这么特殊？它和其它对象的本质区别是什么？
 * function本质上来说是可以生产别的对象的，它是一个对象的工厂，所有的对象包括函数本身，都是由函数生产出来的。
 * 
 * 1.为什么需要函数来生产对象呢？为什么函数会出现？它能解决什么问题？
 * 
 */

// 刚开始的时候，手动地一个个地创建对象
var zhangsan = {name: 'zhangsan', age: 10, eat() { console.log('吃饭'); }};
var lisi = {name: 'lisi', age: 20, eat() { console.log('吃饭'); }};
// 后来为了加快生产对象的速度，就有了函数，函数可以用来批量地生产对象
function Person(name, age) {
    // new的时候，首先会创建一个空对象
    this.name = name;
    this.age = age;
}
// 把批量创建出来的对象（构造函数的实例）共有的属性放在构造函数的原型上
Person.prototype.eat = function() {console.log('吃饭');}

// 把批量创建出来的对象，称为构造函数的实例
let zhangsan2 = new Person('zhangsan2', 10);
let lisi2 = new Person('lisi2', 20);
// 我们可以将对象的属性分成两种，以Person为例，有些属性是每个对象特有的，都不一样，有些属性是所有的Person都一样。

/**
 * 为了保证灵活性，为了节约内存和性能，出现了prototype，它的作用是：
 * 
 * 因为eat是每个实例对象都有的方法，如果在构造函数内通过this.eat = function() {console.log('吃饭')}的方式，给每个实例对象设置一个eat属性，那么每个实例对象都会有一个eat属性，且值是函数；
 * 
 * 因为函数也是一个对象，占有的内存空间比较大，如果每个实例对象都通过this.eat的方式设置吃饭属性的话，那么就会造成资源浪费，消耗性能，因此prototype出现了，让每个实例对象通过prototype属性查找，都可以找到eat属性，让eat属性变成公有的，大家自己身上没有eat属性，而是在原型链上可以找到，这样就大大节省了内存和性能。
 * 
 * 总结一下就是：为了解决共有属性的问题，私有的放在构造函数里，公有的放到prototype上，既能让实例都能调到公有的方法，又能节约内存，还能共用逻辑，共用代码，所以出现了prototype。（这也就是为什么会出现原型链的原因）
 */

// 模拟new的实现原理
function _new(ClassName, ...args) {
    let obj = {};// 它里面其实有东西（这个东西是__proto__属性，这上面都是它的构造函数原型上的属性），但是感觉像是空的一样（这个是调用_new的时候，要返回的实例对象）
    // JS里尽量少说类的概念，因为JS里没有类，但是有构造函数
    // 实例才有__proto__属性，没有prototype属性；构造函数有prototype属性
    // obj.prototype = ClassName.prototype; 这样写是不对的，因为实例才有__proto__属性，没有prototype属性
    obj.__proto__ = ClassName.prototype;// 让obj的隐式原型指向构造函数的prototype，关联构造函数的原型
    ClassName.call(obj, ...args);// 以obj作为this对象，调用构造函数，给实例的私有属性赋值

    return obj;
}

let zhangsan3 = _new(Person, 'zhangsan3', 10);
let lisi3 = _new(Person, 'lisi3', 20);

// __proto__ 隐式原型
// zhangsan3.__proto__.eat(); 可以这样调用，但是太麻烦，直接zhangsan3.eat()即可
// .也是一个运算符，它会现在zhangsan3这个实例的属性上找eat属性，如果找到了，直接返回使用；如果没有找到，就查找zhangsan3.__proto__上有没有eat属性，如果有，就返回使用；
zhangsan3.eat();

// 只有函数才有prototype对象
// 构造函数的所有实例，都共享了一个prototype，构造函数的原型对象是单例的。

// prototype上也有__proto__