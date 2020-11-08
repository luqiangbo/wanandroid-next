服务端渲染 nextjs 实战总结

# web-next

# 前言

基于[玩安卓](https://www.wanandroid.com)进行代码的 next 重构, 从零开始实现一个 next,从开发到部署一整套流程, 偏实战, 列出坑点, 基础 api 请参照官方文档。

Github: [传送门](https://github.com/luqiangbo/web)

演示地址: [传送门](https://next.commok.com/)

next 官网: [Nextjs.cn](https://nextjs.cn/)

![预览](https://cdn.nlark.com/yuque/0/2020/png/140371/1604812534657-58b17e74-bdb9-4f88-8acd-86ee7a301580.png?x-oss-process=image%2Fresize%2Cw_1716)

## 技术栈

---

### 前端

`next`: 升级到最新版本 10
`react`: 前端三大框架 最新版本 17
`mobx and redux` : 集成主流两个状态管理, 可以根据自己的技术栈进行取舍, 成年人都要. redux 集成 thunk 和 log
`sass`: 样式
`ant-design`: 宇宙第一好用,让你开发速度更快
`lodash`: 工具类

### 服务端

`nginx`: 需要用到端口转发
`docker`: 镜像打包

## 工程构建

---

基于 next 官网搭建, 详细 api 请参照官网,

### 目录介绍

```
|--
  |-- components        // 组件
  |-- config            // 设置文件
  |-- fetchMdw          // 中间层接口转发
  |-- fetchServe        // 服务端接口封装
  |-- pages             // 页面
    |-- api             // 中间层
    |-- XXX             // 页面路径
    |-- _app.tsx        // 项目入口文件
    |-- _error.tsx      // 错误页面
    |-- index.tsx       // 主页
  |-- static            // 静态文件
  |-- store-mobx        // 状态管理 mobx
  |-- store-redux       // 状态管理 redux
  |-- styles            // 样式文件
  |-- util              // 工具类
```

打包成 docker 容器，拷贝项目到创建的文件夹，npm i， 设置环境变量， 打包项目 暴漏端口，坐等启动，这里需要 dockerhub 账号关联 github，监听分支提交，自动打包。github 今年新出的 action 也很好用。小伙伴们可以试一试

```
// .Dockerfile
# 环境
FROM node:15
# 端口
ENV PORT 3000

# Create app directory 拷贝的意思
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN npm install

# Copying source files
COPY . /usr/src/app

# Building app 打包然后暴露端口
RUN npm run build
EXPOSE 3000

# Running the app // 启动服务
CMD "npm" "start"

```

这里没镜像 next.config.js 进行个性化配置, 默认配置基本够用

```
// .next.config.js
```

### 技术点 难点

1. 状态管理的配置
   因为是服务端渲染, redux 和 mobx 在服务端是不工作的, 设计到有用到`window`的都需要处理下
2. redux-persist 持久化插件 官网遗留的 bug
   依照 nextjs 提供的 nextjs-redux-persist 代码模版,会有不渲染 html 标签的 bug,依照\_app.tsx 我的处理方式就可以解决,详情看代码, 这个 bug 也困扰了我好久
3. 重定向
   业务中需要对路由进行保护, 官网给的重定向解决方案不好用, 最后封装了一个重定向工具,希望能帮助到大家,不是最优解决方案, 但能用
   ```javascript
   // util/inde.ts
   // 重定向
   export const redirect = (Router, { req, res }, path) => {
     // 如果包含 req 信息则表示代码运行在服务端
     if (req) {
       res.writeHead(302, { Location: path });
       res.end();
     } else {
       // 客户端跳转方式
       Router.push(path);
     }
   };
   ```
4. api 中间层
   二次加工后端接口, 处理登录权限验证等

## 部署

部署请看我上一篇文章, 大同小异, 技术栈就是 `Gihub`+`dockerHub`

### doc

mobx-react 文档
https://mobx-react.js.org/

### issue

redux-persist SSR didn`t see my meta tags
https://github.com/vercel/next.js/issues/8240

重定向 路由保护处理
https://stackoverflow.com/questions/58173809/next-js-redirect-from-to-another-page
https://github.com/vercel/next.js/discussions/10724
