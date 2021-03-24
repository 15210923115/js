// 不存在变量提升
'use strict';
function func(){// 行1
    console.log(i);// 行2
    let i;// 行3
};
func(); // Uncaught ReferenceError: Cannot access 'i' before initialization

// 从行1开始，到行3之前，不能提前访问变量a，称之为暂时性死区，如果提前访问会报错Uncaught ReferenceError: Cannot access 'a' before initializations
