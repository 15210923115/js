/**

    test 整体匹配时需要使用 ^ 和 $

    这个相对容易理解，因为 test 是看目标字符串中是否有子串匹配正则，即有部分匹配即可。
    如果，要整体匹配，正则前后需要添加开头和结尾:
    console.log( /123/.test("a123b") );
    // => true
    console.log( /^123$/.test("a123b") );
    // => false
    console.log( /^123$/.test("123") );
    // => true

 */