// 常规的进制转换
var num = 15;
console.log(num.toString()); // "15"
console.log(num.toString(2)); // "1111"
console.log(num.toString(8)); // "17"
console.log(num.toString(16)); // "f"

// 下面的也是进制转换
console.log(15..toString()) // "15"
console.log(15..toString(2)) // "1111"
console.log(15..toString(8)) // "17"
console.log(15..toString(16)) // "f"

// 下面的也是进制转换
console.log((15).toString()) // "15"
console.log((15).toString(2)) // "1111"
console.log((15).toString(8)) // "17"
console.log((15).toString(16)) // "f"

// console.log(15.toString()) // 没有这种写法，数字后面跟一个点，表示小数
// console.log(15.toString(2)) // 没有这种写法，数字后面跟一个点，表示小数
// console.log(15.toString(8)) // 没有这种写法，数字后面跟一个点，表示小数
// console.log(15.toString(16)) // 没有这种写法，数字后面跟一个点，表示小数

// length属性
console.log(15..toString().length) // 2
console.log(15..toString(2).length) // 4
console.log(15..toString(8).length) // 2
console.log(15..toString(16).length) // 1

// typeof
console.log(typeof 15..toString()) // string
console.log(typeof 15..toString(2)) // string
console.log(typeof 15..toString(8)) // string
console.log(typeof 15..toString(16)) // string
