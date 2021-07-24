# markdown速记表
![](~$docs/public/notes/markdown1.jpg)
![](~$docs/public/notes/markdown2.jpeg)

```html

>【1】 1～6级标题 
# 一级标题 #
## 二级标题 ##
 
>【2】 文字
 
普通文字
**粗体**
__粗体2__
*斜体字*
_斜体字2_
***粗体+斜体***
___粗体+斜体___
<u>带下划线的文字，兼容HTML标签</u>
<font face="微软雅黑">微软雅黑</font>
<font face="黑体" color="#0099ff" size="6">黑体 （size=6）</font>
[RGB颜色大全](https://www.cnblogs.com/yiven/p/7766256.html)
>【3】 图片： 感叹号+中括号+补充文字+小括号+图片地址
![补充文字-显示在图片不存在时](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9jc2RuaW1nLmNuL2Nkbi9jb250ZW50LXRvb2xiYXIvY3Nkbi1sb2dvXy5wbmc?x-oss-process=image/format,png)
> 【4】 链接： 中括号+文字+小括号+链接
[链接文字](https://baidu.com/) -- 这是标准格式
<http://example.com/> -- 这是显示网址的精简模式
>【5】 列表
* 无序列表1使用*星号开头
* 无序列表2
1. 有序列表1使用数字+点号+空格开头
2. 有序列表2
* 无序列表1 内嵌引用段落 [注意：引用符号>前面需要加两个空格对齐]
  >这是引用，接受各种内容
* 无序列表2 内嵌引用段落 [注意：引用符号>前面需要加两个空格对齐]
  >这是引用，接受各种内容
> 【6】特殊段落、标点符号：（1）分隔符 = 三个横杠 （2）引用文本用“>”开头
---
~~删除文字~~的效果
> 【7】表格  
| 左对齐 | 右对齐 | 居中对齐 |
| :-----| ----: | :----: |
| 单元格 | 单元格 | 单元格 |
| 单元格 | 单元格 | 单元格 |
>【8】代码块，引用文本，注意bash、php为语言类型定义
```bash
cd /
sudo rm -R ./*
echo 'Run as fast as you can'

```php
$date = date('Y-m-d H:i:s');
echo $date;

>关于多行引用的方法：
>方法1：每一行都使用#开头
>就像这样；
方法2：多行文字不要用空行断开，然后第一行使用>开头即可
例如这样跟在第三行那里；
> 【9】 换行
使用HTML的BR<br />标签！
在右边使用两个空格+Enter换行的  
效果。

```
