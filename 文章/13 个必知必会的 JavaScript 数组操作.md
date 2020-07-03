## 13个实用的JavaScript数组操作技巧

英文原文： https://www.blog.duomly.com/13-useful-javascript-array-tips-and-tricks-you-should-know/

数组是JS最常见的概念之一，它为我们提供了处理存储数据的许多可能性。考虑到数组是Java语言中最基本的主题之一，您可以在编程开始之初就了解到这一点，在本文中，我将向您展示一些您可能不知道并且可能非常有用的技巧。这些技巧非常有助于我们编码！让我们开始吧。



### 1. 数组去重

这里只展示两种可行的方法， 一种是实用`.from()`方法， 第二种是实用扩展运算符`...`

```js
let  fruits = ["banana", "apple", "orange", "watermelon", "apple", "orange", "grape", "apple"]
// 第一种方法
let uniqueFruits = Array.from(new Set(fruits))
//第二种方法
let uniqueFruits2 = [...new Set(fruits)]
```


### 2 .替换数组中的特定值

我们可用使用`.splice(start, value to  remove, valueToAdd)`并在其中传递三个参数，这些参数指定了要在哪里开始修改，要更改多少个值以及新值。

```js
let  fruits = ["banana", "apple", "orange", "watermelon", "apple", "orange", "grape", "apple"]
fruits.splice(0, 2, "potato", "tomato")
console.log(fruits) // returns  ["potato", "tomato", "orange", "watermelon", "apple", "orange", "grape", "apple"]
```



### 3. 不使用.map()映射数组

也许每个人都知道数组的`.map()`方法，但是可以使用另一种解决方案来获得相似的效果，并且代码非常简洁。这里，我们可用`.form()`方法。


```js
let friends = [
    { name: 'John', age: 22 },
    { name: 'Peter', age: 23 },
    { name: 'Mark', age: 24 },
    { name: 'Maria', age: 22 },
    { name: 'Monica', age: 21 },
    { name: 'Martha', age: 19 },
]

let friendsNames = Array.from(friends, ({name}) => name)

console.log(friendsNames) //returns ["John", "Peter", "Mark", "Maria", "Monica", "Martha"]
```


### 4. 清空数组

您是否有一个包含所有元素的数组，但出于任何目的都需要对其进行清理，并且不想一个一个地删除元素？只需一行代码即可完成。要清空数组，您需要将数组的长度设置为0，仅此而已！

```js
let fruits = ["banana", "apple", "orange", "watermelon", "apple", "orange", "grape", "apple"];

fruits.length = 0;
console.log(fruits); // returns []
```


### 5. 数组转对象

碰巧我们有一个数组，但是出于某种目的，我们需要一个具有此数据的对象，而将数组转换为对象的最快方法是使用众所周知的扩展运算符`...`。

```js
let fruits = ["banana", "apple", "orange", "watermelon"];

let fruitsObj = {...fruits};

console.log(fruitsObj) // returns {0: “banana”, 1: “apple”, 2: “orange”, 3: “watermelon”, 4: “apple”, 5: “orange”, 6: “grape”, 7: “apple”}
```


### 6. 用数据填充数组
在某些情况下，当我们创建一个数组时，我们想用一些数据填充它，或者我们需要一个具有相同值的数组，在这种情况下，`.fill()`方法提供了一种简单而干净的解决方案。

```js
let newArray = new Array(10).fill('1')
console.log(newArray) // returns [“1”, “1”, “1”, “1”, “1”, “1”, “1”, “1”, “1”, “1”, “1”]
```


### 7. 合并数组

除了使用`.concat()`方法，我们也可以使用扩展运算符`...`。

```js
var fruits = [“apple”, “banana”, “orange”];
var meat = [“poultry”, “beef”, “fish”];
var vegetables = [“potato”, “tomato”, “cucumber”];
var food = […fruits, …meat, …vegetables];
console.log(food); // [“apple”, “banana”, “orange”, “poultry”, “beef”, “fish”, “potato”, “tomato”, “cucumber”]

```


### 求数组的交集
这也是您在任何Javascript面试中面临的最普遍的挑战之一，因为它展示了你是否可以使用数组方法以及你的逻辑是什么。

```js
var numOne = [0, 2, 4, 6, 8, 8];
var numTwo = [1, 2, 3, 4, 5, 6];
var duplicatedValues = [...new Set(numOne)].filter(item=> numTwo.includes(item))
console.log(duplicatedValues); // returns [2, 4, 6]

```

### 9. 从数组中删除虚值

首先，让我们定义虚值。在Javascript中，虚值有`false, 0, „”, null, NaN, undefined`。现在，我们可以找到如何从数组中删除此类值。为此，我们将使用.filter（）方法。

```js
var mixedArr = [0, “blue”, “”, NaN, 9, true, undefined, “white”, false];
var trueArr = mixedArr.filter(Boolean);
console.log(trueArr); // returns [“blue”, 9, true, “white”]
```

### 10. 从数组中获取随机值
有时我们需要从数组中随机选择一个值。为了以简单，快速和简短的方式创建它并保持我们的代码整洁，我们可以根据数组长度获取随机索引号。让我们看一下代码：

```js
var colors = [“blue”, “white”, “green”, “navy”, “pink”, “purple”, “orange”, “yellow”, “black”, “brown”];

var randomColor = colors[(Math.floor(Math.random() * (color.length)))]

```

### 11. 反转数组

```js
var colors = [“blue”, “white”, “green”, “navy”, “pink”, “purple”, “orange”, “yellow”, “black”, “brown”];
var reversedColors = colors.reverse();
console.log(reversedColors); // returns [“brown”, “black”, “yellow”, “orange”, “purple”, “pink”, “navy”, “green”, “white”, “blue”]

```

### 12. .lastIndexOf（）方法

在Javascript中，有一个有趣的方法，它允许查找给定元素的最后一次出现的索引。例如，如果我们的数组有重复的值，我们可以找到它最后一次出现的位置。让我们看一下代码示例：

```js
var nums = [1, 5, 2, 6, 3, 5, 2, 3, 6, 5, 2, 7];
var lastIndex = nums.lastIndexOf(5);
console.log(lastIndex); // returns 9
```

### 13. 对数组中的所有值求和

```js
var nums = [1, 5, 2, 6];
var sum = nums.reduce((x, y) => x + y);
console.log(sum); // returns 14
```

### 结论

在本文中，我向您介绍了13个技巧和小窍门，它们可以帮助你编写简洁明了的代码。另外，请记住，您可以在Javascript中使用许多值得探索的技巧，不仅涉及数组，而且涉及不同的数据类型。我希望您喜欢本文中提供的解决方案，并且将使用它们来改善您的开发过程。