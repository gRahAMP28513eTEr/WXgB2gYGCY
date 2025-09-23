// 代码生成时间: 2025-09-24 00:55:53
const express = require('express');
const compression = require('compression');
const path = require('path');
const fs = require('fs');
const unzipper = require('unzipper');
const app = express();
const port = 3000;
# 优化算法效率

// 启用gzip压缩
app.use(compression());

// 解析JSON和URL编码的表单数据
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
# 添加错误处理

// 解压文件的路由
app.post('/unzip', async (req, res) => {
# TODO: 优化性能
  // 检查文件是否上传
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.file;
  try {
# FIXME: 处理边界情况
    // 保存文件到临时目录
    const tempZipPath = path.join(__dirname, 'temp', file.name);
    await file.mv(tempZipPath);

    // 解压文件到指定目录
    const extractPath = path.join(__dirname, 'extracted');
    fs.createReadStream(tempZipPath)
      .pipe(unzipper.Extract({ path: extractPath }));

    res.send('File has been successfully unzipped.');
  } catch (error) {
# 添加错误处理
    // 处理错误
# NOTE: 重要实现细节
    console.error(error);
    res.status(500).send('An error occurred during the unzip process.');
  } finally {
    // 删除临时文件
    fs.unlinkSync(tempZipPath);
# FIXME: 处理边界情况
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`File Unzip Tool is running on port ${port}`);
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 确保在非生产环境下，监听未处理的Promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});