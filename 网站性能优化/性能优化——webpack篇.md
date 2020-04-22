# webpack 优化方案


> 相信每个用过`webpack`的同学都对“打包”和“压缩”这样的事情烂熟于心。这些老生常谈的特性，我更推荐大家去阅读文档。本文将把注意力放在`webpack`的性能优化上。

## 一、提高构建速度

### 1. 给 loader 减轻负担

**用 include 或 exclude 来帮我们避免不必要的转译**

```js
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

```js
loader: 'babel-loader?cacheDirectory=true'
```

### 2. 使用 Happypack 将 loader 由单进程转为多进程

webpack 的缺点是单线程的，我们可以使用 Happypack 把任务分解给多个子进程去并发执行，大大提升打包效率。配置的方法是把 loader 的配置转移到 HappyPack 中去。

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

### 3. DllPlugin 提取公用库

开发过程中，我们经常需要引入大量第三方库，这些库并不需要随时修改或调试，我们可以使用`DllPlugin`和`DllReferencePlugin`单独构建它们。具体使用如下：

1. 配置webpack.dll.config.js

```js
// build/webpack.dll.config.js
var path = require("path");
var webpack = require("webpack");
module.exports = {
 // 要打包的模块的数组
 entry: {
    vue: ['vue/dist/vue.js', 'vue', 'vue-router', 'vuex'],
    comment: ['jquery', 'lodash', 'jquery/dist/jquery.js']
 },
 output: {
  path: path.join(__dirname, '../static/dll'), // 打包后文件输出的位置
  filename: '[name].dll.js',// vendor.dll.js中暴露出的全局变量名。
  library: '[name]_library' // 与webpack.DllPlugin中的`name: '[name]_library',`保持一致。
 },
 plugins: [
  new webpack.DllPlugin({
   path: path.join(__dirname, '.', '[name]-manifest.json'),
   name: '[name]_library', 
   context: __dirname
  }),
 ]
};
```

2. 在package.json的scripts里加上：`"dll": "webpack --config build/webpack.dll.config.js"`

3. 运行npm run dll 在static/js下生成`vendor-manifest.json`

4. 在build/webpack.base.conf.js里加上:

```js
// 添加DllReferencePlugin插件
 plugins: [
  new webpack.DllReferencePlugin({
   context: __dirname,
   manifest: require('./vendor-manifest.json')
  })
 ],
```

5. 最后在index.html中引入`vendor.dll.js`

```js
<div id="app"></div>
<script src="./static/dll/vue.dll.js"></script>
<script src="./static/dll/comment.dll.js"></script>
```

### 4. externals 选项

也可以使用 externals 让 webpack 不打包某部分，然后在其他地方引入 cdn 上的 js 文件，利用缓存下载 cdn 文件达到减少打包时间的目的。 配置 externals 选项：

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

配置 externals 之后，webpack 不会把配置项中的代码打包进去，别忘了需要在外部引入 cdn 上的 js 文件

```html
<body>
  <script src="XXX/cdn/vue.min.js"></script>
  ......
</body>
```

## 二、构建体积压缩

可以使用`vue-cli4`或者`webpack-bundle-analyzer`生成构建统计报告，方法如下：

**方法 1：使用 vue-cli4**

```bash
vue-cli-service build --report
```

**方法 2：安装 webpack-bundle-analyzer**

```bash
npm install --save-dev webpack-bundle-analyzer
```

webpack 配置：

```js
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  plugins: [new BundleAnalyzerPlugin()],
};
```

编译完成后同样可以生成分析报告，然后就可以通过报告解析体积过大的原因。

### 1. 代码分割 splitChunks

至于如何拆分，方式因人和项目而异。个人的拆分原则是：

- 业务代码和第三方库分离打包，实现代码分割；
- 业务代码中的公共业务模块提取打包到一个模块；
- 第三方库最好也不要全部打包到一个文件中，因为第三方库加起来通常会很大，我会把一些特别大的库分别独立打包，剩下的加起来如果还很大，就把它按照一定大小切割成若干模块。

### 2. 删除冗余代码

一个比较典型的应用，就是`Tree-Shaking`。

### 3. UI 库 按需加载

以`Element-ui`为例，`UI`框架通过借助`babel-plugin-component`，我们可以只引入需要的组件，以达到减小项目体积的目的。

### 4. 懒加载

结合 Vue 的异步组件和 Webpack 的代码分割功能，轻松实现路由组件的懒加载。

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

在 vue-router 中正常 import 即可

```js
const Foo = () => import("./Foo.vue");
```


### 5. 开启gzip压缩


以`vue-cli`为例配置`Gzip`如下：
1. `vue.config.js`配置`Gzip`压缩

```js
const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
  ......
  configureWebpack: config => {
    config.plugins.push(new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test:/\.js$|\.html$|.\css/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          minRatio: 0.8,	// 只有压缩好这个比率的资产才能被处理
          deleteOriginalAssets: true // 删除源文件
       }));
  }
}
```

2. 配置`Nginx`

> 将nginx配置开启gzip压缩，nginx会根据配置情况对指定的类型文件进行压缩。主要针对js与css。如果文件路径中存在与原文件同名（加了个.gz），nginx会获取gz文件，如果找不到，会主动进行gzip压缩。

`nginx`配置如下：

```bash
 gzip on; #开启或关闭gzip on off
 gzip_disable "msie6"; #不使用gzip IE6
 gzip_min_length 100k; #gzip压缩最小文件大小，超出进行压缩（自行调节）
 gzip_buffers 4 16k; #buffer 不用修改
 gzip_comp_level 8; #压缩级别:1-10，数字越大压缩的越好，时间也越长
 gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png; #  压缩文件类型 
 gzip_vary off;
 ```
