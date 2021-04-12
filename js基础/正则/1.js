
let a1 = 'acd';
let a2 = 'abcd';
let a3 = 'abbcd';
let reg1 = /^a[b]*cd$/ig;
let reg2 = /^a[b]*cd$/ig;
let reg3 = /^a[b]*cd$/ig;
console.log(reg1.test(a1), reg2.test(a2), reg3.test(a3));// true true true
// *号匹配0次、1次、多次

let a1 = 'acd';
let a2 = 'abcd';
let a3 = 'abbcd';
let reg1 = /^a[b]+cd$/ig;
let reg2 = /^a[b]+cd$/ig;
let reg3 = /^a[b]+cd$/ig;
console.log(reg1.test(a1), reg2.test(a2), reg3.test(a3));// false true true
// +号匹配1次、多次

let a1 = 'acd';
let a2 = 'abcd';
let a3 = 'abbcd';
let reg1 = /^a[b]?cd$/ig;
let reg2 = /^a[b]?cd$/ig;
let reg3 = /^a[b]?cd$/ig;
console.log(reg1.test(a1), reg2.test(a2), reg3.test(a3));// true true false
// ?号匹配0次、1次
