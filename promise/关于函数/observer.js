// 观察者模式 被观察者模式

// 将所有的观察者都放到被观察者中（基于发布订阅的）

class Subject { // 被观察者
    constructor(name) {
        this.name = name;
        this.observers = [];
        this.state = "玩呢";
    }
    attach(o) {// 被观察者中要存放的观察者
        this.observers.push(o);
    }
    setState(newState) {
        this.state = newState;
        this.observers.forEach(o => o.update(this));
    }
}

class Observer {// 观察者
    constructor(name) {
        this.name = name;
    }
    update(baby) {
        console.log(baby.name+"跟"+this.name+"说："+baby.state);
    }
}

let baby = new Subject("小宝宝");
let o1 = new Observer("爸爸");
let o2 = new Observer("妈妈");

baby.attach(o1);
baby.attach(o2);
baby.setState("有人打我");
baby.setState("我饿了");

// 发布订阅，是发布和订阅之间没有关系（需要主动触发emit）
// 但是观察者模式，是订阅和发布之间有关系（我把订阅的人都放到自身里去，等会我变的时候，会主动去通知，触发函数，而没有emit的过程，emit过程相当于主动触发的），只要状态一变，就去通知所有人执行

// vue的组件通信，用的是发布订阅模式$on和$emit
// vue的依赖收集用的是观察者模式

// 观察者模式里借助了发布订阅模式

