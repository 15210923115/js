/**
 * 问题：call 和 apply 的区别是什么，哪个性能更好一些？
 * 
 * 他们都可以让函数执行，并且改变函数里的this指向
 * 
 * call：第一个参数是为函数内部指定this指向，后续的参数则是函数执行时所需要的参数，一个一个传递。
 * apply：第一个参数与call相同，为函数内部this指向，而函数的参数，则以数组的形式传递，作为apply第二参数。
 * 
 * call 的性能更好：
 * V8的内部，apply就是语法糖，内部调用的还是call，因为call的参数是一个个传入的，不用展开，
 * 而apply的参数是一个数组，内部还需要展开，因此apply在这个地方要比call的性能低一些。
 */

/**
 * 问题：自己实现call、apply、bind
 */

function getContext(context) {
    return Object(context || window);
}

Function.prototype._call = function (context, ...args) {
    context = getContext(context);
    let symbol = Symbol('call');
    context[symbol] = this;
    let ret = context[symbol](...args);
    delete context[symbol];
    return ret;
}

Function.prototype._apply = function (context, args) {
    context = getContext(context);
    let symbol = Symbol('apply');
    context[symbol] = this;
    let ret = context[symbol](...args);
    delete context[symbol];
    return ret;
}

Function.prototype._bind = function (context, ...args) {
    return (...args2) => {
        return this._call(context, ...args, ...args2);
    };
}

var obj = {
    a: 1,
    b: 2
};

function sum(c, d) {
    return this.a + this.b + c + d;
}

let r1 = sum._call(obj, 3, 4);
console.log(r1, 'r1');

let r2 = sum._apply(obj, [3, 4]);
console.log(r2, 'r2');

let r3 = sum._bind(obj, 3);
console.log(r3(4), 'r3');

console.log('hello');

/**
 * 问题：解答下面的结果
    function fn1() {
        console.log(1);
    }
    function fn2() {
        console.log(2);
    }
    fn1.call.call(fn2);
 */

function fn1() {
    console.log(1);
}
function fn2() {
    console.log(2);
}
fn1.call(fn2);// 1
fn1.call.call(fn2);// 2
fn1.call.call.call(fn2);// 2

/** 
 * call源码：
    Function.prototype._call = function (context, ...args) {
        context = getContext(context);// context = fn2
        let xxx = Symbol('call');
        context[xxx] = this;// this = call -> fn2[xxx] = call -> fn2 = {xxx: call}
        let ret = context[xxx](...args);// 让fn2[xxx](...args)执行，就是让fn2.call()执行
        delete context[xxx];
        return ret;
    }
*/

// 结合call的源码分析：
// fn1.call.call(fn2) -> Function.prototype.call.call(fn2) -> call.call(fn2)
// call.call(fn2) -> 
// context = fn2，this = call -> 
// fn2.xxx = AAAAFFFF（函数call的内存地址），这个就是在fn2上调用call方法 -> 
// 相当于fn2.call() -> 
// 参数是undefined，则默认为window，于是有fn2.call(window) ->
// context = window，this = fn2，window.xxx = BBBBCCCC（fn2函数的内存地址）->
// 相当于在window下，执行fn2方法 window.fn2() -> 
// 打印2

// 

/**
 * 网上参考答案：https://blog.csdn.net/ahiai/article/details/105145285
 * 
 *  分析过程，可以参考模拟call的代码来分析这道试题：

- `fn1.call(fn2)` 这个比较简单，实际上就是给fn2对象上添加fn1函数，然后执行fn1();

 

- 来看 `fn1.call.call(fn2)`。

分析：结合模拟call的代码来分析，调用了两次call，运算法则，左侧fn1.call 实际上还是call函数。

    先让最后一个call执行

        this => fn1.call => 实际上还是call函数

        context => fn2

      context.$fn = AAAAFFFF(call的内存地址);

      fn2.$fn = AAAAFFF; fn2.$fn(); => fn2.call();

      让call再执行

        此时call中的 this => fn2, context => undefined, 因为是undefined 在这个环境中相当于调用 fn2.call(window)，实际上就是调用window.fn2();

 

另一种分析思路：

1）首先分成两部分，第一部分是右边的`call(fn2)`，第二部分是左边的`fn1.call`；

2）`fn1.call`实际上就是函数原型上的call，即 Function.prototype.call, 放在一起理解就是在fn2对象上调用call，即 fn2.call();

3) `fn2.call()`; 这里没有传参数，那么默认就是全局Global对象，web网页情况下就是`window`对象。假设是web环境，就相当于`fn2.call(window);`

4) `fn2.call(window);`就容易理解了，实际上是在调用 `window.fn2()`。

 */

// fn1.call.call.call(fn2)和fn1.call.call(fn2)是一样的结果，总结一下，就是管前面有多少个call，最终都会归结为Function.prototype.call.call(fn2)