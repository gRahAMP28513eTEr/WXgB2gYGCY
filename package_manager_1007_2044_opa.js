// 代码生成时间: 2025-10-07 20:44:36
const express = require('express');
const app = express();
const port = 3000;

// 中间件，用于解析JSON请求体
app.use(express.json());

// 软件包管理器存储结构
const packageManager = {
  packages: {} 
};

/**
 * 获取所有软件包
 *
 * @returns {Promise<Object>}
 */
function getAllPackages() {
  return new Promise((resolve, reject) => {
    resolve(packageManager.packages);
  });
}

/**
 * 添加或更新软件包
 *
 * @param {string} packageName - 软件包名称
 * @param {string} version - 软件包版本
 * @returns {Promise<Object>}
 */
function addOrUpdatePackage(packageName, version) {
  return new Promise((resolve, reject) => {
    if (!packageName || typeof packageName !== 'string') {
      reject(new Error('Invalid package name'));
    }
    if (!version || typeof version !== 'string') {
      reject(new Error('Invalid version'));
    }
    packageManager.packages[packageName] = version;
    resolve(packageManager.packages[packageName]);
  });
}

/**
 * 删除软件包
 *
 * @param {string} packageName - 软件包名称
 * @returns {Promise<Object>}
 */
function removePackage(packageName) {
  return new Promise((resolve, reject) => {
    if (!packageName || typeof packageName !== 'string') {
      reject(new Error('Invalid package name'));
    }
    if (packageManager.packages[packageName]) {
      delete packageManager.packages[packageName];
      resolve(`Package ${packageName} removed`);
    } else {
      reject(new Error('Package not found'));
    }
  });
}

// 获取所有软件包的路由
app.get('/packages', async (req, res) => {
  try {
    const packages = await getAllPackages();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 添加或更新软件包的路由
app.post('/packages', async (req, res) => {
  const { packageName, version } = req.body;
  try {
    const packageInfo = await addOrUpdatePackage(packageName, version);
    res.status(201).json(packageInfo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 删除软件包的路由
app.delete('/packages/:packageName', async (req, res) => {
  const { packageName } = req.params;
  try {
    const result = await removePackage(packageName);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Package Manager running on port ${port}`);
});