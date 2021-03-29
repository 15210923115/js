/**
 * 函数柯里化就是把接受多个参数的函数变换成接受一个单一参数的函数，并且返回接受余下参数返回结果的技术
 */

// bind实现方式一：这个是MDN给出的polyfill的写法，该方法不支持使用new调用bind后的函数，但是可以直接调用。
// (function(prototype){
//     function _bind(context, ...outerArgs) {
//         let _this = this;
//         return function (...innerArgs) {
//             return _this.call(context, ...outerArgs, ...innerArgs);
//         };
//     }
//     prototype._bind = _bind;
// })(Function.prototype);

// bind实现方式二：自己手动实现官方bind的原理，使用bind绑定后的函数，既可以new也可以直接调用。
(function(prototype){
    // Object.create的原理：创建一个空对象，让这个对象的原型指向参数指向的那个原型。
    // A.prototype = Object.create(B.prototype)之后，A继承了B，且修改A的prototype，不会影响B的prototype。因为Object.create里返回了一个空的Obj，且有Obj.prototype = B.prototype，然后返回了obj = new Obj()，于是A.prototype = new Obj()，而new Obj的实例obj有obj.__proto__ === B.prototype，且A.prototype = obj，因此有A.prototype.__proto__ === B.prototype，因此实现了A继承B，且修改A的原型属性，并不会影响B上的原型属性。这就是既可以切断原型链互不污染，又可以实现继承。
    Object.create = function (prototype) {
        function F(){}
        F.prototype = prototype;
        return new F();
    }
    function _bind(context, ...outerArgs) {
        let thatFunc = this;
        let fBound = function (...innerArgs) {
            // 如何在这里判断这个函数是被new来调用的，还是直接调用的？要看this

            return thatFunc.apply(
                // 如果你是在new这个绑定后的函数的话，则绑定的时候，传的context就没有意义了
                this instanceof thatFunc ? this : context, [...outerArgs, ...innerArgs]
                // 判断bind后的函数的调用方式：
                // 如果：是使用new调用的，那么this instanceof thatFunc肯定为true，则绑定的this为调用fBound自己；
                // 否则：是直接调用的，那么绑定的this就是一开始传递进来的context对象。
            );
            
        }
        fBound.prototype = Object.create(thatFunc.prototype);// 行1 将fBound的原型指向bind的调用主体的原型对象上去
        // fBound.prototype = thatFunc.prototype; // 行1处的代码在一定程度上可以替换成这行代码，也能实现将fBound的原型指向bind的调用主体的原型对象上去，但是这会污染thatFunc的原型，所以Object.create可避免污染，也能实现实现将fBound的原型指向bind的调用主体的原型对象上去，因为Object.create是创建了一个空对象。（不会污染父类的原型对象）
        return fBound;
    }
    prototype._bind = _bind;
})(Function.prototype);

// function sum(...args) {
//     return this.prefix + (args.reduce((previous, current)=> previous + current, 0));
// }
// let obj = {prefix: '$'};
// let bindSUM = sum.bind(obj, 1, 2, 3);
// console.log(bindSUM(4, 5));// $15

function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.toString = function(){
    return this.x+","+this.y;
}

let emptyObj = {};

// 使用官方的bind，打印下面的结果：
let YPoint = Point.bind(null, 1);// 官方在实现bind时，这个地方已经实现了继承：YPoint2继承了Point
let axiosPoint = new YPoint(2);
console.log(axiosPoint.toString());// '1,2'
console.log(axiosPoint instanceof Point);// true 说明官方在这里实现了继承，那么我们自己实现的时候，也要将这个实现了，也就是行1的代码。
console.log(axiosPoint instanceof YPoint);// true

// 自己实现的bind，打印下面的结果：
let YPoint2 = Point._bind(null, 1);// 这个地方已经实现了继承：YPoint2继承了Point
YPoint2.prototype.getName = function(){console.log('yyang');}// 修改YPoint2的原型，并不会影响父类Point的原型对象，原理是行1那行代码，使用了Object.create。（A.prototype = Object.create(B.prototype)，之后A继承了B，且修改A的prototype，不会修改B的prototype，因为Object.create里返回了一个空的Obj，Obj.prototype = B.prototype，然后返回了new Obj()，于是A.prototype = new Obj()，而new Obj的实例obj有obj.__proto__ === B.prototype，且A.prototype = obj，因此有A.prototype.__proto__ === B.prototype，因此实现了A继承B，且修改A的原型属性，并不会影响B上的原型属性）。
let axiosPoint2 = new YPoint2(2);
console.log(axiosPoint2.toString());// [object Object]
console.log(axiosPoint2 instanceof Point);// 如果使用bind实现方式一，则打印false，说明没有发生继承；如果使用bind实现方式二，则打印true，说明成功实现了继承，也就是可以使用new调用bind绑定后的函数。
console.log(axiosPoint2 instanceof YPoint2);// true

