### webpack之loader加载顺序为啥从右往左
https://blog.csdn.net/qq_37109325/article/details/80169289

### webpack loader的执行顺序（autoprefixer没起作用的原因）
https://blog.csdn.net/A13330069275/article/details/97374843

### Webpack基础（四）：loader 的作用，style-loader，css-loader
https://blog.csdn.net/weixin_43921436/article/details/103847491


### 使用 “mini-css-extract-plugin” 提取css到单独的文件
https://www.cnblogs.com/xieqian/p/10196977.html

### vue-loader
https://www.cnblogs.com/Sherlock09/p/11023593.html

### 执行顺序

```js
{ test: /\.scss$/,
    use: [ 'vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader' ]
}
```

loader的执行顺序是：sass-loader --》postcss-loader --》css-loader --》vue-style-loader

作用：
sass-loader: 加载和转义sass/scss文件，转换成 CSS
postcss-loader: 加上兼容性前缀
css-loader: 负责把 css 文件给读出来，并且变成 js 的字符串。
style-loader: 会把 css-loader 生成的内容，以 style 挂载到页面的 head 部分
vue-style-loader: 动态创建style标签插入css


### webpack打包原理 ? 看完这篇你就懂了 !
https://juejin.im/post/5e116fce6fb9a047ea7472a6
https://github.com/airuikun/blog/issues/4