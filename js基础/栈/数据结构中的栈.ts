// 概念：栈是一组数据的存放方式，特点是先进后出，后进先出

// 操作：push添加新元素到栈顶(入栈)；pop移除栈顶的元素，同时返回被移除的元素(出栈)

class Stack {
    private items: number[] = [];
    push(element) {
        this.items.push(element);
    }
    pop() {
        return this.items.pop();
    }
}

let stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);

stack.pop();// 3
stack.pop();// 2
stack.pop();// 1

