// 基本的promise实现

// 宏
const PENDING = 'PENDING'; // 等待态
const FULFILLED = 'FULFILLED';// 成功态
const REJECTED = 'REJECTED';// 失败态

class Promise {
    constructor(executor) {
        this.status = PENDING; // 默认是等待态
        this.value = undefined;
        this.reason = undefined;
        // 只有状态是等待态的时候，才可以更新状态
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
            }
        };
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
            }
        };
        // executor 执行的时候，需要传入两个参数，给用户来改变状态的
        try {
            executor(resolve, reject);
        } catch (err) {// 表示当前有异常，那就使用这个异常作为promise失败的原因
            reject(err);
        }
    }
    then(onFulfilled, onRejected) {
        if (this.status === FULFILLED) {
            onFulfilled(this.value);
        } 
        if (this.status === REJECTED) {
            onRejected(this.reason);
        }
    }
}

module.exports = Promise;