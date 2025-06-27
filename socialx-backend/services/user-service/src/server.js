require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const moment = require('moment-timezone');

// User service entry point

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const serviceName = 'User Service';
app.use(morgan((tokens, req, res) => {
  const date = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss z');
  return `[${date}] [${serviceName}] - ${tokens.method(req, res)} ${tokens.url(req, res)} ${tokens.status(req, res)} ${tokens["response-time"](req, res)} ms`;
}));

app.use('/', userRoutes);

app.get('/health', (req, res) => res.send('User Service Running'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`User service running on port ${PORT}`));