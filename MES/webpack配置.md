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


### 手把手教你撸一个 Webpack Loader
https://www.jianshu.com/p/7fa359ffcf8d

### webpack打包原理 ? 看完这篇你就懂了 !
https://juejin.im/post/5e116fce6fb9a047ea7472a6
https://github.com/airuikun/blog/issues/4

### 深入webpack打包原理，loader和plugin的实现
https://juejin.im/post/5eae43f85188256d841a3b8b

### webpack 打包原理总结

1. 解析入口文件，使用`@babel/parser`转为AST抽象语法树
2. 使用`@babel/traverse`遍历AST提取文件的依赖，完成依赖收集
3. 使用@babel/core 和 @babel/preset-env将AST转成 CommenJS 的代码
4. 递归解析所有依赖项，生成依赖关系图
5. 重写 require函数 (浏览器不能识别commonjs语法),输出bundle
6. 将bundle写入文件

