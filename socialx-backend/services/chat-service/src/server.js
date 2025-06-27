require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const chatSocket = require('./sockets/chatSocket');

// Chat service entry point

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.send('Chat Service Running'));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

const server = http.createServer(app);
chatSocket(server);

const PORT = process.env.PORT || 3003;
server.listen(PORT, () => console.log(`Chat service running on port ${PORT}`));