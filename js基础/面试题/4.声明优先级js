// 优先级：函数声明>arguments>var变量声明

function sum(a,b) {
    function a() {
        console.log(3);
    }
    var a = function () {
        console.log(4);
    }
    a();// 4
    console.log(a);// f () {console.log(4);}
}

sum(1,2);

function sum2(a,b) {
    function a() {
        console.log(3);
    }
    
    a();// 3
    console.log(a);// f () {console.log(3);}
}

sum2(1,2);

function sum3(a,b) {
    
    console.log(a);// 1
    var a = function () {
        console.log(3);
    }
}

sum3(1,2);