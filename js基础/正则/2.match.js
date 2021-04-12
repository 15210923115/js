console.log('afssa8ppsdfsha9ppdf'.match(/(fsa)\d*(pp)/)); 
// 输出：null

console.log('afsa8ppsdfsa9ppdf'.match(/(fsa)\d*(pp)/)); 
// 输出：['fsa8pp', 'fsa', 'pp', index: 1, input: 'afsa8ppsdfsa9ppdf', groups: undefined]

console.log('afsa8ppsdfsa9ppdf'.match(/(fsa)\d*(pp)/g)); 
// 输出：[ 'fsa8pp', 'fsa9pp' ]

/**
 * 
    stringObj.match(/xx/)或者stringObj.match(/xx/g)返回的结果依赖于最终匹配到的子字符串个数，如下：

    -> 0个：如果一个都没匹配到，返回null

    -> 1个：如果匹配到一个，返回
    [
        '匹配文本', 
        '正则表达式的子表达式匹配的文本', 
        index: 匹配文本的第一个字符索引, 
        input: stringObj, 
        groups: undefined
    ]

    -> >=2个：如果匹配的文本数量大于等于两个，那么返回['匹配文本1', '匹配文本2', ...]，及数组内容只包含匹配到的所有文本内容，不包含index和input。

    备注：所有资料上都说match的返回结果依赖于regex有没有g，这么说也没错，
    加上g会执行全局匹配，全局匹配的结果个数有可能是大于等于2个，那么返回的数组结果就是['匹配文本1', '匹配文本2', ...]，
    如果全局匹配的结果个数是1个，那么返回结果的数组就是[
        '匹配文本', 
        '正则表达式的子表达式匹配的文本', 
        index: 匹配文本的第一个字符索引, 
        input: stringObj, 
        groups: undefined
    ]，和不加g进行正则匹配的结果是一致的。

    因此，匹配结果就看个数，如果是0个，返回null，如果是1个，返回[
        '匹配文本', 
        '正则表达式的子表达式匹配的文本', 
        index: 匹配文本的第一个字符索引, 
        input: stringObj, 
        groups: undefined
    ]，如果是大于等于2个，就返回['匹配文本1', '匹配文本2', ...]
 */

console.log('afsa8ppsdfsa9ppdf'.match('fsa')); // 如果match的参数是一个匹配文本，那么这个正则只会执行一次匹配
// 输出：[ 'fsa', index: 1, input: 'afsa8ppsdfsa9ppdf', groups: undefined ]