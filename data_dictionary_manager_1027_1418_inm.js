// 代码生成时间: 2025-10-27 14:18:39
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Data dictionary storage
const dataDictionary = {};

// Route to get all data dictionary items
app.get('/data-dictionary', (req, res) => {
    res.status(200).json(dataDictionary);
});

// Route to add a new data dictionary item
app.post('/data-dictionary', (req, res) => {
    const { key, value } = req.body;
    if (!key || !value) {
        return res.status(400).json({ error: 'Key and value are required' });
    }
    dataDictionary[key] = value;
    res.status(201).json({ message: 'Data dictionary item added', key, value });
});

// Route to update an existing data dictionary item
app.put('/data-dictionary/:key', (req, res) => {
    const { key } = req.params;
    const { value } = req.body;
    if (!key || !value) {
        return res.status(400).json({ error: 'Key and value are required' });
    }
    if (!dataDictionary[key]) {
        return res.status(404).json({ error: 'Data dictionary item not found' });
    }
    dataDictionary[key] = value;
    res.status(200).json({ message: 'Data dictionary item updated', key, value });
});

// Route to delete a data dictionary item
app.delete('/data-dictionary/:key', (req, res) => {
    const { key } = req.params;
    if (!dataDictionary[key]) {
        return res.status(404).json({ error: 'Data dictionary item not found' });
    }
    delete dataDictionary[key];
    res.status(200).json({ message: 'Data dictionary item deleted', key });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Data Dictionary Manager running on port ${PORT}`);
});

// Documentation
/**
 * @api {get} /data-dictionary Retrieve all data dictionary items
 * @apiName GetDataDictionary
 * @apiGroup DataDictionary
 *
 * @apiSuccess {Object} dataDictionary All data dictionary items
 */

/**
 * @api {post} /data-dictionary Add a new data dictionary item
 * @apiName AddDataDictionary
 * @apiGroup DataDictionary
 *
 * @apiParam {String} key The key of the data dictionary item
 * @apiParam {String} value The value of the data dictionary item
 *
 * @apiSuccess {String} message Confirmation message
 * @apiSuccess {String} key The added key
 * @apiSuccess {String} value The added value
 */

/**
 * @api {put} /data-dictionary/:key Update an existing data dictionary item
 * @apiName UpdateDataDictionary
 * @apiGroup DataDictionary
 *
 * @apiParam {String} key The key of the data dictionary item to update
 * @apiParam {String} value The new value of the data dictionary item
 *
 * @apiSuccess {String} message Confirmation message
 * @apiSuccess {String} key The updated key
 * @apiSuccess {String} value The updated value
 */

/**
 * @api {delete} /data-dictionary/:key Delete a data dictionary item
 * @apiName DeleteDataDictionary
 * @apiGroup DataDictionary
 *
 * @apiParam {String} key The key of the data dictionary item to delete
 *
 * @apiSuccess {String} message Confirmation message
 * @apiSuccess {String} key The deleted key
 */