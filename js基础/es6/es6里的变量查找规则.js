/**
 * 变量环境(variableEnvironment)和词法环境(Lexical Environment)
 * 
 * let和块级作用域到底是如何实现的
 */

function fn() {
    var a = 1;
    let b = 2;
    {// 第一个代码块
        let b = 3;
        var c = 4;// var和function声明的变量，无视块级作用域。如果此处的代码不是var c = 4;而是c = 4;的话，如果是window环境，变量查找的时候，会给window上声明一个全局变量c，并给c赋值4，这个的前提是c变量不是使用let声明的，也没有使用var，而是直接c = 4;的方式去进行变量查找，在es5里如果通过作用域链一层层往上找，如果没有找到声明变量c的地方，那么就会在window上声明c，这个在es6里也得以保留下来。
        let d = 5;
        let e = 6;
        console.log(a,b,c,d);// 1 3 4 5
    }
    {// 第二个代码块
        let b = 6;
        let d = 7;
        console.log(a,b,c,d);// 1 6 4 7
    }
}
fn();

/**
 * 一.全局下编译(global编译阶段)
 * 
 * 1.es5会创建一个VO（VariableObject -> ActivationObject），里面放var和function声明的变量。
 * 
 * 2.es6会创建VariableEnvironment(变量环境)和LexicalEnvironment(词法环境)。
 * 其中VariableEnvironment里面放var和function声明的变量；Lexical Environment里放let和const声明的变量。
 * 
 * 3.es的globalEC包含this、VO、scopeChain；
 * es6的globalEC包含this、VE、LE、outer。
 */

let globalEC = {
    this: globalThis, // 代表当前的this指针
    outer: null, // 外部的执行上下文环境，词法作用域就是静态作用域，就是指作用域是由代码中函数声明的位置来决定的。（相当于实现了以前es5中的scopeChain）
    variableEnvironment: { fn() {} },// 这里面存放的var和function声明的变量，其中变量提升还是存在的
    lexicalEnvironment: [] // 这里面存放let和const声明的变量
};

// global编译阶段完成后，就开始执行阶段，发现了fn函数，于是开始fn函数的编译阶段，然后再去执行fn

/**
 * 二、fn编译阶段
 * 
 * 静态作用域（语法作用域）：一个函数，它的作用域，是在创建的时候（编译阶段）决定的，而非执行的时候决定的。
 * 
 * outer：是指声明fn函数的时候，我这个fn函数是在哪里（哪个EC）声明的，那么这个outer就指谁，在这里的outer就是globalEC.variableEnvironment
 * 
 */

let fnEC = {
    this: globalThis,
    outer: globalEC,// 其实这里的outer更准确的值是globalEC，而不是globalEC.variableEnvironment，因为这里的globalEC.lexicalEnvironment是空的值，且globalEC.this也不会有c，且globalEC.outer是null，所以就直接写成globalEC.variableEnvironment了，要注意！
    variableEnvironment: { a: undefined, c: undefined },// var和function声明的变量，无视块级作用域，于是第一个代码块里声明的变量c就被提升到最上面了
    lexicalEnvironment: [{ b: undefined }]
};

/**
 * 三、fn执行
 * 
 * 当进入第一个代码块的时候
 * 
 * 每当函数执行的时候遇到了一个新的代码块，就会创建一个新出的词法环境LexicalEnvironment。
 * 
 * 函数执行才会创建一个新的执行上下文EC，代码块执行的时候，不会创建新的执行上下文。
 */
fnEC.variableEnvironment.a = 1;
fnEC.lexicalEnvironment[0].b = 2;
fnEC.lexicalEnvironment.push({
    b: undefined,
    d: undefined
})

/**
 * 四、执行第一个代码块
 * 
 * 变量c的查找过程如下（es6里变量查找规则）：
 * 1. 先找自己词法环境fnEC.LexicalEnvironment这个栈的链，如果找到了声明的变量c，就给其赋值4（这里没找到），
 * 2. 如果没找到，就去自己的变量环境fnEC.variableEnvironment里去找是否有变量c的声明，发现找到了，则给c赋值4。
 * 3. 如果在自己的变量环境fnEC.variableEnvironment里也没有找到变量c，那么就去fnEC.outer里去找变量c。
 * 4. fnEC.outer的值是globalEC，然后重复上面的操作，分别去找globalEC.LexicalEnvironment这个栈的链，如果找到了声明的变量c，就给其赋值4（这里没找到），
 * 5. 如果没找到，就去变量环境globalEC.variableEnvironment里去找是否有变量c的声明，发现找到了，则给c赋值4。
 * 6. 如果在变量环境globalEC.variableEnvironment里也没有找到变量c，那么就去globalEC.outer里去找变量c。
 * 7. 发现globalEC.outer是null，那么就到此结束了，根本找不到变量c，然后报个错说变量c没有声明（如果是window环境的话，会给window上声明一个全局变量c，并给c赋值4，这个的前提是c变量不是使用let声明的，也没有使用var，而是直接c = 4;的方式去进行变量查找，在es5里如果通过作用域一层层往上找，如果没有找到声明变量c的地方，那么就会在window上声明c，这个在es6里也得以保留下来）。
 */

fnEC.lexicalEnvironment[1].b = 3;
fnEC.variableEnvironment.c = 4;
fnEC.lexicalEnvironment[1].d = 5;

/**
 * 五、执行console.log(a , b, c, d)
 */

console.log(getValue('a', fnEC), getValue('b', fnEC), getValue('c', fnEC), getValue('d', fnEC));

function getValue(name, ec) {
    for (let i = ec.lexicalEnvironment.length - 1; i>=0; i--) {// LE里是栈结构，需要倒序查找（就近原则），从栈顶开始查找。
        if (name in ec.lexicalEnvironment[i]) {
            return ec.lexicalEnvironment[i][name]+"*";
        }
    }
    if (name in ec.variableEnvironment) {
        return ec.variableEnvironment[name]+"*";
    }
    if (ec.outer) {// 作用域也是嵌套的，所以要遍历父级的作用域，也就是从去当前EC的outer里去找
        return getValue(name, ec.outer)+"*";
    }
    return null;
}

/**
 * 六、第一个代码块执行完毕，需要出栈
 */
fnEC.lexicalEnvironment.pop();

/**
 * 七、编译第二个代码块
 */
fnEC.lexicalEnvironment.push({
    b: undefined,
    d: undefined
});

/**
 * 八、执行第二个代码块
 */
fnEC.lexicalEnvironment[1].b = 6;
fnEC.lexicalEnvironment[1].d = 7;

/**
 * 九、执行console.log(a, b, c, d)
 */
 console.log(getValue('a', fnEC), getValue('b', fnEC), getValue('c', fnEC), getValue('d', fnEC));

// es6里执行上下文之间的连接靠outer
// es5里执行上下文之间的连接靠scopeChain

var s = 1;// window.a = global.variableEnvironment.a = 1; var在全局作用域下赋值，相当于给widow上赋值
let x = 2;// global.lexicalEnvironment.b = 2，该操作并未在window上进行赋值，所以let声明的变量在window上拿不到
console.log(window.s);// 1
console.log(window.x);// undefined

/**
 * let 声明的变量为什么在window上访问不到？

    ES6的全局作用域下，VO和GO做了分离
    let f = 10;
    VO.f可以访问到
    但是GO.f访问不到了
 */

// let在try catch的代码块里的表现结果跟普通的代码块一样，没有区别
try {
    let abc = 2;
} catch (er) {
    console.log(abc);
}
console.log(abc, 'abc');// Uncaught ReferenceError: abc is not defined
