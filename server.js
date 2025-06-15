// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const productsRoutes = require('./routes/productRoutes'); 

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI ='mongodb://localhost:27017/productsdb';

// Middleware setup
app.use(bodyParser.json());
app.use('/products', productsRoutes);

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true,})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });


//Port listening
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  });


// Sample in-memory products database
// let products = [
//   {
//     id: '1',
//     name: 'Laptop',
//     description: 'High-performance laptop with 16GB RAM',
//     price: 1200,
//     category: 'electronics',
//     inStock: true
//   },
//   {
//     id: '2',
//     name: 'Smartphone',
//     description: 'Latest model with 128GB storage',
//     price: 800,
//     category: 'electronics',
//     inStock: true
//   },
//   {
//     id: '3',
//     name: 'Coffee Maker',
//     description: 'Programmable coffee maker with timer',
//     price: 50,
//     category: 'kitchen',
//     inStock: false
//   }
// ];


// TODO: Implement the following routes:
// GET /api/products - Get all products
// GET /api/products/:id - Get a specific product
// POST /api/products - Create a new product
// PUT /api/products/:id - Update a product
// DELETE /api/products/:id - Delete a product

// TODO: Implement custom middleware for:
// - Request logging
const requestLogger = (req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
};

// - Authentication
const authenticate = (req, res, next) => {
  // Placeholder for authentication logic
  // For now, we'll just log the request and call next()
  console.log('Authentication middleware triggered');
  next();
};
// - Error handling
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({error : 'Internal Server Error' }

  )};
// Export the app for testing purposes
module.exports = app; 