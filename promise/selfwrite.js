function resolvePromise(promise2, x, resolve, reject) {
    // 
    
}

class Promise {
    constructor(executor) {
        this.value = null;
        this.status = "PENDING";
        this.onFulfilledStashStack = [];
        this.onRejectedStashStack = [];
        this.promise2ResolveFun = null;
        this.promise2RejectFun = null;

        let _this = this;

        let resolve = function(value){
            if (_this.status === "PENDING") {
                _this.value = value;
                _this.status = "RESOLVED";
                _this.onFulfilledStashStack.forEach(fn => {
                    let x = fn(value);
                    // _this.promise2ResolveFun(x);
                    _this.promise2ResolveFun(x);
                });
            }
        }
        
        let reject = function(reason){
            if (_this.status === "PENDING") {
                _this.value = reason;
                _this.status = "REJECTED";
                _this.onRejectedStashStack.forEach(fn => {
                    let x = fn(reason)
                    // _this.promise2RejectFun(x);
                    _this.promise2RejectFun(x);
                });
            }
        }

        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
        
        // console.log(_this);
    }
    then(onFulfilled, onRejected) {
        let _this = this;
        let promise2 = new Promise((resolve, reject) => {

            if (this.status === 'RESOLVED') {
                let x = onFulfilled(this.value);
                resolve(x);
            }
    
            if (this.status === 'REJECTED') {
                let x = onRejected(this.value);
                reject(x);
            }

            if (this.status === 'PENDING') {
                this.promise2ResolveFun = resolve;
                this.onFulfilledStashStack.push(onFulfilled);

                this.promise2RejectFun = reject;
                this.onRejectedStashStack.push(onRejected);
            }
            
        });

        return promise2;
    }
}

Promise.resolve = function(){

}

Promise.reject = function(){

}

Promise.all = function(){

}

Promise.race = function(){

}

module.exports = Promise;
