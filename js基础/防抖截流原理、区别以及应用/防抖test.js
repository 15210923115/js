function debounce(func, wait) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            func.apply(context, args);
        },wait);
    }
}

function _debounce(func, wait) {
    let timeout;
    return function(){
        clearTimeout(timer);
        timeout = setTimeout(()=>{
            func.call(this, arguments);
        });
    }
}

function debounce1(func, wait, immediate) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            var callNow = !timeout;// 只有当timeout不存在的时候，才让func立即执行
            timeout = setTimeout(()=>{
                timeout = null;// wait秒之后，让timeout为null，使wait之后再次点击操作，还可以立即执行func函数
            }, wait);
            if (callNow) func.apply(context, args);
        } else {
            timeout = setTimeout(()=>{
                func.apply(context, args);
            }, wait);
        }
    }
}

function debounce2(func, wait, immediate) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(()=>{
                timeout = null;
            }, wait);
            if (callNow) result = func.apply(context, args);// 只有立即执行的才能返回值
        } else {
            timeout = setTimeout(()=>{
                func.apply(context, args);// 异步执行的，无法返回值，如果想要有返回值的话，应该使用callback形式
            }, wait);
        }
        return result;// 只有立即执行的才能返回值
    }
}