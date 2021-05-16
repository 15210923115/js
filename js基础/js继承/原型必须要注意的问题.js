
// 包含引用类型值的原型属性会被所有的实例共享，如果有一个实例修改了引用类型的值，那么其它的实例也会跟着受影响。
function School() {
    this.list = [];
}
School.prototype.arr = [];
School.prototype.attr = 'attr';

let s1 = new School();
let s2 = new School();
let s3 = new School();
s1.arr.push(1);
s2.arr.push(2);
s3.arr.push(3);

s1.list.push("a");
s2.list.push("b");
s3.list.push("c");

s1.attr = 'A';

console.log(s1.arr, s2.arr, s3.arr);// [ 1, 2, 3 ] [ 1, 2, 3 ] [ 1, 2, 3 ]
console.log(s1.list, s2.list, s3.list);// [ 'a' ] [ 'b' ] [ 'c' ]
console.log(s1.attr, s2.attr, s3.attr);// A attr attr
console.log(s1.hasOwnProperty("attr"), s2.hasOwnProperty("attr"), s3.hasOwnProperty("attr"));// true false false

/**
    1.如果不是引用类型的话，就没关系，因为不是引用类型的话，那么修改它的值，不会引起其它实例里的原型上的属性发生改变，原因如下：
    
    原因：虽然可以通过对象实例访问保存在原型链中的值，但却不能通过对象实例重写原型中的值。如果我们在实例中添加了一个属性，
    而该属性与实例原型中的一个属性同名，那我们就在实例自身上创建该属性，该属性将会屏蔽原型中的那个同名属性。

    2.如果构造函数里的私有属性是引用类型的话，也没有这个问题，因为私有属性不会被共享，只有原型上的属性会被共享。
    比如例子中的私有属性list，就不会被实例共享，就不会出现实例修改引用类型值的问题。

    从上面的两个分析，可以看出，问题出现在原型对象上，因为原型对象上的属性和方法是所有实例共享的，所以如果在prototype上设置了一个
    共享的引用类型值，比如School.prototype.arr = [];，如果实例s1向这个数组里push了一个内容，那么这个内容也会在s2.arr属性值里出现。
 */


