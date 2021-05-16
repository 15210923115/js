// 核心：基于已有的对象来创建新的对象
// 原型式继承的主要思路就是基于已有的对象来创建新的对象（原型式继承本质其实就是个浅拷贝，以一个对象为模板复制出新的对象）
// 实现的原理是：向函数中传入一个对象，然后返回一个以这个对象为原型的对象的实例。
// 这种继承的思路主要不是为了实现创造一种新的类型，只是对某个对象实现一种简单继承。
// ES5 中定义的Object.create() 方法就是原型式继承的实现。
// 缺点与原型链方式相同。

/**
    原型式继承解决的问题：
        1.跟原型链继承一样，实现了函数的复用
 */

/**
    原型式继承的缺陷：
        1.跟原型链继承的缺陷一样
        2.因为原型式继承是个浅拷贝，所以引用类型的数据共享在不同的实例之间（这就是原型链继承的一个缺陷），原理都是一样的。
        function object( o ){
            var G = function(){};
            G.prototype = o;
            return new G();
        }
        var obj = {
            skills : [ 'php', 'javascript' ]
        };
        var obj2 = object( obj );
        obj2.skills.push( 'python' );
        var obj3 = object( obj );
        console.log( obj3.skills ); // php,javascript,python
        // 可以看到：obj2改变了skills数组，obj3的skills结果就是其他实例改变的结果
 */

function content(obj) {
    function F() {};
    F.prototype = obj;// 核心在这里
    return new F();
}

var a = {
    name: 'yyang',
    age: 10,
    getName: function () {
        return this.name+this.age;
    }
}

var b = content(a);
console.log(b.name, b.age, b.getName());// yyang 10 yyang10

// 以上的代码就是原型式继承，可以看到原型式继承，跟构造函数没有半毛钱关系。
// 原型式继承本质其实就是个浅拷贝，以一个对象为模板复制出新的对象。

// ES5中定义的Object.create()方法就是原型式继承的实现。
var c = Object.create(a);
console.log(c.name, c.age, c.getName());// yyang 10 yyang10

// 所以一般情况下，我们使用Object.create()方法实现原型式继承，Object.create()里的参数一般是一个构造函数的原型对象
// Object.create实现原型式继承的方法如下：
function A() {}
A.prototype.print = function(){
    console.log("printA");
}
A.prototype.attr = "attrA";

function B() {}

B.prototype = Object.create(A.prototype);// B.prototype === new F() -> B.prototype === f -> B.prototype.__proto__ === f.__proto__ -> B.prototype.__proto__ === F.prototype
B.prototype.constructor = B;// 需要重新定义constructor构造函数
console.log("1:", B.prototype.attr);// "attrA"
console.log("2:", B.prototype.hasOwnProperty("attr"));// false

var _b = new B();

_b.print();// "printA"
console.log(_b.attr);// "attrA"

B.prototype.attr = "attrB";// 行1

var _c = new B();// 行2
console.log(_c.attr);// "attrB" 行3

console.log(A.prototype.attr);// "attrA" 行4

// 从行1到行4的步骤，可以看出，使用Object.create的方式实现的原型式继承，是切断了B.prototype和A.prototype的直接联系
// 修改B.prototype上的某个属性，并不会影响到A.prototype上相应属性，比如

/**
    解读：B.prototype = Object.create(A.prototype)
    
    1. B.prototype = new F() -> 
    2. B.prototype === f -> 
    3. B.prototype.__proto__ === f.__proto__ -> 
    4. B.prototype.__proto__ === F.prototype ->
    5. 又 F.prototype === A.prototype ->
    6. 所以 B.prototype.__proto__ === A.prototype

    因此子类B的实例，可以通过__proto__链查找到父类原型上的方法。
    且修改 B.prototype和A.prototype没有直接的联系，因此修改 B.prototype上的任意属性，对A.prototype上的属性没有任何影响
 */