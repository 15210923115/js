// 核心：B.prototype = new A()和A.call(this, ...args)
// 组合继承是将原型链和借用构造函数组合起来使用的一种方式。通过借用构造函数的方式来实现类型的属性的继承，
// 通过将子类型的原型设置为父类型的实例来实现方法的继承。这种方式解决了上面的两种模式单独使用时的问题，

/**
    组合继承解决了什么问题？
        解决了1：在子类的构造函数中调用父类的构造函数，可以实现定义子类的实例时，可以向父类构造函数传参，
                同时子类可以继承父类构造函数里定义的实例私有属性；
        解决了2：通过将子类的原型设置为父类的实例，实现了父类原型属性上包含的所有方法的继承；
 */
/**
    组合继承的缺陷：
        1.由于我们是以父类型的实例来作为子类型的原型，造成子类型的原型中多了很多不必要的属性。
        2.调用了两次父类的构造函数，消耗性能。
 */

// 为什么组合继承的方式调用了两次父类的构造函数？这个需要格外理解，原理就在new的执行原理上
/**
    new的执行原理
    function _new(F, ...args) {
        var obj = {};
        obj.__proto__ = F.prototype;
        F.call(obj, ...args);
        return obj;
    }

    通过new的原理不难看出：
        第一次调用父类的构造函数，是在new A()的时候，里面调用了一次父类构造函数；
        第二次调用父类构造函数，是在创建子类实例的时候，因为要将子类的构造函数调用一次，那里又调用了一次父类构造函数；
 */

function A(age) {
    this.age = age;
    this.arr = [0];
}
A.prototype.debug = function(){
    console.log(this.age+this.arr[1]);
}

function B(name, ...args) {
    A.call(this, ...args);// 实现了借用构造函数继承的传参功能
    this.name = name;
}
B.prototype = new A();// 实现了原型链继承共享函数的功能；不过这里有个严重的问题，new A()还会返回A对象实例的私有属性，该私有属性也会赋值给B.prototype，造成子类型的原型中多了很多不必要的属性。
B.prototype.constructor = B;
B.prototype.print = function(){
    console.log(this.name+this.age+"岁了");
}

var b1 = new B('yy', 10);
var b2 = new B('dd', 20);

b1.print();// yy10岁了
b2.print();// dd20岁了

b1.arr.push(1);
b2.arr.push(2);
console.log(b1.arr);// [ 0, 1 ]
console.log(b2.arr);// [ 0, 2 ]

b1.debug();// 11
b2.debug();// 22
