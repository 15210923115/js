/**
    1. 以原型链的方式 
    这种方式存在的缺点是，在包含有引用类型的数据时，会被所有的实例对象所共享，容易造成修改的混乱。还有就是在创建子类型的时候不能向超类型传递参数。

    2. 使用借用构造函数的方式 
    这种方式是通过在子类的构造函数中调用父类的构造函数来实现的，这一种方法解决了不能向父类型传递参数的缺点，但是它存在的一个问题就是无法实现函数方法的复用，并且父类型原型定义的方法子类型也没有办法访问到。
    
    3. 组合继承 
    组合继承是将原型链和借用构造函数组合起来使用的一种方式。通过借用构造函数的方式来实现类型的属性的继承，通过将子类型的原型设置为父类型的实例来实现方法的继承。这种方式解决了上面的两种模式单独使用时的问题，但是由于我们是以父类型的实例来作为子类型的原型，所以调用了两次父类的构造函数，造成子类型的原型中多了很多不必要的属性。

    4. 原型式继承 
    原型式继承的主要思路就是基于已有的对象来创建新的对象，实现的原理是：向函数中传入一个对象，然后返回一个以这个对象为原型的对象。这种继承的思路主要不是为了实现创造一种新的类型，只是对某个对象实现一种简单继承，ES5 中定义的Object.create() 方法就是原型式继承的实现。缺点与原型链方式相同。

    5. 寄生式继承 
    寄生式继承的思路是创建一个用于封装继承过程的函数，通过传入一个对象，然后复制一个对象的副本，然后对象进行扩展，最后返回这个对象。这个扩展的过程就可以理解是一种继承。这种继承的优点就是对一个简单对象实现继承，缺点是没有办法实现函数的复用。

    6. 寄生式组合继承 
    组合继承的缺点就是使用父类型的实例做为子类型的原型，导致添加了不必要的原型属性。寄生式组合继承的方式是使用父类型的原型的副本来作为子类型的原型，这样就避免了创建不必要的属性。
 */

function Person(name){
    this.name = name;
    this.sum = function(){
        console.log(this.name);
    }
}
Person.prototype.age = 10;

// 1.原型链继承
function Per() {
    this.name = "ker";
}

Per.prototype = new Person(); // 原型链继承的要点

var per1 = new Per();
console.log("原型链继承：");
console.log(per1.age);// 10
console.log(per1 instanceof Person);// true

