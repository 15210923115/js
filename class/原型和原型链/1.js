// 原型 prototype
// 原型链 __proto__

// 每个函数，都有一个prototype属性
// 每个对象 都有__proto__属性

function Animal() {
    this.type = '哺乳类';// 实例身上的属性
}

Animal.prototype.type = '哺乳';

// console.log(Animal.prototype);// Animal {}

let animal = new Animal();// 我们创建的这个实例，肯定是一个对象类型

// console.log(animal.__proto__ === Animal.prototype);// true  __proto__指向当前类的原型prototype

console.log(animal.type);// 哺乳类

console.log(Animal.prototype.constructor === Animal);// true

console.log(Object.prototype.__proto__);// null 最顶层的对象

// 特殊的 Function Object (他们两个，可以充当对象，也可以充当函数)
// __proto__ prototype

console.log(Function.__proto__ === Function.prototype);// true（在内部强制指定了Function.__proto__指向Function.prototype）

console.log(Object.__proto__ === Function.prototype);// true 对象Object也可以看成一个函数

console.log(Object.__proto__ === Function.__proto__);// true等价

console.log(Object.__proto__ === Object.prototype);// false

function School() {
    this.a = 1;
}

School.prototype.b= 2;

// 如何判断某个属性属不属于原型上的属性呢？

let school = new School();

console.log(school.hasOwnProperty('a'));// true hasOwnProperty不会去找原型，而是去找实例上的属性

console.log('a' in school);// true in 关键字 会判断这个属性是否属于原型 或者 实例上的属性