// Object.create的原理：创建一个空对象，让这个对象的原型指向参数指向的那个原型。

Object.create = function (prototype) {
    function F(){}
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
 * A.prototype = Object.create(B.prototype)之后，A继承了B，且修改A的prototype，不会影响B的prototype。
 * 因为Object.create里返回了一个空的Obj的实例，且有Obj.prototype = B.prototype，然后返回了obj = new Obj()，
 * 于是A.prototype = new Obj()，而new Obj的实例obj有obj.__proto__ === B.prototype，
 * 且A.prototype = obj，因此有A.prototype.__proto__ === B.prototype，因此实现了A继承B，
 * 且修改A的原型属性，并不会影响B上的原型属性。这就是既可以切断原型链互不污染，又可以实现继承。
 * 
 */

// 这个只实现了prototype的继承，没有实现类上静态方法、静态属性和类的实例的私有属性的继承。
// 在./面向对象/继承原理.js里的，有完整的继承源码。可以参考。