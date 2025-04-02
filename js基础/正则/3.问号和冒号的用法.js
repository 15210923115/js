// ?:的用法，先对比下面四个例子的结果：

console.log( "I love JavaScript".match(/^I love (?:JavaScript|Regular Expression)$/) ); // 不捕获，在返回结果里不包含分组结果
// ['I love JavaScript', index: 0, input: 'I love JavaScript', groups: undefined]

console.log( "I love Regular Expression".match(/^I love (?:JavaScript|Regular Expression)$/) );// 不捕获，在返回结果里不包含分组结果
// ['I love Regular Expression', index: 0, input: 'I love Regular Expression', groups: undefined]

console.log( "I love JavaScript".match(/^I love (JavaScript|Regular Expression)$/) );// 捕获，在返回结果里包含分组结果
// ['I love JavaScript', 'JavaScript', index: 0, input: 'I love JavaScript', groups: undefined]

console.log( "I love Regular Expression".match(/^I love (JavaScript|Regular Expression)$/) );// 捕获，在返回结果里包含分组结果
// ['I love Regular Expression', 'Regular Expression', index: 0, input: 'I love Regular Expression', groups: undefined]

/**
 * 分析用法：

    ?:的用法出现在括号里，即：(?:xx)，代表非捕获型分组，即只匹配不捕获（执行正则匹配时还是会匹配，但是不在返回结果里返回了）

    括号的作用：
    ------------------------------------------------------------------------------------
    模式             |           说明
    ------------------------------------------------------------------------------------
    (ab)            |   捕获型分组。把 "ab" 当成一个整体，比如 (ab)+ 表示 "ab" 至少连续出现一次。
    ------------------------------------------------------------------------------------
    (?:ab)          |   非捕获型分组。与 (ab) 的区别是，它不捕获数据。
    ------------------------------------------------------------------------------------
    (good|nice)     |   捕获型分支结构。匹配 "good" 或 "nice"。
    ------------------------------------------------------------------------------------
    (?:good|nice)   |   非捕获型分支结构。与 (good|nice) 的区别是，它不捕获数据。
    ------------------------------------------------------------------------------------



 */
