export const to = (promise) => {
  return promise.then((res) => [null, res]).catch((err) => [err, null]);
};
// 获取窗口可视范围的高度
export const getViewHeight = () => {
  return Math.floor(document.documentElement.clientHeight);
};
// 获取滚动条距离顶部的距离
export const getScrollTop = () => {
  return Math.floor(document.documentElement.scrollTop);
};
// 获取文档内容实际高度
export const getContentHeight = () => {
  return Math.floor(Math.max(document.body.scrollHeight, document.documentElement.scrollHeight));
};
// 获取文档内容实际高度
export const getToBottom = () => {
  return getContentHeight() - getScrollTop() - getViewHeight();
};
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
