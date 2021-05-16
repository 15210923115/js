// 核心：寄生式继承就是把原型式继承再次封装，然后在对象上扩展新的方法，再把新对象返回
// 寄生式继承的思路是创建一个用于封装继承过程的函数，通过传入一个对象，然后复制一个对象的副本，然后对象进行扩展，
// 最后返回这个对象。这个扩展的过程就可以理解是一种继承。这种继承的优点就是对一个简单对象实现继承，缺点是没有办法实现函数的复用。

/**
    寄生式继承解决的问题：
        1.跟原型式继承一样
        2.可以在一个封装函数CreateObj里对content()返回的对象进行扩展
 */

/**
    寄生式继承的缺陷：
        1.跟原型式继承一样
        2.无法复用函数
 */

function content(obj){
    function F() {};
    F.prototype = o;
    return new F();
}

function CreateObj(obj){
    var CObj = content(obj);
    CObj.sayName = function(){
        return this.userName;
    }
    return CObj;
}
var obj = {
    userName: 'yy',
};
var obj2 = CreateObj(obj);
console.log(obj2.sayName()); // yy