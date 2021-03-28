/**
 * 问题：prototype根本上解决的是什么问题？
 * 
 * 解答：用来实现共有方法和属性，节省内存和性能。
 * 解析：为了解决共有属性的问题，私有的放在构造函数里，公有的放到prototype上，既能让实例都能调到公有的方法，又能节约内存，还能共用逻辑，共用代码，所以出现了prototype。
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