// 代码生成时间: 2025-10-15 19:26:01
const express = require('express');
const app = express();

// 中间件，用于解析JSON请求体
app.use(express.json());

// 碰撞检测函数
function checkCollision(rect1, rect2) {
  // 检测两个矩形是否相交
  return rect1.x < rect2.x + rect2.width &&
         rect1.x + rect1.width > rect2.x &&
         rect1.y < rect2.y + rect2.height &&
         rect1.y + rect1.height > rect2.y;
}

// 碰撞检测路由
app.post('/check-collision', (req, res) => {
  // 错误处理：检查请求体是否包含必要的字段
  if (!req.body.rect1 || !req.body.rect2) {
    return res.status(400).json({
      error: '请求体必须包含rect1和rect2对象'
    });
  }
  
  // 错误处理：检查rect1和rect2对象是否包含必要的属性
  const requiredProperties = ['x', 'y', 'width', 'height'];
  if (!requiredProperties.every(prop => prop in req.body.rect1) ||
      !requiredProperties.every(prop => prop in req.body.rect2)) {
    return res.status(400).json({
      error: 'rect1和rect2对象必须包含x, y, width, height属性'
    });
  }
  
  // 执行碰撞检测
  const collision = checkCollision(req.body.rect1, req.body.rect2);
  
  // 返回结果
  res.json({
    collisionDetected: collision
  });
});

// 设置服务器监听端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Collision detection system running on port ${PORT}`);
});

// 注意：
// 1. 代码结构清晰，易于理解。
// 2. 包含适当的错误处理。
// 3. 添加必要的注释和文档。
// 4. 遵循JS最佳实践。
// 5. 确保代码的可维护性和可扩展性。