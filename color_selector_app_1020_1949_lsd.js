// 代码生成时间: 2025-10-20 19:49:46
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse request body
app.use(express.json());

// Color selection route
app.post('/color', (req, res) => {
  // Check if the request body contains the color property
  if (!req.body.color) {
    return res.status(400).json({
      error: 'Missing color property in the request body'
    });
  }

  // Validate the color format (simple validation, can be expanded)
  if (!/^#[0-9A-F]{6}$/i.test(req.body.color)) {
    return res.status(400).json({
      error: 'Invalid color format. Use #RRGGBB format'
    });
  }

  // If the color is valid, return it in the response
  res.json({
    color: req.body.color
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error'
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Color selector app listening at http://localhost:${port}`);
});

// Documentation

/*
  Color Selector API
  ================

  POST /color
  Description: Selects a color and returns it.
  Body: { "color": "#RRGGBB" }
  Response: { "color": "#RRGGBB" }
  Errors:
    - 400: Missing or invalid color property
    - 500: Internal Server Error
*/