/**
 * Object.prototype.toString 方法返回一个表示该对象的字符串。
 * 
 * Object.prototype.valueOf 方法返回指定对象的原始值。
 * 
 * 总结：这两个方法都是Object的原型上的方法，因此想要使用这两个方法，必须得是对象才行，但是为什么一个字符串可以直接调用toString方法呢？
 * 
 * 实际上，每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型对象，从而让我们能够调用一些方法来操作这些数据。
 * 
 * 例如：
 * 
 * var s1 = 'some text';
 * var s2 = s1.substring(2);
 * 
 * 相当于：
 * var s1 = new String('some text');
 * var s2 = s1.substring(2);
 * s1 = null;
 * 
 * 具体的内容可以查看mdn和JS高程：
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf#%E8%A6%86%E7%9B%96%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AF%B9%E8%B1%A1%E7%9A%84_valueof%E6%96%B9%E6%B3%95
 */

/**
 * 一、toString
 * 
 * 方法：obj.toString()
 * 返回值：一个表示该对象的字符串。
 * 描述：
 * 1.每个对象都有一个 toString() 方法，当该对象被表示为一个文本值时，或者一个对象以预期的字符串方式引用时自动调用。默认情况下，toString() 方法被每个 Object 对象继承。如果此方法在自定义对象中未被覆盖，toString() 返回 "[object type]"，其中 type 是对象的类型。以下代码说明了这一点：
 * var o = new Object();
 * o.toString(); // returns [object Object]
 * 
 * 2.使用 toString() 检测对象类型。
 * 
 * 可以通过 toString() 来获取每个对象的类型。为了每个对象都能通过 Object.prototype.toString() 来检测，
 * 需要以 Function.prototype.call() 或者 Function.prototype.apply() 的形式来调用，传递要检查的对象作为第一个参数，称为 thisArg。
 * 
 * 
 */

// 1. 每个对象都有一个 toString() 方法，当该对象被表示为一个文本值时，或者一个对象以预期的字符串方式引用时自动调用。
let n = new String('nature');
console.log(n);// [String: 'nature']
console.log(typeof n);// 'object'
let str = 'chinese ' + n;// 这段代码的底层原理是：'chinese' + n -> 'chinese ' + n.toString() -> 'chinese ' + 'nature' -> 'chinese nature' 
console.log(str);// chinese nature

let num = new Number(66);
console.log(num);// [String: 66]
console.log(typeof num);// 'object'
let str = 'chinese ' + num;// 这段代码的底层原理是：'chinese ' + n -> 'chinese ' + n.toString() -> 'chinese ' + '66' -> 'chinese 66'
console.log(str);// chinese 66

// 以上就是toString方法在+号操作符里的运用1：如果其中有一个操作数为string，则将另一个操作数隐式的转换为string，然后进行字符串拼接得出结果。

let ret = []+{};// 这段代码的底层原理是：[].toString() + {}.toString() -> "" + "[object Object]" -> "[object Object]"
console.log(ret);// '[object Object]'

// 以上就是toString方法在+号操作符里的运用2：如果操作数为对象或者是数组这种复杂的数据类型，那么就将两个操作数都转换为字符串，进行拼接

/**
 * 总结+号操作符的运算规则：
 * 
  1. 两个操作数如果是number则直接相加出结果
  2. 如果其中有一个操作数为string，则将另一个操作数隐式的转换为string，然后进行字符串拼接得出结果
  3. 如果操作数为对象或者是数组这种复杂的数据类型，那么就将两个操作数都转换为字符串，进行拼接
  4. 如果操作数是像boolean这种的简单数据类型，那么就将操作数转换为number相加得出结果
  5. [ ] + { } 因为[]会被强制转换为"", 然后+运算符 链接一个{ }, { }强制转换为字符串就是"[object Object]"
  6. 如果是{}开头的表达式，{}会被当作一个代码块，+[]是强制将[]转换为number，转换的过程是 +[] => +"" =>0 最终的结果就是0

  在控制台直接输入下面的内容，回车：
  []+{}  // "[object Object]"
  {}+[]  // 0
  {}+0   // 0
  []+0   // "0"
 */

// 2. 使用 toString() 检测对象类型。
var toString = Object.prototype.toString;

console.log(toString.call(new Date)); // [object Date]
console.log(toString.call(new String)); // [object String]
console.log(toString.call(Math)); // [object Math]

//Since JavaScript 1.8.5
console.log(toString.call(undefined)); // [object Undefined]
console.log(toString.call(null)); // [object Null]



/**
 * 二、valueOf
 * 
 * 方法：obj.valueOf()
 * 返回值：为该对象的原始值。
 * 描述：
 * 1. JavaScript调用valueOf方法将对象转换为原始值。你很少需要自己调用valueOf方法；当遇到要预期的原始值的对象时，JavaScript会自动调用它。
 * 2. 默认情况下，valueOf方法由Object后面的每个对象继承。 每个内置的核心对象都会覆盖此方法以返回适当的值。如果对象没有原始值，则valueOf将返回对象本身。
 * 3. JavaScript的许多内置对象都重写了该函数，以实现更适合自身的功能需要。因此，不同类型对象的valueOf()方法的返回值和返回值类型均可能不同。
 * 4. 你可以在自己的代码中使用valueOf将内置对象转换为原始值。 创建自定义对象时，可以覆盖Object.prototype.valueOf()来调用自定义方法，而不是默认Object方法。
 * 
 */

/**
 * 不同类型对象的valueOf()方法的返回值
 * 
 * 对象      |     返回值
 * --------------------------------------
 * Array    |     返回数组对象本身
 * Boolean  |     布尔值
 * Date     |     存储的时间是从 1970 年 1 月 1 日午夜开始计的毫秒数 UTC
 * Function |     函数本身
 * Number   |     数字值
 * Object   |     对象本身。这是默认情况。
 * String   |     字符串值
 * 
 * Math和Error对象没有valueOf方法。
 */

// 1. JavaScript调用valueOf方法将对象转换为原始值。你很少需要自己调用valueOf方法；当遇到要预期的原始值的对象时，JavaScript会自动调用它。
let obj = new String('我是一个字符串');
console.log(obj);// [String: '我是一个字符串']
console.log(typeof obj); // "object"
let s = obj + 'yyang';// 这段代码的底层机制是：obj + 'yyang' -> obj.valueOf() + 'yyang' -> '我是一个字符串' + 'yyang' -> '我是一个字符串yyang'
console.log(s);// '我是一个字符串yyang'

// 也就是说在使用每个内置对象时，JS底层都会调用对象的valueOf方法，将其原始值获取出来，然后替代该对象，进行计算。

let sym = Symbol('a');
console.log(Symbol.prototype.valueOf.call(sym));// 获取symbol的原始值
console.log(typeof Symbol.prototype.valueOf.call(sym));
console.log(Symbol.prototype.valueOf.call(sym) === Symbol.prototype.valueOf.call(sym));// true
console.log(Object(Symbol.prototype.valueOf.call(sym)));