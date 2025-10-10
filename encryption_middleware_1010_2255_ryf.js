// 代码生成时间: 2025-10-10 22:55:43
const express = require('express');
const crypto = require('crypto');

// 创建Express应用
const app = express();
const port = 3000;

// 定义加密中间件
function encryptMiddleware(req, res, next) {
  if (req.method === 'POST' && req.path === '/encrypt') {
    // 获取请求体
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString(); // 将数据转换为字符串
    });
    req.on('end', () => {
      // 使用AES-256-CBC加密请求体
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(process.env.SECRET_KEY, 'hex'), iv);
      let encrypted = cipher.update(body, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      // 将加密后的数据和IV设置在请求对象中
      req.encryptedBody = encrypted;
      req.iv = iv.toString('hex');
      next();
    });
  } else {
    next();
  }
}

// 定义加密路由
app.post('/encrypt', encryptMiddleware, (req, res) => {
  if (req.encryptedBody) {
    res.status(200).json({
      encryptedBody: req.encryptedBody,
      iv: req.iv
    });
  } else {
    res.status(400).json({ error: 'Encryption failed' });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Encryption server listening at http://localhost:${port}`);
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});