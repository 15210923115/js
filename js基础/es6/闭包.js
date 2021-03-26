function one() {
    var a = 1;
    var name1 = 'one';
    function two() {
        var b = 2;
        var name2 = 'two';
        function three() {
            var c = 3;
            var name3 = 'three';
            // return操作分析了变量依赖，发现是个函数，于是分析变量的引用，将用到的外部变量进行打包。
            return () => {
                var d = 4;
                console.log(a, b, c, d);
            }// JS有个机制，我把你用到的变量打个包给你，没用到的变量就不管了。
            // 最终用到的变量是a,b,c，变量name1,name2,nam3没用到，则把a,b,c打包。
            // 在threeEC出栈的时候，把a、b、c打包存放起来，等fn要执行的时候，在fnEC编译阶段，将打包的值赋值给fnEC.closures。如果要销毁打包的内容，需要将fn指向的函数销毁，即fn=null即可，fn不再引用函数，函数被销毁了，那么函数也不再引用打包的内容了，于是a、b、c就被销毁了（垃圾回收）。

            // 本来函数one、two和three执行完之后要销毁的，但是发现有函数用到它们里面的变量了，用到的那些变量又不能销毁，于是将用到的那些变量打个包带走。函数和变量该销毁的销毁，不影响别人使用你里面的变量。
            // 函数只有执行完后才会销毁
        }
        return three();
    }
    return two();
}
var fn = one();
fn();
fn();
fn();

let globalEC = {
    this: globalThis,
    outer: null,
    VE: {
        one: () => {},
        fn: undefined
    }
};

// globalEC.VE.fn = globalEC.VE.one();

let oneEC = {
    outer: globalEC,
    VE: { a: 1, two: () => {}}
};

let twoEC = {
    outer: oneEC,
    VE: { b: 2, two: () => {}}
};

let threeEC = {
    outer: twoEC,
    VE: { c: 3}
};

// 这里会产生一个打包的内容，模拟闭包
var closures = [{c: 3}, {b: 2}, {a: 1}];// 这个打包的内容会跟fn指向的那个函数关联起来，等fn执行的时候，会作为闭包的内容传递到fnEC.closures。如果fn被置为null，就会发现fn原来指向的那个函数没有人再引用了，于是函数会被垃圾回收，和函数关联的那个打包内容（closures闭包）也会被垃圾回收。

// threeEC出栈 c和name3被销毁
// twoEC出栈 b和name2被销毁
// oneEC出栈 a和name1被销毁

let fnEC = {
    outer: globalEC,
    VE: {d: 4},
    closures,// 闭包，在threeEC出栈的时候，发现return的那个函数引用了外部的变量a、b和c，于是将a、b和c打包。
};

console.log(getValue('a', fnEC), getValue('b', fnEC), getValue('c', fnEC));

function getValue(name, ec) {
    if (name in ec.VE) {
        return ec.VE[name];
    }

    for (let i = ec.closures.length - 1; i >= 0; i--) {
        if (name in ec.closures[i]) {
            return ec.closures[i][name];
        }
    }

    if (ec.outer) {
        return getValue(name, ec.outer);
    }

    return null;
}

// 为什么说闭包会造成内存泄露？
// 因为fn是在全局上的，即在globalEC.VE上的，因为globalEC永远都不会被销毁，因此fn会一直存在，fn就是个指针。
// fn里又有打包的a、b、c变量，始终保持着引用，a、b、c永远不能被回收，永远占用着内存，因此会造成内存的泄露。
// 况且fn执行完一次之后，产生的执行上下文会被销毁，但是fn不会被销毁，因为fn是在全局上的，JS不知道你什么时候还会再次使用fn，
// 因此不会被销毁。fn引用的那个函数，那个函数里又引用了外部的a、b、c，因此a、b、c不会被销毁，使用存在着引用，
// 但是d会被销毁，因为下次再调用fn函数的时候，还会重新编译fnEC执行上下文，重新声明d。（函数内声明的变量属于临时变量，函数执行完，内部的资源就会被销毁，闭包是特殊情况，闭包里引用的变量无法被销毁，除非引用闭包里变量的那个变量被置为null）

// 全局执行上下文永远在栈底，永远不会被销毁。这就是为什么少用全局变量的原因，会造成内存泄露。

// 那么如何销毁全局执行上下文的fn呢？直接fn=null就可以，因为fn等于null，就说明了fn之前引用的那个函数就不再被引用了，那么垃圾回收就会把它回收了，那么变量a、b、c也就不再被引用了，也就随之销毁了。

// 可以看到fn函数被执行了两次，那么每次执行完，都会把每次执行前，编译产生的执行上下文给销毁，等下次再执行fn的时候，又会重新编译产生一个新的执行上下文。
// 每个函数执行的时候都会产生一个执行上下文，执行上下文里有this、VE、LE，甚至还有closures，当该执行上下文执行完毕后，要出栈，里面的this、VE、LE，甚至还有closures都会被销毁。
