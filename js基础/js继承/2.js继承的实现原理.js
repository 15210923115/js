// js的继承只要依靠原型链来实现的

//从构造函数实例化说起，当你调用new时候，js实际上执行的是：
function _new(F, ...args) {
    let obj = {};
    F.__proto__ = F.prototype;
    F.call(obj, ...args);
    return obj;
}
// 当你执行obj.getName时：
// 先检查obj是否有getName属性。如果没有，它会查找Object.getPrototype(obj).getName，
// 如果仍旧没有的话，继续查找Object.getPrototypeOf(Object.getPrototypeOf(obj)).getName

// 实现一个继承：B继承A（组合继承）
function A(name){
    this.name = name;
}
A.prototype.getName = function () {return this.name};

function B(name, age) {
    A.call(this, name);
    this.age = age;
}

B.prototype = Object.create(A.prototype);
B.prototype.constructor = B;

var b = new B('yyang', 30);
console.log(b.name);
console.log(b.age);

