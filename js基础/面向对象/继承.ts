class Father {
    static staticFatherName = 'FatherName';// 静态属性，属于类的
    static staticGetFatherName = function () {// 静态方法，属于类的
        console.log(Father.staticFatherName);
    }
    constructor(public name) {
        this.name = name;// 私有属性，属于实例的
    }
    getName() {// 放在类的原型上的
        console.log(this.name);
    }
}

class Child extends Father {
    static staticChildName = 'ChildName';// 静态属性，属于类的
    static staticGetChildName = function () {// 静态方法，属于类的
        console.log(Child.staticChildName);
    }
    constructor(public name, public age) {
        super(name);
        this.age = age;// 私有属性，属于实例的
    }
    getAge() {// 放在类的原型上的
        console.log(this.age);
    }
}

let child_ = new Child('zf', 10);
child_.getName();// zf 既可以继承父类上定义的实例私有属性，也可以继承父类原型上的方法
child_.getAge();// 10

Child.staticGetChildName();// ChildName 也可以继承父类上的静态属性和静态方法
Child.staticGetFatherName();// FatherName 也可以继承父类上的静态属性和静态方法

// 继承：既可以继承父类上定义的实例私有属性，也可以继承父类原型上的方法，也可以继承父类上的静态属性和静态方法
