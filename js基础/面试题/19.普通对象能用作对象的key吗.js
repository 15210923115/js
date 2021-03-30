/**
 * 问题：普通对象能用作对象的key吗？
 * 
 * 解答：不能
 * 解析：假如将一个普通对象obj1用作对象obj的key时候，会将obj1强制toString之后的结果"[object Object]"当做key，来给obj当做属性的键。
 * 
 * 如果想要将一个普通对象obj1用作对象obj的key的时候，可以使用Map数据结构来创建一个对象，可翻阅阮一峰的es6教程里关于Map和Set的讲解。
 * 
 */

let o1 = {name: 'yyang'};
let o2 = {name: 'shandong'};

let obj = {};

obj[o1] = 1;// obj[o1.toString()] = 1; -> obj["[object Object]"] = 1;
obj[o2] = 2;// obj[o2.toString()] = 1; -> obj["[object Object]"] = 2;

console.log(obj[o1]);// 2
console.log(obj[o2]);// 2

