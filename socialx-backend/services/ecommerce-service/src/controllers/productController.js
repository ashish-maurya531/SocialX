// Product controller

const productModel = require('../models/productModel');

exports.getAllProducts = async (req, res) => {
  try {
    const result = await productModel.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};