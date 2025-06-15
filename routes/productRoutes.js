const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Root route
router.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});


// GET /api/products - Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/products/:id - Get a specific product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/products - Create a new product
router.post('/', express.json(), async (req, res) => {
  try{
    const product = new Product(req.body);
    await product.validate(); // Validate the product before saving
    await product.save(); // Save the product to the database
    res.status(201).json(product);
  }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// PUT /api/products/:id - Update a product
router.put('/:id', express.json(), async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.send(product);
});

// DELETE /api/products/:id - Delete a product
router.delete('/:id', async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send({ message: 'Product not found' });
    res.send(product);
});

module.exports = router;