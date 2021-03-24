/**
 * 如何确定this？
 * 
 * 思考this为什么会出现？我们需要this干什么用？
 * 
 * this代表谁来调用，或者说当前执行这个逻辑的主体是谁
 * this是函数执行的时候确定的，表示谁调的这个函数，也就是当前的主体是谁
 * 
 * 函数只是一个处理逻辑
 */

let person = {
    name: '张三',
    getName: function() {
        console.log(this.name);
    }
};
person.getName();// 获取名字，谁获取名字啊，person获取名字，那么person就是执行主体，person干的这件事情
//（this怎么确定？谁干这件事情，那么this就是谁）

// 如何确定this？核心就一条，.前面的那个对象，也就是谁调用的

/**
 * 如何确定this，其实就是知道当前函数的执行主体是谁。
 * 
 * 1.用点调用：如果是用某个对象来调用函数，那this肯定是就是那个对象。
 * 
 * 2.直接调用：如果没有人来调用，没有执行主体，则直接执行。（自执行函数中的this一般都是window）
 * 
 * 3.绑定事件：给元素绑定事件的时候，绑定的方法中的this一般是元素本身
 * 
 * 4.call、apply、bind
 * 
 * 5.箭头函数：箭头函数没有自己的this（也没有prototype、也没有arguments、无法创建箭头函数的实例）
 * 
 * 6.构造函数：构造函数中的this是当前类的实例
 * 
 */

// 用点调用：如果是用某个对象来调用函数，那this肯定是就是那个对象。
let zhangsan = {
    name: '张三',
    getName: function() {
        console.log(this.name);
    }
};
zhangsan.getName();

// 直接调用：如果没有人来调用，没有执行主体，则直接执行
let getNameFun = zhangsan.getName;
getNameFun();// 如果是非严格模式 getNameFun的主体是window或者global；如果是严格模式，getNameFun的主体是undefined

// 绑定事件：给元素绑定事件的时候，绑定的方法中的this一般是元素本身
dom.addEventListener('click',function(){
    console.log(this);// this就是dom元素本身
});
/**
    模拟dom事件绑定：
    
    let dom = {
        addEventListener(type, callback) {
            dom['on'+type] = callback;
        },
        trigger() {
            dom.onclick();
        }
    };
    dom.addEventListener('click',function(){
        console.log(this);// this就是dom元素本身
    });
    dom.trigger();

 */

// 1.