
let obj = {a:1,b:2};
let arr = [1,'c','d'];
let str = 'stri';

console.log('for in Object: 遍历出的i是每一个key');
for (let i in obj) {
    console.log(i);
}
console.log('\n');

// for (let i of obj) { // 对象使用for of 循环会报错
//     console.log(i);
// }

console.log('for in Array: 遍历出的i是每一个数组元素的下标');
for (let i in arr) {
    console.log(i);
}
console.log('\n');

console.log('for of Array: 遍历出的i是每一个数组元素');
for (let i of arr) {
    console.log(i);
}
console.log('\n');

console.log('for in String: 遍历出的i是每个字符的下标');
for (let i in str) {
    console.log(i);
}
console.log('\n');

console.log('for of String: 遍历出的i是每一个字符');
for (let i of str) {
    console.log(i);
}


/*
    for of 循环：
    ES6 借鉴 C++、Java、C# 和 Python 语言，引入了for...of循环，作为遍历所有数据结构的统一的方法。

    一个数据结构只要部署了Symbol.iterator属性，就被视为具有 iterator 接口，就可以用for...of循环遍历它的成员。
    也就是说，for...of循环内部调用的是数据结构的Symbol.iterator方法。

    for...of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、
    后文的 Generator 对象，以及字符串。
*/

/*
    for in 循环：
    可用于Object、Array、String，其他的是否可用，有待测试
*/