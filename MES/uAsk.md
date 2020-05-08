### vue 数据双向绑定的原理
vue 的数据双向绑定的通过数据劫持结合发布者-订阅模式实现的，实现方式主要通过三个模块，数据监听器、指令解析器、消息订阅器；
指令解析器解析模板指令，它会将指令对应的节点绑定更新函数，添加监听数据的订阅者；
数据监听器通过使用Object.definePropery()来劫持各个属性的setter和getter,来监听各个属性的变化， 在数据变动时发布消息给消息订阅器-Dep，通知订阅者-Watcher，触发相应回调函数，去更新视图，达到数据变化=>视图更新；而当用户操作视图，ViewModel也能监听到视图的变化（通过DOM Listeners），然后通知数据做改动，这就实现了数据的双向绑定。

### 性能优化

webpack 打包速度：
- 使用 Happypack 将 loader 由单进程转为多进程 （打包速度）
-  DllPlugin 提取公用库：开发过程中，我们经常需要引入大量第三方库，这些库并不需要随时修改或调试，我们可以使用DllPlugin和DllReferencePlugin单独构建它们。具体使用如下：
打包体积：
- 图片懒加载
- 按需使用第三方库
- 路由懒加载
- 开启Gzip压缩
其它：

- 不要滥用 Vuex store
- 大列表禁用响应式功能-用Object.freeze()
- vue 预加载
- vue-ssr
- 图片方面，像淘宝，会优先使用webp，如果不支持再用jpg，以及，小图采用base64编码，雪碧图等

### vue 与 react 比较

*相同点*
1. 都支持服务端渲染
2. 都有Virtual DOM（虚拟dom)
3. 组件化开发，数据驱动视图
4. 都有`props`的概念，允许父组件往子组件传送数据
5. 都有支持native的方案，React的React native，Vue的weex
6. 都有管理状态，React有redux,Vue有自己的Vuex
7. React和Vue都有自己的构建工具，你可以使用它快速搭建开发环境。React有`Create React App`，而Vue对应的则是vue-cli。两个工具都能让你得到一个根据最佳实践设置的项目模板。

*区别*
1. 框架本质不同
- Vue本质是MVVM框架，由MVC发展而来；
- React是前端组件化框架，由后端组件化发展而来；严格上只针对MVC的view层

MVVM和 MVC 区别？
- 都是一种设计思想
- MVC 后台用的多，MVC是Model-View-Controller的简写，即模型-视图-控制器。
- MVC的目的就是将M和V 的代码分离
- MVC是单向通信，也就是View和Model，必须通过Controller来承上启下
- MVVM实现了View和Model的自动同步，当Model的属性改变时，不用再自己手动操作DOM元素，提高了页面渲染性能

2. virtual DOM不一样
- Vue宣称可以更快地计算出Virtual DOM的差异，这是由于它在渲染过程中，会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树
- React每当应用的状态被改变时，全部子组件都会重新渲染。当然，这可以通过shouldComponentUpdate这个生命周期方法来进行控制，如果为true继续渲染、false不渲染，但Vue将此视为默认的优化。

3. 数据绑定不同
- vue实现了数据的双向绑定，每一个属性都需要建立watch监听
- react数据流动是单向的，setState重新渲染

4. 组件写法不一样
- 函数式思想，all in js ,jsx语法，js操控css
- 响应式思想，也就是基于数据可变的。把html、js、css、组合到一起，也可以通过标签引擎组合到一个页面中

5. 性能
react适合大型项目，优化需要手动去做，状态可控
vue适合中小型项目，状态改变需要watch监听，数据量太大的话会卡顿

### 我为什么选择vue+elementUI

- 基于团队，刚入职的时候，现有的几个项目都是vue的,工作中有很多的问题需要我去解决;
- 它能让团队书写用js更容易，并且简化了js代码。上手Vue.js是相当容易的。
- 在Vue.js中，我们仅需要一行的js代码。其他代码我们加在HTML 中添加一些额外的属性。
- 中文文档，文档可读性强
- 支持下中国大佬，另外使自己的技术栈更加全面
- react的jsx灵活性强，但是代码必须要规范，每个人都有自己的代码风格。 因为项目的迭代更新很快，便于多人开发，所以我选择的是vue框架。
- “选择当下对你、对团队成本最低的一个框架或者语言，是最实际最可靠的。”




#### Object.defineProperty VS Proxy
*Object.defineProperty*
- 兼容性好，支持IE9
- vue2设计中，考虑到性能/体验的性价，通过下标方式修改数组数据或者给对象新增属性并不会触发组件的重新渲染；
- 但vue才设置了7个变异数组（push、pop、unshift、shift、splice、sort、reverse）的 hack 方法来解决问题；
- 只能对属性进行劫持，需要递归遍历每个属性，新增属性需要手动 Observe（vm.$set）。

*Proxy的优势*
- Proxy可以直接监听对象而非属性
- Proxy可以直接监听数组的变化
- Proxy有多达13种拦截方法，不限于apply/ownKeys/deleteProperty/has等，是Object.defineProperty不具备的
- Proxy返回的是一个新对象，我们可以只操作新的对象达到目的，而Object.defineProperty只能遍历对象属性直接修改
- Proxy作为新标准将受到浏览器厂商重点持续的性能优化
