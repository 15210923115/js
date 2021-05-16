function Person(name) {
    this.name = name;
}
Person.prototype.getName = function () {return this.name};
function _new(Foo, ...args) {
    let obj = {};// 构造一个空对象（是Object的实例）
    obj.__proto__ = Foo.prototype;// 让obj的隐式原型__proto__指向构造函数的原型对象prototype，关联构造函数的原型
    Foo.call(obj, ...args);// 以obj为this，调用构造函数，给实例对象obj赋值私有属性
    return obj;
}
let y1 = _new(Person, 'y1');
let y2 = _new(Person, 'y2');

console.log(y1.name, y2.name);// y1 y2
console.log(y1.getName(), y2.getName());// y1 y2
y1.getName = 'yy';// 这个不是取值，是设置值，取值的时候，是按照先查自己再查原型链的方式。但是设置值，是直接在自己身上设置的属性，就是私有属性，所以修改y1.getName属性，并不会修改y2.getName的属性。
console.log(y2.getName());// y2

y1.__proto__.getName = 'aa';
console.log(y2.getName());// TypeError: y2.getName is not a function 可以看到，通过修改__proto__修改原型上的属性，会影响到其它的实例属性
console.log(y2.getName);// aa

// 因此如果实例对象obj被创建以后，如果原型对象上的某个属性xx发生变化了，那么通过obj.xx取值，得到的值也会变化。因为属性查找方式是obj.__proto__.xx的方式，修改的是原型对象上的属性，而实例要使用原型对象上的属性，得通过原型链查找的方式使用。

// function _create(prototype) {
//     function F() {};
//     F.prototype = prototype;// 这个只实现了prototype的继承，没有实现类上静态方法、静态属性和类的实例的私有属性的继承
//     return new F();
// }