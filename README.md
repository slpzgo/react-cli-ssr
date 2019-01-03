react服务端渲染

> react-cli-ssr

## Build Setup

``` bash
# install dependencies
npm install

# 随便写两个api
node ./server/api.js

# 预打包第三方（优先，运行之前先执行dll）
npm run dll

# 客户端运行
npm run dev

# 运行服务端渲染测试环境
npm start
服务端加入了热载，与webpack同步刷新页面

# 打包生成环境代码
npm run build

# 如需访问生成环境的服务端渲染，请先打包生产环境代码，然后执行
npm run prod

# build for production and view the bundle analyzer report
npm run build --report
```

## 打包优化：
```
# index.html 可使用cdn
<script src="https://unpkg.com/flyio/dist/fly.min.js"></script>
webpack externals 引入

# dll预打包
生成vendor-manifest.json
<script src="./static/js/vendor.dll.js"></script>

# 使用fly替代axios，更小更轻便

# 正式环境建议
productionSourceMap: false, 是否生成.map文件
productionGzip: true, 是否启用压缩功能
productionGzipExtensions: ['js', 'css'], 压缩的文件
```

## 项目遇到的问题
```
# webpack4，babel7的安装配置
webpack4对css打包，废弃了原先的extract-text-webpack-plugin，采用mini-css-extract-plugin
vendor也废弃了原有的，采用optimization

# react中eslint的安装和配置

# dll处理时，prop-types冲突，打包在dll里时不进行报错，无法正常使用
解决：去官网下载未压缩的包，可行，自己进行压缩，原因未知。

# koa-static处理的静态文件，webpack 热载时的资源为动态生成，如果设置了静态资源路径为同一个，将无法运行

# 服务端热载与webpack同步
我们在服务端设置了koa-webpack-dev-middleware和koa-webpack-hot-middleware,页面不会自动刷新，需要webpack entry入口设置webpack-hot-middleware/client?noInfo=true&reload=true

# 前后端数据同步
服务端获取数据后，引入到window对象，在客户端再进行store的数据初始化

# redux state的管理
可用Object.assign或...操作符进行数据操作，直接修改state数据，react不会自动更新

# 服务端渲染路由匹配
详见server/renderToString.js
```