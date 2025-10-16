// 代码生成时间: 2025-10-17 02:32:18
const express = require('express');
const fs = require('fs');
const chokidar = require('chokidar');

// 初始化Express应用
const app = express();
const port = 3000;

// 文件监控器
const watcher = chokidar.watch('./', {
  ignored: /^\./, // 忽略点文件（例如隐藏文件）
  persistent: true,
});

// 定义一个函数处理文件变化事件
function handleFileChange(event, path) {
  console.log(`File ${path} has been ${event}.`);
  // 发送文件变更通知，此处简化为发送HTTP响应
  app.get('/file-change', (req, res) => {
    res.json({
      event: event,
      path: path,
    });
  });
}

// 添加事件监听器
watcher
  .on('add', path => handleFileChange('added', path))
  .on('change', path => handleFileChange('changed', path))
  .on('unlink', path => handleFileChange('removed', path));

// 启动Express服务器
app.listen(port, () => {
  console.log(`File watcher app listening at http://localhost:${port}`);
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 导出app以便测试
module.exports = app;