let obja = {
    name: 'obja'
};

let arra = ['a', 'b'];

/**
 * 参考链接：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
 * 
 * toString() 方法返回一个表示该对象的字符串。
 * 
 * 每个对象都有一个 toString() 方法，当该对象被表示为一个文本值时，或者一个对象以预期
 * 的字符串方式引用时自动调用。默认情况下，toString() 方法被每个 Object 对象继承。如
 * 果此方法在自定义对象中未被覆盖，toString() 返回 "[object type]"，其中 type 是对象的类
 * 型。以下代码说明了这一点：
 * var o = new Object();
 * o.toString(); // returns [object Object]
 * 
 */

console.log(obja.toString());// [object Object]
console.log(typeof obja.toString());// string

console.log(arra.toString());// a,b
console.log(typeof arra.toString(), '\n');// string 


/**
 * 参考链接：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf
 * 
 * valueOf() 方法返回指定对象的原始值。
 * 
 * JavaScript调用valueOf方法将对象转换为原始值。你很少需要自己调用valueOf方法；当遇到要预期的原始值的对象时，JavaScript会自动调用它。
 * 
 * 默认情况下，valueOf方法由Object后面的每个对象继承。 每个内置的核心对象都会覆盖此方法以返回适当的值。如果对象没有原始值，则valueOf将返回对象本身。
 * 
 * JavaScript的许多内置对象都重写了该函数，以实现更适合自身的功能需要。因此，不同类型对象的valueOf()方法的返回值和返回值类型均可能不同。
 * 
 * 
    不同类型对象的valueOf()方法的返回值
    ----------------------------------------------------------
    对象	     |   返回值
    ----------------------------------------------------------
    Array	    |   返回数组对象本身。
    ----------------------------------------------------------
    Boolean	    |   布尔值。
    ----------------------------------------------------------
    Date	    |   存储的时间是从 1970 年 1 月 1 日午夜开始计的毫秒数 UTC。
    ----------------------------------------------------------
    Function    |	函数本身。
    ----------------------------------------------------------
    Number	    |   数字值。
    ----------------------------------------------------------
    Object	    |   对象本身。这是默认情况。
    ----------------------------------------------------------
    String	    |   字符串值。
    ----------------------------------------------------------
                |   Math 和 Error 对象没有 valueOf 方法。
 * 
 */

console.log(obja.valueOf());// { name: 'obja' }
console.log(typeof obja.valueOf());// object

console.log(arra.valueOf());// [ 'a', 'b' ]
console.log(typeof arra.valueOf());// object

/**
 * Array.prototype.values()
 * values() 方法返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值
 * 
 */

const array1 = ['a', 'b', 'c'];
const iterator = array1.values();

console.log(iterator);// Array Iterator {}

console.log(typeof iterator);// object

for (const value of iterator) {
  console.log(value);
}

// expected output: "a"
// expected output: "b"
// expected output: "c"