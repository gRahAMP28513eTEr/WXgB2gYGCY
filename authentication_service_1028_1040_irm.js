// 代码生成时间: 2025-10-28 10:40:00
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 配置常量
const JWT_SECRET = 'your_jwt_secret';
const JWT_EXPIRATION = '2h'; // JWT有效期

// 创建Express应用
const app = express();
app.use(express.json()); // 用于解析JSON请求体

// 用户模型（示例，实际应用中应连接数据库）
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

// 用户数据库（示例，实际应用中应使用数据库存储）
const users = [
    new User('admin', '$2a$12$...'), // 密码示例，实际应用中应加密
];

// 中间件：验证JWT
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401); // 如果没有提供token，则返回401状态码

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // 如果token验证失败，则返回403状态码
        req.user = user;
        next();
    });
};

// 登录接口
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        // 用户名或密码错误
        return res.status(400).json({ error: 'Invalid username or password' });
    }
    // 密码验证通过，生成JWT
    const token = jwt.sign({ id: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    res.json({ token });
});

// 受保护的接口
app.get('/protected', authenticateJWT, (req, res) => {
    // 只有验证通过的请求才能访问
    res.json({ message: 'Welcome to the protected route!' });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// 注意：
// 1. 密码应该使用bcryptjs加密
// 2. JWT_SECRET应保持安全，不应硬编码在代码中
// 3. 实际应用中应连接数据库存储用户信息
// 4. 错误处理可以根据具体需求进一步细化