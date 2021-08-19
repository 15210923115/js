// 继承的原理
function __extends(Child, Father) {
    // 1.继承父类上的静态属性和方法
    Child.__proto__ = Father;

    // 2.继承原型上的属性和方法
    function Temp() {// 拿一个干净的、空的函数来实现原型上方法的继承，不继承私有属性
        // constructor指向子类的构造函数
        // this.constructor = Child;// 行1（这个写法跟行2相同，行1、行2保留一个就可以了）
    }
    
    Temp.prototype = Father.prototype;
    Temp.prototype.constructor = Child;// 行2（这个写法跟行1相同，行1、行2保留一个就可以了） 目的是让Child的实例的constructor属性指向子类Child而不是父类Father
    Child.prototype = new Temp();

    /**
     * 1.会有两个私有属性
     * 2.为了避免在此继承私有属性
     * 3.会把Father上的私有属性都变成Child实例的公有属性，而且属性都是错的
     * 
     * Child.prototype = new Father();// 不能用此方法替代Temp的写法，否则会有上述3个问题
     * Child.prototype.constructor = Child;// 不能用此方法替代Temp的写法，否则会有上述3个问题
     */    
}

var Father = (function () {
    function Father(name) {
        this.name = name;
    }
    Father.prototype.getName = function() {
        console.log(this.name);
    }
    Father.staticFatherName = 'FatherName';
    Father.staticGetFatherName = function () {
        console.log(Father.staticFatherName);
    }
    return Father;
})();

var Child = (function (_super) {
    __extends(Child, _super);// 继承的是原型上的方法和父类的静态属性、方法
    function Child(name) {
        // this其实是指向子类的实例 new Object() {}子类的实例
        // 是在调用父类的构造函数，初始化父类的私有属性
        _super.call(this, name);// 继承的是私有属性
    }
    Child.prototype.getName = function() {
        console.log(this.name);
    }
    Child.staticChildName = 'ChildName';
    Child.staticGetChildName = function () {
        console.log(Child.staticChildName);
    }
    return Child;
})(Father);

let child = new Child('yy', 10);
console.log(child instanceof Child);
console.log(child.constructor);
console.log(child.constructor === Father);
console.log(child.constructor === Child);