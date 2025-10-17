// 代码生成时间: 2025-10-17 19:02:34
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Dummy data to simulate a database
const cases = [];

// Endpoint to add a new case
app.post('/cases', (req, res) => {
  const { disease, location, count } = req.body;
  if (!disease || !location || typeof count !== 'number') {
    return res.status(400).json({
      error: 'Missing or invalid parameters'
    });
  }
  cases.push({ disease, location, count });
  res.status(201).json({
    message: 'Case added successfully',
    case: { disease, location, count }
  });
});

// Endpoint to retrieve all cases
app.get('/cases', (req, res) => {
  res.json(cases);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Epidemic Monitoring App listening at http://localhost:${port}`);
});

// Comments explaining the code
/*
 * This Express application simulates an epidemic monitoring system.
 * It has two endpoints: one for adding new cases and one for retrieving all cases.
 * It uses a simple in-memory array to store cases.
 * Error handling is implemented to catch and respond to any unexpected errors.
 * The code is structured for clarity, maintainability, and extensibility.
 */