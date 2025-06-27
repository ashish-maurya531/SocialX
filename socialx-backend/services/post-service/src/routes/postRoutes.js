const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Post routes
router.get('/', postController.getAllPosts);

module.exports = router;