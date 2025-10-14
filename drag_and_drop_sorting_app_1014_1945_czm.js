// 代码生成时间: 2025-10-14 19:45:06
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle drag and drop sorting
app.post('/sort', (req, res) => {
  try {
    // Extract the sorted items from the request body
    const { sortedItems } = req.body;
    if (!sortedItems) {
      return res.status(400).json({ error: 'No sorted items provided' });
    }

    // Process the sorted items here (e.g., save to a database)
    // For demonstration purposes, we'll just log them
    console.log('Sorted items:', sortedItems);

    // Respond with the sorted items
    res.json({ sortedItems });
  } catch (error) {
    // Error handling
    console.error('Error sorting items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Drag and drop sorting app listening at http://localhost:${port}`);
});

// Note: The actual drag and drop functionality will be handled by client-side JavaScript and HTML,
// which is not included in this server-side code.
// The client-side code should send a POST request to the '/sort' route with the sorted items when the user
// completes dragging and dropping.
