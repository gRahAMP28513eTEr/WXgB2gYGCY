// 代码生成时间: 2025-09-29 18:17:01
// file_split_merge_tool.js
// 使用JS和Express框架实现文件分割合并工具

const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// 中间件用于解析请求体中的JSON
app.use(express.json());

// 文件分割
app.post('/split', (req, res) => {
  const { filePath, partSize } = req.body; // 获取请求体中的文件路径和分割大小
  if (!filePath || !partSize) {
    return res.status(400).json({ error: 'Missing filePath or partSize' });
  }
  try {
    const fileSize = fs.statSync(filePath).size;
    const parts = Math.ceil(fileSize / partSize);
    
    for (let i = 0; i < parts; i++) {
      const start = i * partSize;
      const end = start + partSize;
      fs.createReadStream(filePath, { start, end }).pipe(fs.createWriteStream(`part_${i}.dat`));
    }
    
    res.json({ message: 'File split successfully', parts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 文件合并
app.post('/merge', (req, res) => {
  const { partFiles, outputFile } = req.body; // 获取请求体中的分割文件列表和输出文件路径
  if (!partFiles || !outputFile) {
    return res.status(400).json({ error: 'Missing partFiles or outputFile' });
  }
  try {
    const writeStream = fs.createWriteStream(outputFile);
    partFiles.forEach((partFile, index) => {
      fs.createReadStream(partFile).pipe(writeStream, { end: index < partFiles.length - 1 });
    });
    writeStream.on('finish', () => {
      res.json({ message: 'Files merged successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`File Split Merge Tool running on port ${port}`);
});

// 注意：
// 1. 确保请求体中的filePath和partSize是有效的，且文件存在。
// 2. 确保请求体中的partFiles数组包含所有分割的文件路径，且outputFile是有效的输出文件路径。
// 3. 此代码示例假设文件系统权限允许读写操作。
// 4. 错误处理包括基本的参数验证和异常捕获。