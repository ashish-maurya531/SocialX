require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const auth = require('./middlewares/auth');
const userProxy = require('./routes/userProxy');
const postProxy = require('./routes/postProxy');
// const chatProxy = require('./routes/chatProxy');
// const ecommerceProxy = require('./routes/ecommerceProxy');

const app = express();
app.use(express.json());

// JWT auth for all proxied routes
// app.use('/api', auth);// for simplicity, auth is commented out
// Proxy to user and post services

app.use('/api', userProxy);
app.use('/api', postProxy);
// app.use('/api', chatProxy);
// app.use('/api', ecommerceProxy);

app.get('/', (req, res) => res.send('Gateway Service Running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Gateway running on port ${PORT}`));