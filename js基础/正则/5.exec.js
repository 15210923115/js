
/**
    exec() 方法用于检索字符串中的正则表达式的匹配。

    1.语法：
        RegExpObject.exec(string)

    2.返回值：
        返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null。

    3.说明：
        exec() 方法的功能非常强大，它是一个通用的方法，而且使用起来也比 test() 方法以及支持正则表达式的 String 对象的方
        法更为复杂。

        如果 exec() 找到了匹配的文本，则返回一个结果数组。否则，返回 null。此数组的第 0 个元素是与正则表达式相匹配的文本，
        第 1 个元素是与 RegExpObject 的第 1 个子表达式相匹配的文本（如果有的话），第 2 个元素是与 RegExpObject 的第 2 
        个子表达式相匹配的文本（如果有的话），以此类推。除了数组元素和 length 属性之外，exec() 方法还返回两个属性。index 
        属性声明的是匹配文本的第一个字符的位置。input 属性则存放的是被检索的字符串 string。我们可以看得出，在调用非全局的 
        RegExp 对象的 exec() 方法时，返回的数组与调用方法 String.match() 返回的数组是相同的。

        但是，当 RegExpObject 是一个全局正则表达式时，exec() 的行为就稍微复杂一些。它会在 RegExpObject 的 lastIndex 
        属性指定的字符处开始检索字符串 string。当 exec() 找到了与表达式相匹配的文本时，在匹配后，它将把 RegExpObject 的 
        lastIndex 属性设置为匹配文本的最后一个字符的下一个位置。这就是说，您可以通过反复调用 exec() 方法来遍历字符串中的所
        有匹配文本。当 exec() 再也找不到匹配的文本时，它将返回 null，并把 lastIndex 属性重置为 0。
 
    4.提示和注释

        重要事项：
            如果在一个字符串中完成了一次模式匹配之后要开始检索新的字符串，就必须手动地把 lastIndex 属性重置为 0。

        提示：
            请注意，无论 RegExpObject 是否是全局模式，exec() 都会把完整的细节添加到它返回的数组中。这就是 exec() 
            与 String.match() 的不同之处，后者在全局模式下返回的信息要少得多。因此我们可以这么说，在循环中反复地调用 exec() 
            方法是唯一一种获得全局模式的完整模式匹配信息的方法。
   
    */



var str = "Visit W3School,I am W6School,named yy"; 
// var patt = new RegExp("W3School","g");
var patt = /W\d*School/g;
var result;

while ((result = patt.exec(str)) != null)  {
    console.log(result);// [ 'W3School', index: 6, input: 'Visit W3School', groups: undefined ]
    console.log("\r\n");
    console.log(patt.lastIndex);// 14
}