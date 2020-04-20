# webpack 优化方案






## 提高构建速度

### 1. 给loader减轻负担

**用include或exclude来帮我们避免不必要的转译**

```
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
```

**开启缓存将转译结果缓存至文件系统**

```
loader: 'babel-loader?cacheDirectory=true'

```


### 2. 使用Happypack将loader由单进程转为多进程

webpack的缺点是单线程的，我们可以使用Happypack把任务分解给多个子进程去并发执行，大大提升打包效率。配置的方法是把loader的配置转移到HappyPack中去。

```js
const HappyPack = require('happypack')
// 手动创建进程池
const happyThreadPool =  HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
  module: {
    rules: [
      ...
      {
        test: /\.js$/,
        // 问号后面的查询参数指定了处理这类文件的HappyPack实例的名字
        loader: 'happypack/loader?id=happyBabel',
        ...
      },
    ],
  },
  plugins: [
    ...
    new HappyPack({
      // 这个HappyPack的“名字”就叫做happyBabel，和楼上的查询参数遥相呼应
      id: 'happyBabel',
      // 指定进程池
      threadPool: happyThreadPool,
      loaders: ['babel-loader?cacheDirectory']
    })
  ],
}
```

### 3. DllPlugin提取公用库

使用`DllPlugin`把第三方库单独打包到一个文件中，这个文件就是一个单纯的依赖库。这个依赖库不会跟着你的业务代码一起被重新打包，只有当依赖自身发生版本变化时才会重新打包。

这里只是引入性能优化的方法，怎么用，并不是本文的重点。

### 4. externals选项

也可以使用externals让webpack不打包某部分，然后在其他地方引入cdn上的js文件，利用缓存下载cdn文件达到减少打包时间的目的。 配置externals选项：


```js
// webpack.prod.config.js
...
module.exports = {
    externals: {
        'vue': 'window.Vue',
        'vuex': 'window.Vuex',
        'vue-router': 'window.VueRouter'
        ...
    }
}
```

配置externals之后，webpack不会把配置项中的代码打包进去，别忘了需要在外部引入cdn上的js文件

```html
<body>
    <script src="XXX/cdn/vue.min.js"></script>
    ......
</body>
```


## 构建体积压缩

可以使用`vue-cli4`或者`webpack-bundle-analyzer`生成构建统计报告，方法如下：

**方法1：使用vue-cli4**

```bash
vue-cli-service build --report
```

**方法2：安装webpack-bundle-analyzer**

```bash
npm install --save-dev webpack-bundle-analyzer
```

webpack 配置：

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
```

编译完成后同样可以生成分析报告，然后就可以通过报告解析体积过大的原因。


### 1. 拆分资源


### 2. 删除冗余代码

一个比较典型的应用，就是`Tree-Shaking`。

### 3. UI库 按需加载

以`Element-ui`为例，`UI`框架通过借助`babel-plugin-component`，我们可以只引入需要的组件，以达到减小项目体积的目的。

### 4. 懒加载

结合Vue的异步组件和Webpack的代码分割功能，轻松实现路由组件的懒加载。

```bash
npm install --save-dev @babel/plugin-syntax-dynamic-import
```

```js
test: /\.js$/,
exclude: /node_modules/,
use:[
    {
        loader: 'babel-loader', 
        options: {//如果有这个设置则不用再添加.babelrc文件进行配置
            "babelrc": false,// 不采用.babelrc的配置
            "plugins": [
                "@babel/plugin-syntax-dynamic-import"
            ]
        }
    }
]
```

在vue-router中正常import即可

```js
const Foo = () => import('./Foo.vue')
```
