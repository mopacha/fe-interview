


### 3.3 数据绑定

*   [Vue 深入响应式原理](https://ustbhuangyi.github.io/vue-analysis/v2/reactive/)
*   [面试官: 实现双向绑定Proxy比defineproperty优劣如何?](https://juejin.im/post/5acd0c8a6fb9a028da7cdfaf)
*   [为什么Vue3.0不再使用defineProperty实现数据监听？](https://mp.weixin.qq.com/s/O8iL4o8oPpqTm4URRveOIA)
*   [Vue 的响应式原理中 Object.defineProperty 有什么缺陷？](https://www.cnblogs.com/wangxi01/p/11225555.html)


### 总结

#### Object.defineProperty VS Proxy
*Object.defineProperty*
- 兼容性好，支持IE9
- vue2设计中，考虑到性能/体验的性价，通过下标方式修改数组数据或者给对象新增属性并不会触发组件的重新渲染；
- 但vue才设置了7个变异数组（push、pop、shift、unshift、splice、sort、reverse）的 hack 方法来解决问题；
- 只能对属性进行劫持，需要递归遍历每个属性，新增属性需要手动 Observe（vm.$set）。

*Proxy的优势*   
- Proxy可以直接监听对象而非属性
- Proxy可以直接监听数组的变化
- Proxy有多达13种拦截方法，不限于apply/ownKeys/deleteProperty/has等，是Object.defineProperty不具备的
- Proxy返回的是一个新对象，我们可以只操作新的对象达到目的，而Object.defineProperty只能遍历对象属性直接修改
- Proxy作为新标准将受到浏览器厂商重点持续的性能优化