// 利用时间戳 这个会立即执行一次
function throttle (fn, wait) {
    let previous = 0;
    return function () {
        const context = this;
        const args = arguments;
        const now = +new Date();
        if (now - previous > wait) {
            fn.apply(context, args);
            previous = now;
        }
    }
}

// 利用定时器 时间到了才会执行一次
function throttle1 (fn, wait) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        if (!timeout) {
            timeout = setTimeout(()=>{
                timeout = null
                fn.apply(context, args);
            }, wait);
        }
    }
}

function throttle2 (fn, wait) {
    let flag = true;
    return function () {
        const context = this;
        const args = arguments;
        if (!flag) return;
        flag = false;
        setTimeout(()=>{
            fn.apply(context, args);
            flag = true;
        }, wait)
    }
}