// 订阅 发布 模式
const fs = require('fs');
let eventObj = {
    arr: [], // 中介存放订阅的事件
    on(fn) {// 订阅
        this.arr.push(fn);
    },
    emit() {// 发布
        this.arr.forEach(fn => fn());
    }
};

let obj = {};

fs.readFile('age.txt', 'utf8', function(err, data) {
    obj.age = data;
    eventObj.emit();// 触发方法
});

fs.readFile('name.txt', 'utf8', function(err, data) {
    obj.name = data;
    eventObj.emit();// 触发方法
})

eventObj.on(() => {// 注册方法 
    if (Object.keys(obj).length == 2) {
        console.log("数据读取回来了，", obj);
    }
});