require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const chatSocket = require('./sockets/chatSocket');
const moment = require('moment-timezone');

// Chat service entry point

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const serviceName = 'Chat Service';
app.use(morgan((tokens, req, res) => {
  const date = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss z');
  return `[${date}] [${serviceName}] - ${tokens.method(req, res)} ${tokens.url(req, res)} ${tokens.status(req, res)} ${tokens["response-time"](req, res)} ms`;
}));

app.get('/health', (req, res) => res.send('Chat Service Running'));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

const server = http.createServer(app);
chatSocket(server);

const PORT = process.env.PORT || 3003;
server.listen(PORT, () => console.log(`Chat service running on port ${PORT}`));