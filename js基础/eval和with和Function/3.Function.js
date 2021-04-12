/**
    MDN参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function

    Function：
        每个 JavaScript 函数实际上都是一个 Function 对象。运行 (function(){}).constructor === Function // true 
        便可以得到这个结论。
    
    1.构造函数：
        Function 构造函数创建一个新的 Function 对象。直接调用此构造函数可用动态创建函数，但会遇到和 eval 类似
        的安全问题和(相对较小的)性能问题。然而，与 eval 不同的是，Function 创建的函数只能在全局作用域中运行。

    2.语法：
        new Function ([arg1[, arg2[, ...argN]],] functionBody)
    
    3.参数：
        * arg1, arg2, ... argN：
            被函数使用的参数的名称必须是合法命名的。参数名称是一个有效的JavaScript标识符的字符串，或者一个用逗号分隔的
            有效字符串的列表;例如“×”，“theValue”，或“a,b”。
            
        * functionBody：
            一个含有包括函数定义的 JavaScript 语句的字符串。
    4.描述：
        * 使用 Function 构造器生成的 Function 对象是在函数创建时解析的。这比你使用函数声明或者函数表达式并在你的代码中调用
        更为低效，因为使用后者创建的函数是跟其他代码一起解析的。

        * 所有被传递到构造函数中的参数，都将被视为将被创建的函数的参数，并且是相同的标示符名称和传递顺序。

        * 以调用函数的方式调用 Function 的构造函数（而不是使用 new 关键字) 跟以构造函数来调用是一样的。


    5.属性和方法：
        全局的 Function 对象没有自己的属性和方法，但是，因为它本身也是一个函数，所以它也会通过原型链从自己的原型链
        Function.prototype 上继承一些属性和方法。

    6.实例：
        Function 实例从 Function.prototype 继承了一些属性和方法。 同其他构造函数一样，你可以改变构造函数的原型
        从而使得所有的 Function 实例的属性和方法发生改变。

    7.示例1：传入参数调用 Function 构造函数

        下面的代码会创建一个需要两个参数的 Function 对象。
        ```
            const adder = new Function("a", "b", "return a + b");// 创建了一个能返回两个参数和的函数
            adder(2, 6);// 调用函数，返回值为8
        ```
        
        参数 "a" 和 "b" 是参数的名字，在函数体中被使用，"return a + b"。

    8.示例2：Function 构造器与函数声明之间的不同
        
        由 Function 构造器创建的函数不会创建当前环境的闭包，它们总是被创建于全局环境，因此在运行时它们只能
        访问全局变量和自己的局部变量，不能访问它们被 Function 构造器创建时所在的作用域的变量。这一点与使用 
        eval 执行创建函数的代码不同。

        ```
            var x = 10;

            function createFunction1() {
                var x = 20;
                return new Function('return x;'); // 这里的 x 指向最上面全局作用域内的 x
            }

            function createFunction2() {
                var x = 20;
                function f() {
                    return x; // 这里的 x 指向上方本地作用域内的 x
                }
                return f;
            }

            var f1 = createFunction1();
            console.log(f1());          // 10
            var f2 = createFunction2();
            console.log(f2());          // 20
        ```
        
        虽然这段代码可以在浏览器中正常运行，但在 Node.js 中 f1() 会产生一个“找不到变量 x ”的 ReferenceError。
        这是因为在 Node 中顶级作用域不是全局作用域，而 x 其实是在当前模块的作用域之中。
 */

var x = 10;

function createFunction1() {
    var x = 20;
    return new Function('return x;'); // 这里的 x 指向最上面全局作用域内的 x
}

function createFunction2() {
    var x = 20;
    function f() {
        return x; // 这里的 x 指向上方本地作用域内的 x
    }
    return f;
}

var f1 = createFunction1();
// console.log(f1());// 在浏览器环境中输出10，在node环境中报错：ReferenceError: x is not defined
var f2 = createFunction2();
console.log(f2());// 20