/**
    防抖

    原理：
        在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
    适用场景：
        按钮提交场景：防止多次提交按钮，只执行最后提交的一次
        搜索框连续场景：防止连续发送请求，只发送最后一次输入
 */

//简易版实现
function debounce(func,wait){
    let timeout;
    return function(){
        const context=this;
        const args=arguments;
        clearTimeout(timeout);// 如果多次点击，这几次点击产生的定时器对象都赋值给了同一个timeout对象，所以，clear的是上一次点击操作产生的setTimeout定时器
        timeout = setTimeout(() => {
            func.apply(context,args);
        }, wait);
    }
}
//立即执行版实现：有时候希望立刻执行函数，然后等到停止触发n秒后，才可以重新执行。
function debounce1(func,wait,immediate){
    let timeout;
    return function(){
        const context=this;
        const args=arguments;
        if(timeout) clearTimeout(timeout);
        if(immediate){
            const callNow=!timeout;
            timeout=setTimeout(() => {
                timeout=null;
            }, wait);
            if(callNow) func.apply(context,args);
        }else{
            timeout=setTimeout(() => {
                func.apply(context,args);
            }, wait);
        }
    }
}

//返回值版实现
//func函数可能会有返回值，所以需要返回函数结果，但是当immediate为false的时候，因为使用了setTimeout，我们将func.apply(context,args)的返回值赋给变量，最后在return的时候，值将会一直是undefined，所以只在immediate为true的时候返回函数的执行结果
function debounce2(func,wait,immediate){
    let timeout,result;
    return function(){
        const context=this;
        const args=arguments;
        if(timeout) clearTimeout(timeout);
        if(immediate){
            const callNow=!timeout;
            timeout=setTimeout(() => {
                timeout=null;
            }, wait)
            if (callNow) result=func.apply(context,args);
        }else{
            timeout=setTimeout(() => {
                func.apply(context,args);   
            }, wait);
        }
        return result;
    }
}