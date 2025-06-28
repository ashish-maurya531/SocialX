const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const router = express.Router();



// Proxy to ecommerce-service
router.use('/ecommerce', createProxyMiddleware({
  target: process.env.ECOMMERCE_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/ecommerce': '/' },
}));

module.exports = router;