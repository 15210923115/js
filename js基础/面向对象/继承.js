var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Father = /** @class */ (function () {
    function Father(name) {
        this.name = name;
        this.name = name; // 私有属性，属于实例的
    }
    Father.prototype.getName = function () {
        console.log(this.name);
    };
    Father.staticFatherName = 'FatherName'; // 静态属性，属于类的
    Father.staticGetFatherName = function () {
        console.log(Father.staticFatherName);
    };
    return Father;
}());
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child(name, age) {
        var _this = _super.call(this, name) || this;
        _this.name = name;
        _this.age = age;
        _this.age = age; // 私有属性，属于实例的
        return _this;
    }
    Child.prototype.getAge = function () {
        console.log(this.age);
    };
    Child.staticChildName = 'ChildName'; // 静态属性，属于类的
    Child.staticGetChildName = function () {
        console.log(Child.staticChildName);
    };
    return Child;
}(Father));
var child_ = new Child('zf', 10);
child_.getName(); // zf 既可以继承父类上定义的实例私有属性，也可以继承父类原型上的方法
child_.getAge(); // 10
Child.staticGetChildName(); // ChildName 也可以继承父类上的静态属性和静态方法
Child.staticGetFatherName(); // FatherName 也可以继承父类上的静态属性和静态方法
// 继承：既可以继承父类上定义的实例私有属性，也可以继承父类原型上的方法，也可以继承父类上的静态属性和静态方法
