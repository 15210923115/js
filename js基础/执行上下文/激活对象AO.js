// 激活对象
// 1.在函数的调用栈中，如果当前执行上下文处于函数调用栈的顶端，则意味着当前上下文处于激活状态，此时变量对象称为”活动对象“(AO,Activation Object) VO=>AO
// 2.”活动对象“包含变量对象所有的属性，并有包含this指针

function one(m) {
    function two() {
        console.log('two');
    }
    two();
}
one(1);

// global
let globalVO = {one: '()=>{}'};
let globalEC = {VO: globalVO, this: window, scopeChain: [globalVO]};

let ECStack = [];
ECStack.push(globalEC);

// one
let oneVO = {two: '()=>{}'};
let oneEC = {VO: oneVO, this: window, scopeChain: [oneVO, globalVO]};

ECStack.push(oneEC);
// 当one函数开始执行的时候，因为oneEC处于执行栈的顶端，这个时候，oneVO就会成为AO，并且给oneVO添加this指针 oneVO.this = window
// AO（Activation Object） oneVO.this = window

let twoVO = {};
let twoEC = {VO: twoVO, this: window, scopeChain: [[twoVO, oneVO, globalVO]]};
ECStack.push(twoEC);
// 此时VO => AO oneVO.this = window

ECStack.pop();// twoEC
ECStack.pop();// oneEC
ECStack.pop();// globalEC

// 函数执行上下文栈，执行到哪个阶段（执行上下文），AO就是当前正在执行的那个执行上下文的VO对象，并且给添加this指针

/**
    全局上下文的变量对象 ：
    
    1. 在浏览器里，全局对象为window
    2. 全局上下文的变量对象为window,而且这个变量对象不能激活变成活动对象
    3. 只在窗口打开，全局上下文会一直存在，所有的上下文都可以直接访问全局上下文变量对象上的属性
    4. 只有全局上下文的变量对象允许通过VO的属性名称来间接访问，在函数上下文中是不能直接访问VO对象的
    5. 未进入执行阶段前，变量对象中的属性都不能访问！但是进入到执行阶段之后，变量对象转变成了活动对象，里面的属性都能被访问了,对于函数上下文来讲，活动对象与变量对象其实都是同一个对象,只是处于执行上下文的不同生命周期
 */