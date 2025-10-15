// 代码生成时间: 2025-10-16 03:50:18
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Function to check if content contains profanity
function isProfane(text) {
  // Define a list of profane words (this should be more comprehensive in a real-world scenario)
  const profaneWords = ['badword1', 'badword2'];
  return profaneWords.some(word => text.includes(word));
}

// Content moderation route
app.post('/api/moderate', (req, res) => {
  const { content } = req.body;
  
  // Check if content is provided
  if (!content) {
    return res.status(400).json({
      error: 'Content is required'
    });
  }
  
  // Check if the content is profane
  if (isProfane(content)) {
    return res.status(400).json({
      error: 'Content contains profanity'
    });
  }
  
  // If the content is not profane, return success
  res.status(200).json({
    message: 'Content is approved'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Server error'
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Content moderation tool listening at http://localhost:${port}`);
});