// 代码生成时间: 2025-09-30 03:20:18
const express = require('express');
const app = express();
const port = 3000;

// 用于存储API测试信息
const apiTestInfo = [];

// 中间件：解析请求体
app.use(express.json());

// API测试工具 - 提交测试数据
app.post('/api/test', (req, res) => {
  // 检查请求体是否包含必要的信息
  if (!req.body.url || !req.body.method) {
    return res.status(400).json({
      error: 'Missing URL or method in request body'
    });
  }

  // 存储测试信息
  apiTestInfo.push({
    url: req.body.url,
    method: req.body.method,
    timestamp: new Date().toISOString()
  });

  // 返回成功响应
  res.status(201).json({
    message: 'API test data received',
    data: apiTestInfo[apiTestInfo.length - 1]
  });
});

// API测试工具 - 获取所有测试数据
app.get('/api/test', (req, res) => {
  // 返回所有API测试信息
  res.json(apiTestInfo);
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error'
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`API test tool running on port ${port}`);
});
