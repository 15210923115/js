/**
    顾名思义：一个对象上想拥有被继承对象的方法和属性，就继承过来就好。

    在oop中，通过类的继承来实现代码的复用，通过实例化一个类可以创建许多对象，在js中继承是通过原型来实现的。
 */
// function Use(name){
//     this.name = name;
//     this.getName = function(){
//         console.log(this.name)
//     }
// };
// let use1 = new Use('yy1');
// let use2 = new Use('yy2');
// console.log(use1.name, use2.name);
// console.log(use1.getName(), use2.getName());

/**
    在上述代码中，我们通过构造函数Use，创建两个对象。实际上是通过复制构造函数Use的原型对象来创建use1和use2。
    原型对象中有个constructor指向了Use函数，实际上还是通过这个构造函数来创建对象。

    假如不用原型(更准确地说原型对象中没有用户定义地属性)，那么这两个对象就无法共享任何属性，对于这个例子来说，
    getName的逻辑都是一样的。不需要两份getName，所有的use对象其实可以共享这个getName方法。这个逻辑非常像
    java类中的静态函数，只不过静态函数只能够调用静态变量和静态方法。在js中，可以通过getName定义在原型中，
    以达到所有对象共享这个函数

 */
function User(name){
    this.name = name;
};
User.prototype.getName = function(){
    return this.name;
}
User.prototype.color = new String('block');
User.prototype.age = 10;

let user1 = new User(new String('sunny'));
let user2 = new User(new String('sunny'));
console.log(user1.name == user2.name);// true ===会进行类型转换
console.log(user1.name === user2.name);// false ===不进行类型转换
console.log(user1.getName === user2.getName);// true
console.log(user1.color === user2.color);// true

console.log(user1.age === user2.age);// true
user1.age = 19;// 如果对象的属性被修改，原型的对象中相同的属性并不会修改
console.log("12:", user1.hasOwnProperty("age"), user2.age);// true 10

/**
    这里一目了然，在原型对象中定义的变量和方法能够被所有多个对象共享。原型的属性被对象共享，但是它不属于对象本身。
 */

console.log("10:",user1.hasOwnProperty('name'))//true
console.log("11:",user2.hasOwnProperty('getName'));//false 原型的属性被对象共享，但是它不属于对象本身
user1.getName = 'my';// 如果对象的属性被修改，原型的对象中相同的属性并不会修改
console.log("8:", user1.getName, user1.hasOwnProperty("getName"));// my true
console.log("9:", user2.getName, user2.getName());// [Function] [String: 'sunny']

/**
    这里需要注意的是：原型对象的属性不是实例对象自身的属性，是所有的实例共享的属性。只要修改原型对象，变化就会立刻体现在所有实例对象上。
    反之，如果对象的属性被修改，原型的对象中相同的属性并不会修改。
 */