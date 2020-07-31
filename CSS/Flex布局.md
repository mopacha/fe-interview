## Flex 布局

flex: flex-grow, flex-shrink ,flex-basis] 简写

```css
默认值：= flex: 0 1 auto
flex: none = flex: 0 0 auto
flex: auto = flex: 1 1 auto
```
当 flex 取值为一个非负数字，则该数字为 flex-grow 值，flex-shrink 取 1，flex-basis 取 0%，如下是等同的：

```css
flex: 1 = flex: 1 1 0%  
flex: 0 = flex: 0 1 0%  
```

当 flex 取值为一个长度或百分比，则视为 flex-basis 值，flex-grow 取 1，flex-shrink 取 1，有如下等同情况（注意 0% 是一个百分比而不是一个非负数字）：
```css
flex: 0% = flex: 1 1 0%
flex: 24px = flex: 1 1 24px
```

当 flex 取值为两个非负数字，则分别视为 flex-grow 和 flex-shrink 的值，flex-basis 取 0%，如下是等同的：

```css
flex: 2 3 = flex: 2 3 0%
```

当 flex 取值为一个非负数字和一个长度或百分比，则分别视为 flex-grow 和 flex-basis 的值，flex-shrink 取 1，如下是等同的：

```css
flex: 2333 3222px  = flex:2333 1 3222px
```

其他

```css
flex: initial = flex: 0 1 auto = flex:0 auto
```
小结：
1. 其实百分比的计算值是以父类容器的宽度为基数计算的，而长度值0直接取值不用再计算，但是0%和0的最终计算值都是0px。
2. `flex:1`;跟`flex:1 1 0`的视觉效果和最终计算值是⼀样的，只不过是计算过程不同。


flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

flex-basis 规定的是子元素的基准值。所以是否溢出的计算与此属性息息相关。flex-basis 规定的范围取决于 box-sizing。这里主要讨论以下 flex-basis 的取值情况：

- auto：首先检索该子元素的主尺寸，如果主尺寸不为 auto，则使用值采取主尺寸之值；如果也是 auto，则使用值为 content。

- content：指根据该子元素的内容自动布局。有的用户代理没有实现取 content 值，等效的替代方案是 flex-basis 和主尺寸都取 auto。

- 百分比：根据其包含块（即伸缩父容器）的主尺寸计算。如果包含块的主尺寸未定义（即父容器的主尺寸取决于子元素），则计算结果和设为 auto 一样。
