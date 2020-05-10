### Vue SSR

https://ssr.vuejs.org/zh/
https://juejin.im/post/5b063962f265da0ddb63dac3

https://www.yuque.com/zifeiyu-rqpar/fd8qex
https://mopacha.github.io/vue-ssr-doc/


### Vue SSR服务端渲染改造踩坑指南
https://blog.csdn.net/chen801090/article/details/105974987/

### VueSSR的一些理解和详细配置

https://blog.csdn.net/sinat_36263705/article/details/95865410

### 带你五步学会Vue SSR
https://segmentfault.com/a/1190000016637877

### 几个点


*服务器端数据预取*
1. 在 entry-server.js 中，我们可以通过路由获得与 router.getMatchedComponents() 相匹配的组件，如果组件暴露出 asyncData，我们就调用这个方法。然后我们需要将解析完成的状态，附加到渲染上下文(render context)中。

```js
// entry-server.js
import { createApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      // 对所有匹配的路由组件调用 `asyncData()`
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        // 在所有预取钩子(preFetch hook) resolve 后，
        // 我们的 store 现在已经填充入渲染应用程序所需的状态。
        // 当我们将状态附加到上下文，
        // 并且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
        context.state = store.state

        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
```
2. 当使用 template 时，context.state 将作为 window.__INITIAL_STATE__ 状态，自动嵌入到最终的 HTML 中。而在客户端，在挂载到应用程序之前，store 就应该获取到状态

```js
// entry-client.js

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
```
3. 2中解决了客户端应用程序会因为使用与服务器端应用程序不同的状态，然后导致混合失败的问题。 



`entry-server.js`

在路由resolve之前，做数据预渲染

`entry-client.js`

window.INITIAL_STATE 就是服务端存在html中的store数据，客户端做一次同步，router.onReady在第一次不会触发，只有router接管页面之后才会触发，在beforeResolved中手动进行数据请求(否则asyncData中的请求不会触发)



## 总结

