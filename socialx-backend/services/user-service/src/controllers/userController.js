const userModel = require('../models/userModel');

// User controller logic
exports.getAllUsers = async (req, res) => {
  try {
    const result = await userModel.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};