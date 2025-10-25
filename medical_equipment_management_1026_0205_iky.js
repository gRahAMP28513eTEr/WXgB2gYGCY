// 代码生成时间: 2025-10-26 02:05:55
const express = require('express');
const app = express();
const port = 3000;

// Middleware for parsing request bodies
app.use(express.json());

// In-memory database to store equipment data
let equipmentDatabase = [];

// GET endpoint to list all equipment
app.get('/api/equipment', (req, res) => {
    try {
        res.status(200).json(equipmentDatabase);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// POST endpoint to add new equipment
app.post('/api/equipment', (req, res) => {
    const { name, model, serialNumber } = req.body;
    if (!name || !model || !serialNumber) {
        return res.status(400).send('Missing required fields');
    }
    const newEquipment = { name, model, serialNumber, id: equipmentDatabase.length + 1 };
    equipmentDatabase.push(newEquipment);
    res.status(201).json(newEquipment);
});

// PUT endpoint to update equipment details
app.put('/api/equipment/:id', (req, res) => {
    const { id } = req.params;
    const equipment = equipmentDatabase.find(e => e.id.toString() === id);
    if (!equipment) {
        return res.status(404).send('Equipment not found');
    }
    const { name, model, serialNumber } = req.body;
    if (name) equipment.name = name;
    if (model) equipment.model = model;
    if (serialNumber) equipment.serialNumber = serialNumber;
    res.status(200).json(equipment);
});

// DELETE endpoint to remove equipment
app.delete('/api/equipment/:id', (req, res) => {
    const { id } = req.params;
    const index = equipmentDatabase.findIndex(e => e.id.toString() === id);
    if (index === -1) {
        return res.status(404).send('Equipment not found');
    }
    equipmentDatabase.splice(index, 1);
    res.status(200).send('Equipment deleted');
});

// Error handling middleware
app.use((req, res, next) => {
    res.status(404).send('Endpoint not found');
});

// Start the server
app.listen(port, () => {
    console.log(`Medical Equipment Management server listening at http://localhost:${port}`);
});

// Documentation
/**
 * @api {get} /api/equipment Retrieve list of medical equipment
 * @api {post} /api/equipment Add new medical equipment
 * @api {put} /api/equipment/:id Update existing medical equipment
 * @api {delete} /api/equipment/:id Delete medical equipment
 */