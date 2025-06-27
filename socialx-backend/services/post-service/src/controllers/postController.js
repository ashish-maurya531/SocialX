const postModel = require('../models/postModel');

// Post controller

exports.getAllPosts = async (req, res) => {
  try {
    const result = await postModel.query('SELECT * FROM posts');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};