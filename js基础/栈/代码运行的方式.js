// 代码运行的方式：调用栈

// 表示函数的一层层调用

function one() {
    function two() {
        function three() {
            console.log('three');
        }
        three();
    }
    two();
}
debugger;
one();

// 调用栈 Call Stack

