/**
  1. 两个操作数如果是number则直接相加出结果
  2. 如果其中有一个操作数为string，则将另一个操作数隐式的转换为string，然后进行字符串拼接得出结果
  3. 如果操作数为对象或者是数组这种复杂的数据类型，那么就将两个操作数都转换为字符串，进行拼接
  4. 如果操作数是像boolean这种的简单数据类型，那么就将操作数转换为number相加得出结果
  5. [ ] + { } 因为[]会被强制转换为"", 然后+运算符 链接一个{ }, { }强制转换为字符串就是"[object Object]"
  6. 如果是{}开头的表达式，{}会被当作一个代码块，+[]是强制将[]转换为number，转换的过程是 +[] => +"" =>0 最终的结果就是0

  在控制台直接输入下面的内容，回车：
  []+{}  // "[object Object]"
  {}+[]  // 0
  {}+0   // 0
  []+0   // "0"
 */

// 1. 两个操作数如果是number则直接相加出结果

// 2. 如果其中有一个操作数为string，则将另一个操作数隐式的转换为string，然后进行字符串拼接得出结果
// ""+[] -> ""+[].toString() -> ""
// ""+{}

// 数组toString
// [].toString() -> ""
// [1,2,3].toString -> "1,2,3"

// 4. 如果操作数是像boolean这种的简单数据类型，那么就将操作数转换为number相加得出结果
// true+true -> 2
// true+false -> 1
// true-false -> 1
// false-true -> -1
// true*false -> 0
// true/false -> Infinity
// false/true -> 0

// 5. [ ] + { } 因为[]会被强制转换为""， 然后+运算符 链接一个{ }, { }强制转换为字符串就是"[object Object]"
// []+{} -> [].toString() + {}.toString() -> "" + "[object Object]" -> "[object Object]"

// 6. 如果是{}开头的表达式，{}会被当作一个代码块，即{}+xxx最后都是+xxx；那么{}+[]，就是+[]，+[]是强制将[]转换为number，转换的过程是 +[] => +"" =>0 最终的结果就是0
// {} + [] -> + [] -> + [].toString() -> + "" -> Number("") -> 0
// {console.log(1)} + [] -> 控制台会将{xxx}里的东西当做代码块去执行，然后就变成了 +[] -> 0

// {}+0 -> 0

// []+0 -> "0"