const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// test route
router.get('/test', (req, res) => {
  res.status(200).json({ message: 'User service is running' });
});

module.exports = router;