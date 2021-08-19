// call/apply/bind可以改变函数中this的指向
// 第一个参数是改变this指向(非严格模式下，传递null/undefined指向也是window)
// call参数是依次传递，apply是以数组的方式传递

// call 调用方法
// apply 调用方法
// bind 绑定方法

function getName(age, home) {
    console.log(this.name, age, home);
}
let obj = {name: 'yangyang'};

// getName.call(obj, '30', '山东');
// getName.apply(obj, ['30', '山东']);
// let gn = getName.bind(obj, '30');
// gn('山东');

/**
    原理就是：
    obj.getName = getName;
    obj.getName();
    delete obj.getName;
 */

!(function(prototype){
    function getDefaultContext(context) {
        context = context || window;
        let type = typeof context;
        // if (['number', 'string', 'boolean'].includes(type)) {
        //     context = new context.constructor(context);// 如果是基本数据类型，包装成对象类型
        // }
        context = Object(context);
        return context;
    }

    function _call(context, ...args) {
        context = getDefaultContext(context);
        let symbol = Symbol('fn');
        context[symbol] = this;
        let result = context[symbol](...args);
        delete context[symbol];
        return result;
    }

    function _apply(context, args) {
        context = getDefaultContext(context);
        let symbol = Symbol('fn');
        context[symbol] = this;
        let result = context[symbol](...args);
        delete context[symbol];
        return result;
    }

    function _bind(context, ...bindArgs) {
        // this就是getName
        return (...args) => this.call(context, ...bindArgs, ...args);// this就是getName
    }
    prototype._call = _call;
    prototype._apply = _apply;
    prototype._bind = _bind;
})(Function.prototype);

getName._call(obj, '30', '山东');// yangyang 30 山东
getName._apply(obj, ['30', '山东']);// Yyang 30 山东
let gn = getName._bind(obj, '30');
gn('山东');// Yyang 30 山东