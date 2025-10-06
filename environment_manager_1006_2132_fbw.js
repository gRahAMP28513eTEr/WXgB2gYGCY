// 代码生成时间: 2025-10-06 21:32:30
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse request bodies
app.use(express.json());

// Function to get environment variables
const getEnvironmentVariables = () => {
    return {
        port: process.env.PORT,
        // Add other environment variables as needed
    };
};

// Function to set environment variables
const setEnvironmentVariable = (key, value) => {
    if (typeof process.env[key] === 'undefined') {
        throw new Error(`Environment variable ${key} does not exist`);
    }
    process.env[key] = value;
    return {
        [key]: value
    };
};

// Route to get all environment variables
app.get('/env', (req, res) => {
    try {
        const envVars = getEnvironmentVariables();
        res.status(200).json(envVars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to set an environment variable
app.put('/env/:key', (req, res) => {
    const { key } = req.params;
    const { value } = req.body;
    try {
        const updatedEnvVar = setEnvironmentVariable(key, value);
        res.status(200).json(updatedEnvVar);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Environment Manager is running on port ${PORT}`);
});

// Add error handling middleware
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send('Something broke!');
});
