const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const router = express.Router();

// Proxy to chat-service
router.use('/chat', createProxyMiddleware({
  target: process.env.CHAT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/chats': '/' },
}));

module.exports = router;