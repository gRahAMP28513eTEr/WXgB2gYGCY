// 代码生成时间: 2025-10-10 03:11:19
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

// 创建一个Express应用
const app = express();
app.use(bodyParser.json());

// 定义RPC服务端的端口
const PORT = 3000;

// 定义RPC服务端的路由
app.post('/rpc', async (req, res) => {
    // 验证请求数据是否包含必要的字段
    if (!req.body.service || !req.body.method || !req.body.args) {
        return res.status(400).send({ error: 'Invalid request' });
    }

    // 构造远程调用的URL
    const url = `http://${req.body.service}/${req.body.method}`;

    try {
        // 调用远程服务
        const response = await axios.post(url, req.body.args);
        // 返回结果
        res.send(response.data);
    } catch (error) {
        // 错误处理
        console.error('RPC call failed:', error);
        res.status(500).send({ error: 'RPC call failed' });
    }
});

// 启动RPC服务端
app.listen(PORT, () => {
    console.log(`RPC server is running on port ${PORT}`);
});

// 以下是RPC客户端的示例代码

// 定义RPC客户端调用远程服务的函数
function callRemoteService(service, method, args) {
    return axios.post(`http://localhost:${PORT}/rpc`, {
        service: service,
        method: method,
        args: args
    }).then(response => response.data).catch(error => {
        console.error('RPC call failed:', error);
        throw error;
    });
}

// 使用RPC客户端调用远程服务
callRemoteService('service-name', 'methodName', { arg1: 'value1', arg2: 'value2' })
    .then(result => console.log('RPC call result:', result))
    .catch(error => console.error('RPC call error:', error));