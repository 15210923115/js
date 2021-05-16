// 核心：借用构造函数继承+寄生式继承
// 所谓寄生组合式继承，即通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。
// 其背后的基本思路是：不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型原型的一个副本而已。
// 本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型。

// 组合继承的缺点就是使用父类型的实例做为子类型的原型，导致添加了不必要的原型属性。
// 寄生式组合继承的方式是使用父类型的原型的副本来作为子类型的原型，这样就避免了创建不必要的属性。

/**
    寄生组合式继承解决的问题：
        1.解决了组合继承调用两个父类构造函数，而导致父类实例的私有性同时出现在子类的原型上和子类实例的私有属性上。
 */

/**
    寄生组合式继承的缺陷：
        1.没有缺陷，就是这种继承方式没有组合继承使用起来更方便，一般组合继承是我们常使用的。
 */

// inheritPrototype函数，就是寄生组合式继承的基本模型
function inheritPrototype(SubType, SuperType) {
    let prototype = Object.create(SuperType.prototype); // 创建对象
    prototype.constructor = SubType;// 增强对象
    SubType.prototype = prototype;// 指定对象
}

function SuperType(name) {
    this.name = name;
    this.colors = ['red'];
}
SuperType.prototype.sayName = function(){
    console.log(this.name);
}

function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}
inheritPrototype(SubType, SuperType);

SuperType.prototype.sayAge = function() {
    console.log(this.age);
}

