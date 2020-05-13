# 使用`Array.reduce()`的6种有趣方式

## 前言

在所有流行的数组方法中，我觉的最难掌握的就是`Array.reduce()`。

从表面上看，这似乎是一种简单无趣的方法，并没有太大作用。但是在其不起眼的外表之下，`Array.reduce()`实际上是对开发人员工具包的强大而灵活的补充。

今天，我们将研究下使用`Array.reduce()`的一些很酷的功能。

## `Array.reduce()`是如何工作的

大多数现代数组方法都会返回一个新数组。`Array.reduce()`方法更加灵活，它可以返回任何值。其目的是将数组中的每个值（从左到右）开始缩减，最终计算为一个值。

该值可以是数字，字符串，甚至是对象或新数组。这就是一直让我绊倒的部分，我没有意识到它有多灵活！

### 语法

`Array.reduce()`接收 2 个参数：一个是函数参数，用于执行每个数组元素的函数。另一个是初始值。

回调函数还接 ​​ 收 4 个参数：accumulator：初始值, 或者计算结束后的返回值。current：当前元素。index：当前元素的索引。arr：当前元素所属的数组对象。

```js
var myNewArray = [].reduce(function (accumulator, current, index, arr) {
  return accumulator;
}, initialValue);
```

让我们看一些示例，以使这一切切实可行。

## 1. 数组求和

假设您有一个要加在一起的数字数组。使用 Array.forEach()，您可能会执行以下操作：

```js
var total = (0)[(1, 2, 3)].forEach(function (num) {
  total += num;
});
```

这是 `Array.reduce()`用得最多的例子了。我发现*accumulator*这个单词让人困惑，因此在此示例中，我称其为 sum，因为它既是求和的意思。

```js
var total = [1, 2, 3].reduce(function (sum, cur) {
  return sum + cur;
}, 0);
```

在这里，我们传入 0 作为初始值

在回调中，我们将当前值添加到中 sum，该值 0 在第一个循环中是起始值，然后是 1（起始值 0 加上当前项值 1），然后 3（累加 1 加上当前项值 2），以及以此类推。

## 2. 一步完成 Array.filter()与 Array.map()的组合功能

假如你有以下数组

```js
var wizards = [
  {
    name: "Harry Potter",
    house: "Gryfindor",
  },
  {
    name: "Cedric Diggory",
    house: "Hufflepuff",
  },
  {
    name: "Tonks",
    house: "Hufflepuff",
  },
  {
    name: "Ronald Weasley",
    house: "Gryfindor",
  },
  {
    name: "Hermione Granger",
    house: "Gryfindor",
  },
];
```

创建一个 house 为 Hufflepuff 的新数组

之前方式：

```js
let huffepuff = wizards
  .filter((wizard) => {
    return wizard.house === "Hufflepuff";
  })
  .map((wizard) => {
    return wizard.name;
  });
```

使用 reduce:

```js
let hufflepuff = wizards.reduce((newArr, wizard) => {
  if (wizard.house === "Hufflepuff") {
    newArr.push(wizard.name);
  }
  return newArr;
}, []);
```

## 3. 创建HTML标签

实现一个 house 为 Hufflepuff 的无序列表

```js
let hufflepuffList =
  "<ur>" +
  wizards.reduce((html, wizard) => {
    if (wizard.house === "Hufflepuff") {
      html += "<li>" + wizard.name + "</li>";
    }
    return html;
  }, "") +
  "</ul>";
```

## 4. 按条件元素分组

lodash 库具有一种 groupBy()方法，该方法将可以将数组元素按照某个标准分组。

_按照整数分组_

```js
let numbers = [6.1, 4.2, 6.3];
// 返回 {'4': [4.2], '6': [6.1, 6.3]}
_.groupBy(numbers, Math.floor);
```

_按照单词长度分组_

```js
let words = ["one", "two", "three"];
// 返回 {'3': ['one', 'two'], '5': ['three']}
_.groupBy(words, "length");
```

### 使用 `Array.reduce()` 实现 groupBy()

```js
let groupBy = (arr, criteria)=>{
    return arr.reduce((obj, item)={
        let key = typeof criteria === 'function' ? criteria(item) : item[criteria]
        if(!obj.hasOwnProperty(key)){
            obj[key] = []
        }
        obj[key].push(item)
        return obj
    },{})
}
```

## 5. 合并数据到数组

还记的之前的 wizards 数组吗？

```js
var wizards = [
  {
    name: "Harry Potter",
    house: "Gryfindor",
  },
  {
    name: "Cedric Diggory",
    house: "Hufflepuff",
  },
  {
    name: "Tonks",
    house: "Hufflepuff",
  },
  {
    name: "Ronald Weasley",
    house: "Gryfindor",
  },
  {
    name: "Hermione Granger",
    house: "Gryfindor",
  },
];
```

另外还有一个数组是每个 wizard 的积分对象:

```js
var points = {
  HarryPotter: 500,
  CedricDiggory: 750,
  RonaldWeasley: 100,
  HermioneGranger: 1270,
};
```

实现功能： 把每个巫师的积分数据加到数组对应的对象中。

```js
let wizardsWithPoints = wizards.reduce((arr, wizard) => {
  let key = wizard.name.replace(" ", "");
  if (points[key]) {
    wizard.points = points[key];
  } else {
    wizard.points = 0;
  }

  arr.push(wizard);

  return arr;
}, []);
```

## 6. 合并数据到对象

如果您想将两个数据源组合成一个对象。wizard 的名字当做属性名，house 和 points 作为属性值。

```js
let wizardAsAnObject = wizards.reduce((obj, wizard) => {
  // Get the key for the points object by removing spaces from the wizard's name
  let key = wizard.name.replace(" ", "");

  // If the wizard has points, add them
  // Otherwise, set them to 0
  if (points[key]) {
    wizard.points = points[key];
  } else {
    wizard.points = 0;
  }

  delete wizard.name;

 // Add wizard data to the new object
  obj[key] = wizard;

  return obj;
}, {});
```

## 总结
- `Array.reduce()`方法已经从我认为毫无意义的东西变成了我最喜欢的JavaScript方法。那么，您应该使用它吗？什么时候用？
- `Array.reduce()`方法具有出色的浏览器支持。它适用于所有现代浏览器以及IE9及更高版本。长期以来，它在移动浏览器中也受支持。如果你还需要支持更老的浏览器，你可以添加一个 polyfill 来支持到 IE6。
- 您可能会抱怨`Array.reduce()`最大问题是它让以前从未遇到过的人感到困惑。Array.filter()与结合Array.map()运行较慢，并且涉及额外的步骤，但更易于阅读。从方法的名称中可以明显看出它们应该执行的操作。
- 也就是说，有时`Array.reduce()`会使事情变得更简单而不是更加复杂。groupBy()辅助函数就是一个很好的例子。
- 最终，这是要添加到您的工具箱中的另一个工具。如果使用得当，该工具可以为您提供超能力。

## 参考文献
[Five Interesting Ways to Use Array.reduce() (And One Boring Way)](https://24ways.org/2019/five-interesting-ways-to-use-array-reduce/)