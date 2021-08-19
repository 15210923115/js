var name = 'oop'

var Person = function (options) {
    this.name = options.name
}

Person.prototype.name = 'Person1'
Person.prototype.getName = function () {
    return this.name
}
Person.getName = function () {
    // 这里的this指Person这个函数，每个函数都有一个name属性，表示函数的名称，所以这里的this.name就是"Person"，指函数的名称。
    return this.name;
}

var p = new Person({ name: 'inke' })

console.log(p.constructor === Person) // true
console.log(p instanceof Person) // true
console.log(p.__proto__ === Person.prototype) // true

console.log(p.hasOwnProperty('name')) // true
console.log(p.hasOwnProperty('getName')) // false

var getName = p.getName // 函数是个对象，对象赋值，是引用地址的赋值，因此执行getName()的时候，它里面的this指window，因为this是在调用的时候才能被确定的。

console.log(getName === Person.getName) // false
console.log(getName()) // "oop"  getName函数它里面的this指window，因为this是在调用的时候才能被确定的。

console.log(Person.prototype.getName()) // "Person1"
console.log(p.getName()) // "inke"
console.log(Person.getName()) // "Person" 返回的是函数的名称

// node环境下打印：
// true
// true
// true
// true
// false
// false
// undefined **
// Person
// inke
// Person

// 浏览器打印：
// true
// true
// true
// true
// false
// false
// oop **
// Person1
// inke
// Person


function a() {}
console.log(a.name);