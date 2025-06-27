require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const auth = require('./middlewares/auth');
const userProxy = require('./routes/userProxy');
const postProxy = require('./routes/postProxy');
// const chatProxy = require('./routes/chatProxy');
// const ecommerceProxy = require('./routes/ecommerceProxy');
const moment = require('moment-timezone');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const serviceName = 'Gateway Service';
app.use(morgan((tokens, req, res) => {
  const date = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss z');
  return `[${date}] [${serviceName}] - ${tokens.method(req, res)} ${tokens.url(req, res)} ${tokens.status(req, res)} ${tokens["response-time"](req, res)} ms`;
}));

// JWT auth for all proxied routes
// app.use('/api', auth);// for simplicity, auth is commented out
// Log which service the request is being proxied to
app.use('/api/users', (req, res, next) => {
  console.log(`[Gateway] Proxying to User Service: ${req.method} ${req.originalUrl}`);
  next();
});
app.use('/api/posts', (req, res, next) => {
  console.log(`[Gateway] Proxying to Post Service: ${req.method} ${req.originalUrl}`);
  next();
});

// Proxy to user and post services
app.use('/api', userProxy);
app.use('/api', postProxy);
// app.use('/api', chatProxy);
// app.use('/api', ecommerceProxy);

app.get('/', (req, res) => res.send('Gateway Service Running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Gateway running on port ${PORT}`));