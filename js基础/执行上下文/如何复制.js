// 基本数据类型的赋值 和引用类型的赋值不一样

// 1.基本数据类型复制的是值本身
var a = 1;
var b = a;
b = 2;
console.log(a);

var ExecuteContext = {
    VO: { a: 1 }
};

ExecuteContext.VO.b = ExecuteContext.VO.a;
ExecuteContext.VO.b = 2;
console.log(ExecuteContext.VO.a);

// 2.引用数据类型复制的是引用地址指针
var m = { a: 1, b: 2 };
var n = m;
n.a = 10;
console.log(m.a);

var ExecuteContext = {
    VO: { m: { a: 1, b: 2 } }
};

ExecuteContext.VO.b = ExecuteContext.VO.a;
ExecuteContext.VO.a = 10;
console.log(ExecuteContext.VO.a);