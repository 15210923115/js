// 例1
var name = "小王";
var age = 17;
var obj = {
    name: "小张",
    objAge: this.age,
    myFun: function () {
        console.log(this.name + " 年龄 " + this.age);
    }
};
var db = {
    name: "德玛",
    age: 99
};

obj.myFun.call(db);　　　　// 德玛 年龄 99
obj.myFun.apply(db);　　　 // 德玛 年龄 99
obj.myFun.bind(db)();　　　// 德玛 年龄 99

// 以上出了 bind 方法后面多了个 () 外 ，结果返回都一致！
// 由此得出结论，bind 返回的是一个新的函数，你必须调用它才会被执行。

// 例2
var name2 = "小王";
var age2 = 17;
var obj2 = {
    name: "小张",
    objAge: this.age,
    myFun: function (from, to) {
        console.log(this.name + " 年龄 " + this.age, " 来自 " + from + " 去往 " + to);
    }
};
var db2 = {
    name: "德玛",
    age: 99
};

obj2.myFun.call(db2,'成都','上海');　　　　 // 德玛 年龄 99  来自 成都 去往 上海
obj2.myFun.apply(db2,['成都','上海']);      // 德玛 年龄 99  来自 成都 去往 上海  
obj2.myFun.bind(db2,'成都','上海')();       // 德玛 年龄 99  来自 成都 去往 上海
obj2.myFun.bind(db2,['成都','上海'])();　　 // 德玛 年龄 99  来自 成都, 上海 去往 undefined

/**
微妙的差距！

从上面四个结果不难看出:

call 、bind 、 apply 这三个函数的第一个参数都是 this 的指向对象，第二个参数差别就来了：

call 的参数是直接放进去的，第二第三第 n 个参数全都用逗号分隔，直接放到后面 obj.myFun.call(db,'成都', ... ,'string' )。

apply 的所有参数都必须放在一个数组里面传进去 obj.myFun.apply(db,['成都', ..., 'string' ])。

bind 除了返回是函数以外，它的参数和 call 一样。

当然，三者的参数不限定是 string 类型，允许是各种类型，包括函数 、 object 等等！
 */