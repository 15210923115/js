// Object.create的原理：创建一个空的构造函数，让这个构造函数的原型指向参数指向的那个原型。
// Object.create(proto)

function _create(prototype) {
    function F() {};
    F.prototype = prototype;// 这个只实现了prototype的继承，没有实现类上静态方法、静态属性和类的实例的私有属性的继承
    return new F();
}

function B() {
    this.name = 'yy';
}

B.prototype.getName = function(){console.log('B Class')};

function A() {};

A.prototype = Object.create(B.prototype);// A继承B的原型

A.prototype.getName();// 'B Class'

A.prototype.getName = function(){console.log('A Class');}

A.prototype.getName();// 'A Class' 修改A的getName

B.prototype.getName();// 'B Class' 并没有影响B的getName

/** 
 * A.prototype = Object.create(B.prototype)之后，A继承了B的原型，且修改A的prototype，不会影响B的prototype。
 * 因为Object.create里返回了一个空的Obj的实例，且有Obj.prototype = B.prototype，然后返回了obj = new Obj()，
 * 于是A.prototype = new Obj()，而new Obj的实例obj有obj.__proto__ === B.prototype，
 * 且A.prototype = obj，因此有A.prototype.__proto__ === B.prototype，因此实现了A继承B，
 * 且修改A的原型属性，并不会影响B上的原型属性。这就是既可以切断原型链互不污染，又可以实现原型继承。
 * 
 */

// 这个只实现了prototype的继承，没有实现类上静态方法、静态属性和类的实例的私有属性的继承。
// 在./面向对象/继承原理.js里的，有完整的继承源码。可以参考。

// 使用Object.create实现类式继承
// Shape - 父类(superclass)
function Shape() {
    this.x = 0;
    this.y = 0;
}
  
// 父类的方法
Shape.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    console.info('Shape moved.');
};

// Rectangle - 子类(subclass)
function Rectangle() {
    Shape.call(this); // call super constructor. 调用父类构造函数，继承父类构造函数上的私有属性到自己的私有属性上
}
  
// 子类续承父类
Rectangle.prototype = Object.create(Shape.prototype);// 将自己的原型对象指向一个构造函数F的实例，该构造函数F的prototype为Shape.prototype，并切断Rectangle.prototype和Shape.prototype的直接联系（让Rectangle.prototype = f，而Rectangle.prototype.__proto__ === f.__proto__，相当于Rectangle.prototype.__proto__ === F.prototype，相当于Rectangle.prototype.__proto__ === Shape.prototype，因此Rectangle类成功继承了Shape类原型上的方法，而且通过Rectangle.prototype.xx的方式修改某个原型，并不会影响到Shape.prototype上的方法）
Rectangle.prototype.constructor = Rectangle;// 注意：需要重新将constructor指向自己的构造函数，切记住！
  
var rect = new Rectangle();

console.log('Is rect an instance of Rectangle?', rect instanceof Rectangle); // true
console.log('Is rect an instance of Shape?',rect instanceof Shape); // true
rect.move(1, 1); // Outputs, 'Shape moved.'



