# 使用Array.reduce（）的五种有趣方式

## 前言

在所有流行的数组方法中，我觉的最难掌握的就是Array.reduce()。

从表面上看，这似乎是一种简单无趣的方法，并没有太大作用。但是在其不起眼的外表之下，Array.reduce()实际上是对开发人员工具包的强大而灵活的补充。

今天，我们将研究下使用Array.reduce()的一些很酷的功能。

## Array.reduce()是如何工作的

大多数现代数组方法都会返回一个新数组。Array.reduce()方法更加灵活，它可以返回任何值。其目的是将数组中的每个值（从左到右）开始缩减，最终计算为一个值。

该值可以是数字，字符串，甚至是对象或新数组。这就是一直让我绊倒的部分，我没有意识到它有多灵活！

### 语法
Array.reduce()接收2个参数：一个是函数参数，用于执行每个数组元素的函数。另一个是初始值。

回调函数还接​​收4个参数：accumulator：初始值, 或者计算结束后的返回值。current：当前元素。index：当前元素的索引。arr：当前元素所属的数组对象。

```js
var myNewArray = [].reduce(function (accumulator, current, index, arr) {
  return accumulator;
}, initialValue);
```

让我们看一些示例，以使这一切切实可行。


## 1. 数组求和

假设您有一个要加在一起的数字数组。使用Array.forEach()，您可能会执行以下操作：

```js
var total = 0
[1, 2, 3].forEach(function(num){
    total += num
})
```
这是Array.reduce()用得最多的例子了。我发现*accumulator*这个单词让人困惑，因此在此示例中，我称其为sum，因为它既是求和的意思。

```js
var total = [1, 2, 3].reduce(function(sum, cur){
    return sum + cur
}, 0)
```
在这里，我们传入0作为初始值

在回调中，我们将当前值添加到中sum，该值0在第一个循环中是起始值，然后是1（起始值0加上当前项值1），然后3（累加1加上当前项值2），以及以此类推。

## 2. 一步完成Array.filter()与Array.map()的组合功能

假如你有以下数组

```js
var wizards = [
  {
    name: 'Harry Potter',
    house: 'Gryfindor'
  },
  {
    name: 'Cedric Diggory',
    house: 'Hufflepuff'
  },
  {
    name: 'Tonks',
    house: 'Hufflepuff'
  },
  {
    name: 'Ronald Weasley',
    house: 'Gryfindor'
  },
  {
    name: 'Hermione Granger',
    house: 'Gryfindor'
  }
];
```

创建一个house为Hufflepuff的新数组

之前方式：

```js
let huffepuff = wizards.filter(wizard=>{
    return wizard.house === 'Hufflepuff'
}).map(wizard =>{
    return wizard.name
})
```
使用reduce:

```js
let hufflepuff = wizards.reduce((newArr, wizard)=>{
    if(wizard.house === 'Hufflepuff'){
        newArr.push(wizard.name)
    }
    return newArr
},[])
```

### 3. 创建HTML标签

实现一个house为Hufflepuff的无序列表

```js
let hufflepuffList = '<ur>' + wizards.reduce((html, wizard)=>{
    if(wizard.house === 'Hufflepuff'){
        html += '<li>' + wizard.name + '</li>'
    }
    return html
}, '') + '</ul>'
```


