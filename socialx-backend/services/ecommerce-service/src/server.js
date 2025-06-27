require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const moment = require('moment-timezone');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const serviceName = 'Ecommerce Service';
app.use(morgan((tokens, req, res) => {
  const date = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss z');
  return `[${date}] [${serviceName}] - ${tokens.method(req, res)} ${tokens.url(req, res)} ${tokens.status(req, res)} ${tokens["response-time"](req, res)} ms`;
}));

app.use('/', productRoutes);

app.get('/health', (req, res) => res.send('Ecommerce Service Running'));

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`Ecommerce service running on port ${PORT}`));