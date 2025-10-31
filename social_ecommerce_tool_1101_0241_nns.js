// 代码生成时间: 2025-11-01 02:41:43
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define schema for products
const Product = {
  name: 'string',
  description: 'string',
  price: 'number',
  image: 'string',
  inventory: 'number'
};

// In-memory store for products
const products = [];

// Route to get all products
app.get('/products', (req, res) => {
  try {
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

// Route to create a new product
app.post('/products', (req, res) => {
  try {
    // Validate product schema
    const { name, description, price, image, inventory } = req.body;
    if (!name || !description || !price || !image || !inventory) {
      throw new Error('All fields are required');
    }

    // Create new product object
    const newProduct = {
      name,
      description,
      price,
      image,
      inventory
    };

    // Add to products array
    products.push(newProduct);

    // Send back new product
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to update an existing product
app.put('/products/:id', (req, res) => {
  try {
    // Find product by id
    const productIndex = products.findIndex(product => product.id === parseInt(req.params.id));
    if (productIndex === -1) {
      throw new Error('Product not found');
    }

    // Update product
    products[productIndex] = {
      ...products[productIndex],
      ...req.body
    };

    // Send back updated product
    res.status(200).json(products[productIndex]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Route to delete a product
app.delete('/products/:id', (req, res) => {
  try {
    // Find product by id and remove it
    const productIndex = products.findIndex(product => product.id === parseInt(req.params.id));
    if (productIndex === -1) {
      throw new Error('Product not found');
    }

    products.splice(productIndex, 1);

    // Send back success message
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Social Ecommerce Tool running on port ${PORT}`);
});
