/**
    MDN参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/with
    
    with语句作用：
        扩展一个语句的作用域链（将某个对象添加到作用域链的顶部）。

    1.语法：
        with (expression) {
            statement
        }

    2.参数：
        expression：将给定的表达式添加到在评估语句时使用的作用域链上。表达式周围的括号是必需的。
        statement：任何语句。要执行多个语句，请使用一个块语句 ({ ... })对这些语句进行分组。

    3.描述：
        JavaScript查找某个未使用命名空间的变量时，会通过作用域链来查找，作用域链是跟执行代码的context
        或者包含这个变量的函数有关。'with'语句将某个对象添加到作用域链的顶部，如果在statement中有某个
        未使用命名空间的变量，跟作用域链中的某个属性同名，则这个变量将指向这个属性值。如果沒有同名的属性，
        则将拋出ReferenceError异常。

    4.备注：
        不推荐使用with，在 ECMAScript 5 严格模式中该标签已被禁止。推荐的替代方案是声明一个临时变量来
        承载你所需要的属性。

    5.性能方面的利与弊：
        利：
            with语句可以在不造成性能损失的情況下，减少变量的长度。其造成的附加计算量很少。使用'with'可以
            减少不必要的指针路径解析运算。需要注意的是，很多情況下，也可以不使用with语句，而是使用一个临时
            变量来保存指针，来达到同样的效果。

        弊：
            with语句使得程序在查找变量值时，都是先在指定的对象中查找。所以那些本来不是这个对象的属性的变量，
            查找起来将会很慢。如果是在对性能要求较高的场合，'with'下面的statement语句中的变量，只应该包含
            这个指定对象的属性。

    6.语义不明的弊端：
        弊端1：
            with语句使得代码不易阅读，同时使得JavaScript编译器难以在作用域链上查找某个变量，难以决定应该在
            哪个对象上来取值。请看下面的例子：
            function f(x, o) {
                with (o) {
                    print(x);
                }
            }
            f被调用时，x有可能能取到值，也可能是undefined，如果能取到, 有可能是在o上取的值，也可能是函数的第
            一个参数x的值（如果o中没有这个属性的话）。如果你忘记在作为第二个参数的对象o中定义x这个属性，程序并
            不会报错，只是取到另一个值而已。
        弊端2：
            使用with语句的代码，无法向前兼容，特別是在使用一些原生数据类型的时候。看下面的例子：
            function f(foo, values) {
                with (foo) {
                    console.log(values)
                }
            }
            如果是在ECMAScript 5环境调用f([1,2,3], obj)，则with语句中变量values将指向函数的第二个参数values。
            但是，ECMAScript 6标准给Array.prototype添加了一个新属性values，所有数组实例将继承这个属性。所以在
            ECMAScript 6环境中，with语句中变量values将指向[1,2,3].values。
 */

// 使用例子1：
let vm = {arr: 1};
with(vm){
    console.log(this);
    console.log(arr);// 1
}

// 使用例子2：
let fun = new Function('with(this){console.log(arr);}');
fun.call(vm);// 1

// 使用例子3：下面的with语句指定Math对象作为默认对象。with语句里面的变量，分別指向Math对象的PI 、cos和sin函数，不用在前面添加命名空间。后续所有引用都指向Math对象。

var a, x, y;
var r = 10;

with (Math) {
  a = PI * r * r;
  x = r * cos(PI);
  y = r * sin(PI / 2);
}

// 使用例子4：
with(vm){
    var arr = 2;
    console.log(arr);// 2
}

// 总结：JavaScript查找某个未使用命名空间的变量时，会通过作用域链来查找，作用域链是跟执行代码的context或者包含这个变量的函数有关。'with'语句将某个对象添加到作用域链的顶部，如果在statement中有某个未使用命名空间的变量，跟作用域链中的某个属性同名，则这个变量将指向这个属性值。如果沒有同名的属性，则将拋出ReferenceError异常。